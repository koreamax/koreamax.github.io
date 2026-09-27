"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { strengths } from "@/components/portfolio-data";
import { completeSnap } from "@/lib/scroll-complete";

gsap.registerPlugin(ScrollTrigger);

/**
 * HOW 03 · AI 활용 능력 — 겹쳐 있던 카드가 스크롤을 따라 부채꼴로 펼쳐진다.
 * (21st.dev panoramic-spread-hero 의 배치 · 기울기 · 곡선을 옮기고, 색과 글은 이 사이트 것으로)
 *
 * 원본은 motion 의 useScroll 로 진행도를 잰다. 이 사이트는 화면 전체를 zoom 으로 키우고 줄여
 * 요소 위치(도면 px)와 스크롤 위치(화면 px)의 단위가 달라 어긋난다 — 다른 장면처럼 ScrollTrigger 로 잰다.
 * 가로 단위 1vw 는 도면 폭의 1%(14.4px), 세로 단위는 --vh 를 쓴다.
 */

const item = strengths.find((s) => s.spread);
const VW = 14.4;

const vh = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--vh")) || 8.6;

/* 가운데를 기준으로 좌우로 몇 번째인지에 따라 겹친 자리와 펼친 자리를 정한다 */
const layout = (i: number, n: number) => {
  const o = i - (n - 1) / 2;
  const a = Math.abs(o);
  return {
    z: Math.round(10 - a),
    stacked: { x: o * 2 * VW, y: o * -2, rotationZ: o * 2.5, rotationY: 0, scale: 0.75 },
    spread: { x: o * 18 * VW, y: a * 3, rotationZ: o * 1.5, rotationY: o * -12, scale: 1 - a * 0.05 },
  };
};

export default function AiSpread() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !item) return;
    const cards = [...track.querySelectorAll<HTMLElement>(".ai-card")];
    const scene = track.querySelector<HTMLElement>(".ai-scene");
    const copy = track.querySelector<HTMLElement>(".ai-copy");
    const n = cards.length;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const at = (i: number, key: "stacked" | "spread") => {
        const L = layout(i, n)[key];
        return { ...L, y: () => L.y * vh() };
      };
      /* 움직임을 줄인 환경에서는 펼친 채로 둔다 */
      if (reduced) {
        cards.forEach((c, i) => gsap.set(c, at(i, "spread")));
        gsap.set(copy, { y: () => -22 * vh(), opacity: 1 });
        return;
      }

      cards.forEach((c, i) => gsap.set(c, at(i, "stacked")));
      gsap.set(copy, { y: () => 10 * vh(), scale: 0.85, opacity: 0 });

      /* 구간: 앞 15% 는 겹친 채, 15~85% 에 펼치고, 뒤 15% 는 펼친 채 머문다 */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          /* 펼치다 멈추면 끝까지 — 굴리던 방향으로 다 펼치거나 다 접는다 */
          snap: completeSnap(() => [0, 1]),
          onUpdate: (self) => track.classList.toggle("is-open", self.progress > 0.95),
        },
      });
      tl.to({}, { duration: 0.15 });
      cards.forEach((c, i) => tl.to(c, { ...at(i, "spread"), duration: 0.7, ease: "power3.inOut" }, 0.15));
      tl.to(copy, { y: () => -22 * vh(), scale: 1, duration: 0.65, ease: "none" }, 0.2);
      tl.to(copy, { opacity: 1, duration: 0.35, ease: "none" }, 0.4);
      tl.to({}, { duration: 0.15 }, 0.85);
    }, track);

    /* 다 펼친 뒤에는 마우스를 따라 판 전체가 살짝 기운다 */
    let tilt: ((e: PointerEvent) => void) | null = null;
    if (!reduced && scene) {
      const rx = gsap.quickTo(scene, "rotationX", { duration: 0.8, ease: "power3.out" });
      const ry = gsap.quickTo(scene, "rotationY", { duration: 0.8, ease: "power3.out" });
      tilt = (e) => {
        if (!track.classList.contains("is-open")) {
          rx(0);
          ry(0);
          return;
        }
        rx((e.clientY / window.innerHeight - 0.5) * -10);
        ry((e.clientX / window.innerWidth - 0.5) * 10);
      };
      window.addEventListener("pointermove", tilt, { passive: true });
    }

    return () => {
      ctx.revert();
      if (tilt) window.removeEventListener("pointermove", tilt);
    };
  }, []);

  if (!item) return null;
  const [head, ...rest] = item.title.split(": ");
  const sub = rest.join(": ");
  const keep = item.keep && sub.endsWith(item.keep) ? item.keep : "";

  return (
    <div ref={trackRef} className="ai-track" id="ai">
      <div className="ai-stage">
        <span className="ai-glow" aria-hidden />
        <div className="ai-scene">
          {item.shots.map((src, i) => (
            <div className="ai-slot" key={src} style={{ zIndex: layout(i, item.shots.length).z }}>
              <figure className="ai-card">
                <span className="ai-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={item.labels?.[i] ?? item.ph} loading="lazy" decoding="async" draggable={false} />
                </span>
                {item.labels?.[i] && <figcaption className="ai-label">{item.labels[i]}</figcaption>}
              </figure>
            </div>
          ))}
        </div>
        <div className="ai-copy">
          <b className="ai-num">{item.num}</b>
          <h2 className="ai-title">{head}</h2>
          {sub && (
            <p className="ai-sub">
              {keep ? sub.slice(0, -keep.length) : sub}
              {keep && <span className="nowrap">{keep}</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
