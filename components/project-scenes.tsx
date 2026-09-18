"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "@/components/portfolio-data";

gsap.registerPlugin(ScrollTrigger);

/**
 * "온 더 스크린" 전용 무대.
 *
 * 이 구간에서는 페이지가 내려가는 대신 화면이 제자리에 고정되고, 스크롤 진행도가 장면 전환에
 * 쓰인다. 01 Backend → 02 AI → 03 Cloud → 04 Embedded 네 장면이 같은 자리에 겹쳐 있고,
 * 나가는 장면과 들어오는 장면이 잠깐 함께 존재하며 교차한다.
 *
 * 화면 크기에 따라 구성이 달라지지 않도록 1440 × 860 고정 캔버스에 그린 뒤 통째로 배율만
 * 맞춘다. 그래서 노트북이든 큰 모니터든 같은 그림이 보인다.
 *
 * 모바일과 prefers-reduced-motion 에서는 고정하지 않고 평범한 세로 흐름으로 되돌린다.
 */

const CANVAS_W = 1440;
const CANVAS_H = 860;

const GREEN = "#22c55e";
const RED = "#da291c";
const statusColor = (status: string) => (status.includes("진행") ? GREEN : RED);

export default function ProjectScenes() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  /* 고정 캔버스 배율 — 어떤 화면에서도 같은 구성으로 보이게 한다 */
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const fit = () => {
      if (root.classList.contains("pstage-flow")) {
        canvas.style.removeProperty("--ps");
        return;
      }
      const s = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H, 1.35);
      canvas.style.setProperty("--ps", String(s));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 1000px)").matches;
    const scenes = gsap.utils.toArray<HTMLElement>(".pscene", root);
    if (scenes.length < 2) return;

    /* 폴백: 평범하게 쌓아서 보여준다 */
    if (reduced || small) {
      root.classList.add("pstage-flow");
      canvasRef.current?.style.removeProperty("--ps");
      if (reduced) return;
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              gsap.fromTo(e.target, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.2 },
      );
      scenes.forEach((s) => io.observe(s));
      return () => io.disconnect();
    }

    const ctx = gsap.context(() => {
      const n = scenes.length;
      const layers = (s: HTMLElement) => gsap.utils.toArray<HTMLElement>("[data-layer]", s);
      const depth = (el: Element) => Number((el as HTMLElement).dataset.layer || 1);

      gsap.set(scenes.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${(n - 1) * 115}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < n - 1; i++) {
        const cur = scenes[i];
        const nxt = scenes[i + 1];
        const at = i;

        /* 나가는 장면 — 흐림 없이 또렷한 채로 물러난다 */
        tl.to(cur, { autoAlpha: 0, scale: 0.94, y: -60 }, at);
        tl.to(layers(cur), { y: (_i, el) => -52 * depth(el), ease: "power2.in" }, at);

        /* 들어오는 장면 */
        tl.fromTo(nxt, { autoAlpha: 0, scale: 1.04, y: 80 }, { autoAlpha: 1, scale: 1, y: 0 }, at);
        tl.fromTo(layers(nxt), { y: (_i, el) => 64 * depth(el) }, { y: 0, ease: "power2.out" }, at);

        /* 장면마다 성격을 조금씩 다르게 */
        if (i === 0) {
          tl.to(cur.querySelectorAll("[data-mark]"), { x: -160, ease: "power2.in" }, at);
          tl.fromTo(nxt.querySelectorAll("[data-item]"), { x: 70, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.05, ease: "power3.out" }, at + 0.28);
        } else if (i === 1) {
          tl.to(cur.querySelectorAll("[data-item]"), { y: 40, autoAlpha: 0, stagger: 0.03, ease: "power2.in" }, at);
          tl.fromTo(nxt.querySelectorAll("[data-item]"), { y: 56, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, ease: "power3.out" }, at + 0.28);
        } else {
          tl.to(cur.querySelectorAll("[data-item]"), { x: -90, autoAlpha: 0, stagger: 0.04, ease: "power2.in" }, at);
          tl.fromTo(nxt.querySelectorAll("[data-mark]"), { scale: 1.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: "power3.out" }, at + 0.15);
          tl.fromTo(nxt.querySelectorAll("[data-item]"), { y: 48, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, ease: "power3.out" }, at + 0.3);
        }

        /* 진행 표시 */
        tl.to(root.querySelectorAll(".pstage-dot")[i + 1], { backgroundColor: RED, scale: 1.25 }, at + 0.5);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="pstage">
      <div ref={canvasRef} className="pstage-canvas">
        {categories.map((c) => (
          <section key={c.num} className="pscene" style={{ ["--cat" as string]: c.color }}>
            <div className="pscene-mark" data-mark data-layer="0.5" aria-hidden>
              {c.num}
            </div>

            <div className="pscene-inner">
              <div className="pscene-head" data-layer="1.1">
                <span className="pscene-num">{c.num}</span>
                <h3 className="pscene-name">{c.name}</h3>
                <span className="pscene-count">
                  {c.items.length} projects
                </span>
              </div>

              <div className="pscene-row" data-layer="1.5" style={{ ["--n" as string]: c.items.length }}>
                {c.items.map((it) => (
                  <a key={it.title} data-item href={it.repo} target="_blank" rel="noopener noreferrer" className="pcard">
                    <span className="pcard-top">
                      <span className="pl-dot" style={{ background: statusColor(it.status) }} />
                      <span className="pl-title">{it.title}</span>
                      <span className="pl-go" aria-hidden>
                        ↗
                      </span>
                    </span>
                    <span className="pcard-summary">{it.summary}</span>
                    <span className="pcard-block">
                      <b className="pb-problem">문제</b>
                      {it.problem}
                    </span>
                    <span className="pcard-block">
                      <b className="pb-fix">해결</b>
                      {it.solution}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="pstage-dots" aria-hidden>
        {categories.map((c, i) => (
          <span key={c.num} className="pstage-dot" style={i === 0 ? { background: RED, transform: "scale(1.25)" } : undefined} />
        ))}
      </div>
    </div>
  );
}
