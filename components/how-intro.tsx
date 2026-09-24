"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { strengths } from "@/components/portfolio-data";
import { designViewport } from "@/components/fixed-canvas";

gsap.registerPlugin(ScrollTrigger);

/**
 * HOW 로 들어가기 전의 한 장면 — 스크롤로 넘기는 수첩.
 *
 * 위쪽이 스프링으로 묶인 수첩이 화면에 붙고, 스크롤하는 만큼 한 장씩 위로 넘어간다.
 * 넘어가는 장마다 실제 기록 · 학습 화면이 한 장씩 지나가고, 마지막 장을 넘기면
 * 표지(HOW.)가 드러난 뒤 사진 벽이 이어진다.
 *
 * 다른 장면과 겹치지 않게 움직임을 고른다 — 복도는 카드가 날아오고(rotateY · 깊이),
 * 프로젝트는 장면이 흩어졌다 모인다. 여기는 한 장씩 위로 뒤집힌다(rotateX, 위쪽 축).
 * transform 만 쓰므로 저사양에서도 가볍다.
 */

const shown = strengths.filter((s) => !s.draft);
/** 넘길 장 수 — 두 화면의 사진을 번갈아 섞어 기록과 학습이 고루 지나가게 */
const PAGE_COUNT = 10;
const small = (src: string) => src.replace("/uploads/", "/uploads/w640/");
const PAGES = (() => {
  const out: string[] = [];
  const lists = shown.map((s) => s.shots);
  for (let i = 0; out.length < PAGE_COUNT && lists.some((l) => i < l.length); i++)
    for (const l of lists) if (i < l.length && out.length < PAGE_COUNT) out.push(small(l[i]));
  return out;
})();
/** 한 장이 넘어가기 시작하는 간격 (타임라인 단위) — 한 장이 다 넘어가기 전에 다음 장이 따라 든다 */
const STEP = 0.55;
const RINGS = 11;

export default function HowIntro() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    /* 글은 들어올 때 한 번 올라온다 */
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && root.classList.add("is-in")), { threshold: 0.25 });
    io.observe(root);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* 좁은 화면과 동작 최소화에서는 붙이지 않고 첫 장만 펴 둔 채 평범하게 흐른다 */
    if (reduced || designViewport().w <= 1000) {
      track.classList.add("hw-flow");
      root.classList.add("is-in");
      return () => io.disconnect();
    }

    const ctx = gsap.context(() => {
      const pages = gsap.utils.toArray<HTMLElement>(".hw-page", root);
      const n = pages.length;
      let shownIdx = -1;
      const tl = gsap.timeline({
        defaults: { ease: "power2.in" },
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: () => {
            /* 지금 펼쳐져 있는 장 — 다 넘기면 표지 */
            const idx = Math.min(n, Math.floor((tl.time() + STEP * 0.4) / STEP));
            if (idx === shownIdx || !countRef.current) return;
            shownIdx = idx;
            countRef.current.textContent = idx >= n ? "HOW" : String(idx + 1).padStart(2, "0");
          },
        },
      });
      /* 첫 장은 잠깐 그대로 보여 준 뒤 넘긴다 */
      tl.to({}, { duration: 0.35 });
      pages.forEach((p, i) => {
        const at = 0.35 + i * STEP;
        tl.to(p, { rotateX: 168, duration: 1 }, at);
        /* 위로 넘어간 장은 수첩 뒤로 사라진다 — 쌓여서 위쪽을 가리지 않게 */
        tl.to(p, { autoAlpha: 0, duration: 0.2, ease: "none" }, at + 0.8);
      });
      /* 표지에서 잠깐 멈춘다 */
      tl.to({}, { duration: 0.6 });
    }, root);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={trackRef} className="hw-track">
      <section ref={rootRef} className="hw-intro" aria-labelledby="hw-title">
        <div className="hw-copy">
          <p className="hw-kicker">HOW</p>
          <h2 id="hw-title" className="hw-title">
            일하는 방식
          </h2>
          <ol className="hw-index">
            {shown.map((s) => (
              <li key={s.num}>
                <b>{s.num}</b>
                <span>{s.title}</span>
              </li>
            ))}
          </ol>
          <p className="hw-count" aria-hidden>
            <b ref={countRef}>01</b>
            <span>/ {String(PAGES.length).padStart(2, "0")}</span>
          </p>
        </div>

        <div className="hw-pad" aria-hidden>
          <span className="hw-rings">
            {Array.from({ length: RINGS }, (_, i) => (
              <i key={i} />
            ))}
          </span>
          <div className="hw-sheets">
            {/* 맨 밑 표지 — 다 넘기면 드러난다 */}
            <div className="hw-last">
              <b>
                HOW<span>.</span>
              </b>
              <em>scroll ↓</em>
            </div>
            {PAGES.map((src, i) => (
              <div key={src} className="hw-page" style={{ zIndex: PAGES.length - i }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="hw-front" src={src} alt="" loading="lazy" decoding="async" />
                <span className="hw-back" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
