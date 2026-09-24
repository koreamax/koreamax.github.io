"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { attachWheelSnap } from "@/lib/wheel-snap";

gsap.registerPlugin(ScrollTrigger);

/** 한 장면에서 다음 장면으로 넘어가는 데 걸리는 시간(초) */
const SNAP_DUR = 1.1;

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

export default function FlowArt({
  children,
  className,
  snap = false,
  snapIn = false,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  /** 장면 사이에서 조금만 굴려도 다음(또는 앞) 장면까지 한 번에 넘어간다 */
  snap?: boolean;
  /** 바로 위 구역의 끝(첫 장면이 화면 아래에 닿은 자리)에서 첫 장면까지도 한 번에 넘어간다 */
  snapIn?: boolean;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const count = React.Children.count(children);

  /* 장면 사이 넘김 — 휠이나 손가락을 조금만 움직여도 끝까지 간다. 장면 사이 구간에 있을 때만 가로챈다 */
  useEffect(() => {
    const root = ref.current;
    if (!root || !snap) return;
    /* 각 장면이 화면 맨 위에 닿는 스크롤 위치 */
    const stops = () => {
      const s = [...root.querySelectorAll<HTMLElement>("[data-flow-mark]")].map((m) => Math.round(m.getBoundingClientRect().top + window.scrollY));
      /* 앞 구역이 끝나는 자리 — 첫 장면의 윗변이 화면 아랫변에 닿는 스크롤 위치 */
      if (snapIn && s.length) s.unshift(s[0] - window.innerHeight);
      return s;
    };
    return attachWheelSnap(stops, SNAP_DUR);
  }, [snap, snapIn, count]);

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
