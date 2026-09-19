"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "@/components/portfolio-data";
import { ProgressiveFluxLoader } from "@/components/ui/progressive-flux-loader";

gsap.registerPlugin(ScrollTrigger);

/**
 * "온 더 스크린" 전용 무대.
 *
 * 화면은 제자리에 고정되고, 스크롤 진행도가 장면을 바꾼다. 다만 장면이 통째로 사라졌다
 * 나타나는 것이 아니라 현재 장면이 해체되어 흩어지고 그 자리에서 다음 장면이 조립된다.
 *
 * 요소는 세 겹으로 나뉜다. 배경, 본문 카드, 앞쪽 제목이 서로 다른 속도와 방향으로 움직여
 * 깊이가 생긴다. 전환마다 해체·조립 방식이 달라 같은 동작이 반복되지 않고, 스크롤 속도를
 * 읽어 빠르게 굴릴수록 무대가 조금 더 크게 반응한다.
 *
 * 화면 크기에 따라 구성이 달라지지 않도록 1440 × 860 고정 캔버스에 그린 뒤 배율만 맞춘다.
 * 모바일과 prefers-reduced-motion 에서는 고정하지 않고 평범한 세로 흐름으로 되돌린다.
 */

const CANVAS_W = 1440;
const CANVAS_H = 860;

const GREEN = "#22c55e";
const RED = "#da291c";
const statusColor = (status: string) => (status.includes("진행") ? GREEN : RED);

const FLUX_ONGOING = { "--flux-from": "#16a34a", "--flux-to": "#4ade80" } as CSSProperties;
const FLUX_DONE = { "--flux-from": "#da291c", "--flux-to": "#ff8a7a" } as CSSProperties;

/** 카드 아래에 붙는 진행 상태 — 진행 중이면 초록 바가 계속 흐르고, 끝났으면 빨간 바가 꽉 찬다 */
function CardStatus({ status }: { status: string }) {
  const ongoing = status.includes("진행");
  const c = statusColor(status);
  return (
    <div className="pcard-foot" style={ongoing ? FLUX_ONGOING : FLUX_DONE}>
      <span className="pcard-status" style={{ color: c }}>
        <span
          className="pcard-status-dot"
          style={{ background: c, boxShadow: ongoing ? `0 0 8px ${c}` : "none", animation: ongoing ? "statusPulse 1.4s ease-in-out infinite" : "none" }}
        />
        {ongoing ? "진행 중" : "종료"}
      </span>
      <div className="pcard-bar">
        {ongoing ? (
          <ProgressiveFluxLoader showLabel={false} duration={4} loop className="max-w-none gap-0" barClassName="h-1.5 bg-white/10 shadow-none" />
        ) : (
          <ProgressiveFluxLoader showLabel={false} value={100} className="max-w-none gap-0" barClassName="h-1.5 bg-white/10 shadow-none" />
        )}
      </div>
    </div>
  );
}

