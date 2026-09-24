"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { strengths } from "@/components/portfolio-data";

/* three.js 가 무거워 첫 화면 묶음에 싣지 않는다 — 이 장면에 가까워질 때 따로 받는다 */
const OrbitPlanet = dynamic(() => import("@/components/ui/orbit-delivery-hero").then((m) => m.OrbitPlanet), { ssr: false });

/**
 * HOW 로 들어가기 전의 한 장면 — 태블릿 한 대.
 *
 * 왼쪽에 제목과 두 화면의 차례, 오른쪽에 태블릿이 놓인다. 태블릿 화면엔 작은 행성 위를
 * 배달부가 달리고(끌면 행성이 돈다), 그 머리 위에 HOW. 가 떠 있다.
 * 이 장면을 사진 벽이 기울어진 채 올라와 덮는다(components/ui/story-scroll.tsx).
 */

const shown = strengths.filter((s) => !s.draft);

export default function HowIntro() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* 글과 태블릿은 들어올 때 한 번 올라온다 */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && root.classList.add("is-in")), { threshold: 0.25 });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="hw-intro">
      <div className="hw-copy">
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
      </div>

      {/* 태블릿 — 행성 위를 달리는 배달부, 그 머리 위에 HOW. */}
      <div className="hw-tab">
        <div className="hw-screen">
          <OrbitPlanet zoomDiv={5.2} planetTop={0.58} />
          <b className="hw-screen-title" aria-hidden>
            HOW<i>.</i>
          </b>
        </div>
      </div>
    </div>
  );
}
