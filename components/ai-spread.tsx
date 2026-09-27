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

/* 펼치기 시작 · 끝 (트랙 진행도) */
const OPEN_AT = 0.08;
const OPEN_END = 0.5;

const vh = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--vh")) || 8.6;

/* 가운데를 기준으로 좌우로 몇 번째인지에 따라 겹친 자리와 펼친 자리를 정한다.
   원본은 간격이 18vw 라 양 끝 카드가 화면 밖으로 나간다 — 여덟 장이 다 들어오게 카드를 줄이고(17vw)
   간격을 12vw, 바깥 기울기를 조금 덜(-10°씩) 준다. 양 끝 카드도 화면 안쪽에 여백을 두고 선다 */
const layout = (i: number, n: number) => {
  const o = i - (n - 1) / 2;
  const a = Math.abs(o);
  return {
    z: Math.round(10 - a),
    stacked: { x: o * 2 * VW, y: o * -2, rotationZ: o * 2.5, rotationY: 0, scale: 0.75 },
    spread: { x: o * 12 * VW, y: a * 3, rotationZ: o * 1.5, rotationY: o * -10, scale: 1 - a * 0.05 },
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

    /* 중간에 멈추면 끝까지 — 다 접힌 자리(0)나 다 펼친 자리(OPEN_END)로 간다.
       다 펼친 뒤 머무는 구간 안에서는 붙잡지 않는다 — 거기서 트랙 끝까지 끌고 가면 다 보기도 전에 넘어간다 */
    const baseSnap = completeSnap(() => [0, OPEN_END + 0.01]);
    const baseTo = baseSnap.snapTo as (v: number, s?: ScrollTrigger) => number;
    const holdSnap = { ...baseSnap, snapTo: (v: number, self?: ScrollTrigger) => (v > OPEN_END + 0.012 ? v : baseTo(v, self)) };

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

      /* 구간: 앞 8% 는 겹친 채, 8~50% 에 펼치고, 나머지 절반은 다 펼친 채 머문다 —
         펼쳐지자마자 다음 구역으로 넘어가 버리지 않게, 다 본 뒤에 한참 더 굴려야 내려간다 */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          /* 펼치다 멈추면 끝까지 — 굴리던 방향으로 다 펼치거나 다 접는다 */
          snap: holdSnap,
          onUpdate: (self) => track.classList.toggle("is-open", self.progress > 0.95),
        },
      });
      tl.to({}, { duration: OPEN_AT });
      cards.forEach((c, i) => tl.to(c, { ...at(i, "spread"), duration: OPEN_END - OPEN_AT, ease: "power3.inOut" }, OPEN_AT));
      tl.to(copy, { y: () => -22 * vh(), scale: 1, duration: OPEN_END - OPEN_AT - 0.04, ease: "none" }, OPEN_AT + 0.04);
      tl.to(copy, { opacity: 1, duration: 0.2, ease: "none" }, OPEN_AT + 0.14);
      tl.to({}, { duration: 1 - OPEN_END }, OPEN_END);
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
