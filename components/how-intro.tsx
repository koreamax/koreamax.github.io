"use client";

import { useEffect, useRef } from "react";
import { strengths } from "@/components/portfolio-data";

/**
 * HOW 로 들어가기 전의 한 장면 — 태블릿 한 대.
 *
 * 왼쪽에 제목과 두 화면의 차례, 오른쪽에 태블릿이 놓인다. 태블릿 화면은 반으로 갈라
 * 왼쪽엔 가는 안내선과 빛살 표시, 오른쪽 카드엔 HOW. 와 두 화면의 이름이 앉는다.
 * 아래 둥근 단추를 누르면 사진 벽으로 내려간다.
 * 이 장면을 사진 벽이 기울어진 채 올라와 덮는다(components/ui/story-scroll.tsx).
 */

const shown = strengths.filter((s) => !s.draft);
/** 태블릿 카드에 들어가는 짧은 이름과 쓰는 곳 — 화면 순서대로 */
const FIELDS = [
  { name: "업무 · 회의 · 일정 기록", where: "Notion" },
  { name: "스터디 · 학습 내용 정리", where: "GitHub · Velog" },
];

/** 빛살 표시 — 긴 네 줄과 짧은 네 줄이 가운데를 비워 두고 뻗는다 */
function Burst() {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg className="hw-burst" viewBox="-60 -60 120 120" aria-hidden>
      {rays.map((a) => {
        const long = a % 90 === 0;
        const r0 = long ? 10 : 8;
        const r1 = long ? 56 : 30;
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={Math.cos(rad) * r0}
            y1={Math.sin(rad) * r0}
            x2={Math.cos(rad) * r1}
            y2={Math.sin(rad) * r1}
            stroke="#ffffff"
            strokeWidth={3.2}
            strokeLinecap="butt"
          />
        );
      })}
      <circle r="3" fill="#da291c" />
    </svg>
  );
}

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

  const down = () => document.getElementById("how")?.scrollIntoView({ behavior: "smooth", block: "start" });

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

      <div className="hw-tab">
        <div className="hw-screen">
          {/* 왼쪽 반 — 가는 안내선 위에 빛살 표시 */}
          <div className="hw-pane-l" aria-hidden>
            <span className="hw-brand">
              이민형<i>.</i>
            </span>
            <svg className="hw-guides" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="50" y1="0" x2="50" y2="100" />
              <line x1="0" y1="50" x2="100" y2="50" />
              <line x1="0" y1="14" x2="72" y2="86" />
            </svg>
            <Burst />
            <span className="hw-copyright">© 2026 Minhyung Lee</span>
          </div>

          {/* 오른쪽 반 — 카드 */}
          <div className="hw-card">
            <span className="hw-card-top">How I work</span>
            <b className="hw-card-title">
              HOW<i>.</i>
            </b>
            <div className="hw-fields">
              {FIELDS.map((f, i) => (
                <span key={f.name} className="hw-field">
                  <em>{String(i + 1).padStart(2, "0")}</em>
                  <span className="hw-field-v">{f.name}</span>
                  <span className="hw-field-w">{f.where}</span>
                </span>
              ))}
            </div>
            <button type="button" className="hw-go" onClick={down}>
              SCROLL
              <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
