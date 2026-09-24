"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 장면이 한 장씩 겹쳐 쌓이며 넘어가는 스크롤 (21st.dev story-scroll 을 이 사이트에 맞게 옮긴 것).
 *
 * 앞 장면은 화면에 붙어 있고, 다음 장면이 아래에서 올라오며 왼쪽 아래 모서리를 축으로
 * 30° 기울어진 채 들어와 똑바로 서면서 앞 장면을 덮는다.
 *
 * 원본은 ScrollTrigger 의 pin 으로 앞 장면을 붙잡는다. 이 사이트는 화면 전체를 zoom 으로
 * 확대 · 축소하는데 pin 은 잰 값을 화면 좌표로 다시 써 넣어 어긋난다 — 그래서 붙잡는 건
 * sticky 에 맡기고, 기울기만 GSAP 로 스크롤에 묶는다. 높이도 100vh 대신 도면 높이(--vh)를 쓴다.
 * 색과 글은 넘겨받은 장면이 정한다 — 여기는 움직임만 갖는다.
 */

export interface FlowSectionProps {
  className?: string;
  /** 장면 판(기울어지는 판)에 입힐 스타일 — 바탕색은 여기서 준다 */
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({ className, style, children, "aria-label": ariaLabel }) => (
  <>
    {/* 장면이 붙어 있어도 제자리를 알려 주는 표시 — 기울기의 시작 · 끝을 여기서 잰다 */}
    <span data-flow-mark aria-hidden className="flow-mark" />
    <section data-flow-section aria-label={ariaLabel} className={`flow-sec ${className ?? ""}`}>
      <div className="flow-inner" style={style}>
        {children}
      </div>
    </section>
  </>
);

export default function FlowArt({ children, className, "aria-label": ariaLabel }: { children: React.ReactNode; className?: string; "aria-label"?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const count = React.Children.count(children);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const sections = [...root.querySelectorAll<HTMLElement>("[data-flow-section]")];
    const marks = [...root.querySelectorAll<HTMLElement>("[data-flow-mark]")];
    sections.forEach((s, i) => {
      s.style.zIndex = String(i + 1);
      /* 마지막 장면은 붙잡을 필요가 없다 — 덮을 다음 장면이 없다 */
      s.classList.toggle("is-stuck", i < sections.length - 1);
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      sections.forEach((s, i) => {
        if (i === 0) return;
        const inner = s.querySelector<HTMLElement>(".flow-inner");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { rotation: 30, transformOrigin: "0% 100%" },
          {
            rotation: 0,
            ease: "none",
            scrollTrigger: { trigger: marks[i], start: "top bottom", end: "top 25%", scrub: true, invalidateOnRefresh: true },
          },
        );
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, [count]);

  return (
    <div ref={ref} aria-label={ariaLabel} className={`flow-art ${className ?? ""}`}>
      {children}
    </div>
  );
}