const SHOW = "inset(0% 0% 0% 0%)";

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
      const q = (s: HTMLElement, sel: string) => gsap.utils.toArray<HTMLElement>(sel, s);

      /* 첫 장면만 보이고, 나머지는 조립되기 전 상태로 숨겨 둔다 */
      gsap.set(scenes[0], { autoAlpha: 1 });
      gsap.set(scenes.slice(1), { autoAlpha: 0 });
      scenes.forEach((s, i) => {
        if (i === 0) return;
        gsap.set(q(s, "[data-name],[data-num]"), { yPercent: 115 });
        gsap.set(q(s, "[data-rule]"), { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(q(s, "[data-count]"), { opacity: 0, y: 18 });
        gsap.set(q(s, "[data-item]"), { clipPath: "inset(0% 0% 100% 0%)", y: 60 });
        gsap.set(q(s, "[data-bg]"), { scale: 0.6, opacity: 0 });
      });

      /* 스크롤 속도에 따른 반응은 기울이지 않고 아주 약한 확대로만 준다 */
      const setPush = gsap.quickTo(".pscene-inner", "scale", { duration: 0.6, ease: "power3.out" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${(n - 1) * 145}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const v = gsap.utils.clamp(0, 1, Math.abs(self.getVelocity()) / 2600);
            setPush(1 + v * 0.012);
          },
        },
      });

      for (let i = 0; i < n - 1; i++) {
        const cur = scenes[i];
        const nxt = scenes[i + 1];
        const at = i;
        const P = (t: number) => at + t; // 구간 안에서의 상대 위치

        const pick = (s: HTMLElement) => ({
          name: q(s, "[data-name]"),
          num: q(s, "[data-num]"),
          count: q(s, "[data-count]"),
          rule: q(s, "[data-rule]"),
          cards: q(s, "[data-item]"),
          bg: q(s, "[data-bg]"),
        });
        const a = pick(cur);
        const b = pick(nxt);

        /* ── 해체 ── 앞쪽 제목은 크고 빠르게, 배경은 느리고 반대 방향으로 ── */
        tl.to(a.num, { xPercent: -140, opacity: 0, duration: 0.42, ease: "power2.in" }, P(0));
        tl.to(a.name, { x: -170, y: -34, opacity: 0, duration: 0.48, ease: "power2.in" }, P(0.04));
        tl.to(a.count, { y: 46, opacity: 0, duration: 0.34, ease: "power2.in" }, P(0.02));
        tl.to(a.rule, { scaleX: 0, transformOrigin: "100% 50%", duration: 0.34, ease: "power2.in" }, P(0.06));
        tl.to(a.bg, { x: 190, scale: 1.25, opacity: 0, duration: 0.72, ease: "power1.inOut" }, P(0));

        if (i === 0) {
          /* 좌우로 갈라지며 뒤로 물러난다 */
          tl.to(
            a.cards,
            {
              x: (idx: number) => (idx % 2 ? 230 : -230),
              y: (idx: number) => (idx % 2 ? 54 : -46),
              rotate: (idx: number) => (idx % 2 ? 5 : -5),
              scale: 0.82,
              opacity: 0,
              duration: 0.55,
              stagger: 0.05,
              ease: "power2.in",
            },
            P(0.1),
          );
        } else if (i === 1) {
          /* 아래로 쏟아지듯 떨어진다 */
          tl.to(
            a.cards,
            { y: 250, rotate: (idx: number) => -4 + idx * 3, scale: 0.9, opacity: 0, duration: 0.5, stagger: { each: 0.055, from: "end" }, ease: "power2.in" },
            P(0.1),
          );
        } else {
          /* 보는 사람 쪽으로 확대되며 지나간다 */
          tl.to(a.cards, { scale: 1.22, y: -70, opacity: 0, duration: 0.52, stagger: 0.05, ease: "power2.in" }, P(0.1));
        }

        /* 장면 자체는 요소가 다 흩어진 뒤에 꺼지고, 다음 장면은 조립 직전에 켜진다 */
        tl.to(cur, { autoAlpha: 0, duration: 0.2 }, P(0.62));
        tl.to(nxt, { autoAlpha: 1, duration: 0.2 }, P(0.3));

        /* ── 조립 ── 배경이 먼저 열리고 번호, 이름, 선, 카드 순으로 ── */
        tl.fromTo(b.bg, { scale: 0.6, x: -150, opacity: 0 }, { scale: 1, x: 0, opacity: 1, duration: 0.75, ease: "power2.out" }, P(0.34));
        tl.fromTo(b.num, { yPercent: 115 }, { yPercent: 0, duration: 0.52, ease: "power3.out" }, P(0.46));
        tl.fromTo(b.name, { yPercent: 115 }, { yPercent: 0, duration: 0.56, ease: "back.out(1.5)" }, P(0.52));
        tl.fromTo(b.rule, { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: 0.5, ease: "power3.out" }, P(0.6));
        tl.fromTo(b.count, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, P(0.66));

        if (i === 0) {
          /* 아래에서 마스크가 걷히며 올라온다 */
          tl.fromTo(b.cards, { clipPath: "inset(0% 0% 100% 0%)", y: 70 }, { clipPath: SHOW, y: 0, duration: 0.62, stagger: 0.07, ease: "power3.out" }, P(0.66));
        } else if (i === 1) {
          /* 왼쪽에서 오른쪽으로 닦여 나온다 */
          tl.fromTo(b.cards, { clipPath: "inset(0% 100% 0% 0%)", x: -40 }, { clipPath: SHOW, x: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, P(0.66));
        } else {
          /* 가운데부터 펼쳐지며 아주 약한 overshoot */
          tl.fromTo(
            b.cards,
            { clipPath: "inset(12% 6% 12% 6%)", scale: 0.94, y: 40, opacity: 0 },
            { clipPath: SHOW, scale: 1, y: 0, opacity: 1, duration: 0.66, stagger: { each: 0.07, from: "center" }, ease: "back.out(1.3)" },
            P(0.64),
          );
        }

        /* 진행 표시 */
        tl.to(root.querySelectorAll(".pstage-dot")[i + 1], { backgroundColor: RED, scale: 1.25, duration: 0.3 }, P(0.55));
        tl.to(root.querySelectorAll(".pstage-dot")[i], { backgroundColor: "rgba(255,255,255,0.22)", scale: 1, duration: 0.3 }, P(0.55));
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="pstage">
      <div ref={canvasRef} className="pstage-canvas">
        {categories.map((c) => (
          <section key={c.num} className="pscene" style={{ ["--cat" as string]: c.color }}>
            <span className="pscene-bg" data-bg aria-hidden />

            <div className="pscene-inner">
              <div className="pscene-head">
                <span className="pscene-mask">
                  <span className="pscene-num" data-num>
                    {c.num}
                  </span>
                </span>
                <span className="pscene-mask">
                  <h3 className="pscene-name" data-name>
                    {c.name}
                  </h3>
                </span>
                <span className="pscene-count" data-count>
                  {c.items.length} projects
                </span>
                <span className="pscene-rule" data-rule aria-hidden />
              </div>

              <div className="pscene-row" style={{ ["--n" as string]: c.items.length }}>
                {c.items.map((it) => (
                  <a key={it.title} data-item href={it.repo} target="_blank" rel="noopener noreferrer" className="pcard">
                    <span className="pcard-top">
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
                    <CardStatus status={it.status} />
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
