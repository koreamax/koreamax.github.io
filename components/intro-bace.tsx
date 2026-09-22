"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * 사이트 최초 진입 시 1회 재생되는 BACE 오프닝.
 *
 * 1) 검은 화면 중앙에 ABCDE.
 * 2) 같은 B / A / C / E 엘리먼트가 FLIP 으로 화면 곳곳으로 흩어짐 (동일 DOM, 새 글자 아님)
 * 3) 각 글자 옆에 나머지 글자가 붙어 Backend / AI / Cloud / Embedded 가 됨
 * 4) 그 네 단어가 다시 FLIP 으로 실제 히어로의 키워드 칩 자리(data-flip-id 일치)로 날아가고,
 *    배경이 걷히며 nav → 헤드라인 → 소개 → CTA → 얼굴 순으로 등장
 *
 * sessionStorage 로 같은 세션에서는 반복하지 않고, prefers-reduced-motion 이면 바로 히어로를 보여준다.
 */

const WORDS = [
  { l: "A", cls: "w-a" },
  { l: "B", cls: "w-b" },
  { l: "C", cls: "w-c" },
  { l: "D", cls: "w-d" },
  { l: "E", cls: "w-e" },
] as const;

const KEY = "abcde-intro-played";

/** 히어로 요소들을 순차 등장시킨다 (인트로 유무와 상관없이 공통) */
function revealHero(fast: boolean) {
  const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
  if (!items.length) return;
  const portrait = document.querySelector<HTMLElement>("[data-hero-portrait]");
  gsap.set(items, { opacity: 0, y: 30 });
  if (portrait) gsap.set(portrait, { scale: 0.97 });
  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: fast ? 0.6 : 0.8,
    ease: "power3.out",
    stagger: fast ? 0.06 : 0.12,
    clearProps: "transform,opacity",
  });
  if (portrait) gsap.to(portrait, { scale: 1, duration: fast ? 0.6 : 0.9, ease: "power3.out", clearProps: "transform" });
}

/** 글자가 실제로 놓인 자리 — 상자의 여백을 걷어낸다 */
function ink(el: HTMLElement): DOMRect {
  const r = document.createRange();
  r.selectNodeContents(el);
  const b = r.getBoundingClientRect();
  return b.width && b.height ? b : el.getBoundingClientRect();
}

export default function IntroBace() {
  const [show, setShow] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let played = false;
    try {
      played = sessionStorage.getItem(KEY) === "1";
    } catch {}
    // 주소 끝에 ?intro 를 붙이면 세션에 상관없이 다시 볼 수 있다
    if (new URLSearchParams(window.location.search).has("intro")) played = false;

    if (reduced || played) {
      setShow(false);
      revealHero(true);
      return;
    }


    const overlay = overlayRef.current;
    if (!overlay) return;
    const words = gsap.utils.toArray<HTMLElement>(".intro-word", overlay);
    // 로고와 같은 빨간 마침표 — 글자들이 날아갈 때 조용히 사라진다
    const dot = overlay.querySelector<HTMLElement>(".intro-dot");

    const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
    const heroIni = gsap.utils.toArray<HTMLElement>("[data-flip-id].bace-ini");
    const heroRest = gsap.utils.toArray<HTMLElement>(".bace-rest");
    const rule = document.querySelector<HTMLElement>(".bace-rule");

    document.documentElement.classList.add("intro-lock");
    // 빨간 막대는 처음엔 없다가 글자가 제자리를 잡는 동안 계속 자라난다
    if (rule) gsap.set(rule, { scaleY: 0, transformOrigin: "50% 0%" });
    // 히어로 요소는 인트로가 걷힐 때 등장하도록 미리 숨겨 둔다
    gsap.set(heroItems, { opacity: 0, y: 30 });
    // 제자리에 놓인 ABCDE 와 나머지 글자도 숨긴다. 바꿔치기하는 순간 이것들이 켜진다.
    gsap.set([...heroIni, ...heroRest], { opacity: 0 });
    const portrait = document.querySelector<HTMLElement>("[data-hero-portrait]");
    if (portrait) gsap.set(portrait, { scale: 0.97 });

    let alive = true;
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        if (!alive) return;
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        document.documentElement.classList.remove("intro-lock");
        setShow(false);
      },
    });

    // STEP 1 — BACE 가 부드럽게 떠오르고 잠시 머문다
    tl.fromTo(
      dot ? [...words, dot] : words,
      { opacity: 0, y: 34, scale: 0.94, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power2.out",
        stagger: { each: 0.07, ease: "power1.inOut" },
      },
      0.2,
    );

    // 배경은 바꿔치기보다 먼저 걷어 둔다. 글자를 넘겨주는 순간에도 덮개가 남아 있으면
    // 날아가기 시작한 글자가 그 밑에 가려 한 번 깜빡이는 것처럼 보인다.
    // 페이지 바탕도 같은 #161616 이라 걷히는 동안 색이 달라지지 않는다.
    tl.to(overlay, { backgroundColor: "rgba(22,22,22,0)", duration: 0.45, ease: "power1.inOut" }, 1.45);

    // STEP 2 — 가운데 BACE 가 그대로 홈 화면의 제자리로 날아간다.
    // 글자마다 자기 타임라인을 갖고, 도착하기 전에 자기 단어가 이어 붙기 시작한다.
    tl.add(() => {
      /* 화면에 놓인 순서가 달라도 같은 글자끼리 이어지도록 data-flip-id 로 짝짓는다 */
      const pairs = words
        .map((w) => ({ w, h: heroIni.find((e) => e.dataset.flipId === w.dataset.flipId) || null }))
        .filter((p): p is { w: HTMLElement; h: HTMLElement } => Boolean(p.h));
      /* 상자가 아니라 글자 자체를 재야 한 줄로 선다.
         제자리 글자(.bace-ini)는 min-width 로 상자가 글자보다 넓고 line-height 도 달라서,
         상자 중심끼리 맞추면 글자마다 다른 만큼 어긋나 비뚤어져 보인다. */
      const from = pairs.map((p) => ink(p.w));
      const to = pairs.map((p) => ink(p.h));
      const toBox = pairs.map((p) => p.h.getBoundingClientRect());
      gsap.set(words, { display: "none" });
      if (dot) gsap.to(dot, { opacity: 0, scale: 0.86, duration: 0.55, ease: "power2.in" });
      // 막대는 글자가 이동하는 동안 계속 자라다가 풀네임이 다 나오면 멈춘다
      if (rule) gsap.to(rule, { scaleY: 1, duration: 2.0, ease: "none" });

      pairs.forEach(({ h: el }, i) => {
        const a = from[i];
        const b = to[i];
        if (!a || !b || !b.height) return;
        const rest = el.parentElement?.querySelector<HTMLElement>(".bace-rest") || null;
        /* 폭은 line-height 에 흔들리지 않는다 — 글자 폭끼리 맞춘다 */
        const scale = a.width / b.width;
        /* 확대는 상자 중심을 축으로 도니, 글자 중심이 제자리에 오도록 그만큼 빼 준다 */
        const box = toBox[i];
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        const dx = a.left + a.width / 2 - cx - scale * (b.left + b.width / 2 - cx);
        const dy = a.top + a.height / 2 - cy - scale * (b.top + b.height / 2 - cy);

        gsap.set(el, { x: dx, y: dy, scale, transformOrigin: "50% 50%", opacity: 1, color: "#ffffff", textShadow: "0 0 0 rgba(218,41,28,0)" });
        if (rest) gsap.set(rest, { opacity: 0, x: -12 });

        const t = gsap.timeline({ delay: i * 0.075 });
        t.to(el, { x: 0, y: 0, scale: 1, duration: 1.15, ease: "power2.inOut", clearProps: "transform,transformOrigin" });
        // 아직 날아오는 중에 색이 물들고 단어가 이어진다 — 멈춤 없이 한 흐름
        t.to(el, { color: "#da291c", textShadow: "0 0 34px rgba(218,41,28,0.5)", duration: 0.7, ease: "power1.out", clearProps: "color,textShadow" }, 0.55);
        if (rest) t.to(rest, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", clearProps: "all" }, 0.62);
      });
      gsap.set(overlay, { pointerEvents: "none" });
    }, 1.9);

    // 히어로 요소 순차 등장 (nav → 헤드라인 → 소개 → CTA → 얼굴)
    tl.add(() => {
      gsap.to(heroItems, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.14, clearProps: "transform,opacity" });
      if (portrait) gsap.to(portrait, { scale: 1, duration: 0.9, ease: "power3.out", clearProps: "transform" });
    }, 2.3);

    tl.add(() => {}, 4.1); // 완료 시점

    return () => {
      alive = false;
      tl.kill();
      document.documentElement.classList.remove("intro-lock");
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      className="intro"
      data-state="word"
      aria-hidden
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="intro-stage">
        {WORDS.map((w) => (
          <div key={w.l} className={`intro-word ${w.cls}`} data-flip-id={`kw-${w.l}`}>
            {w.l}
          </div>
        ))}
        {/* 링크 썸네일과 같은 네모난 마침표 — 글리프 대신 사각형을 그린다 */}
        <div className="intro-dot" aria-hidden />
      </div>
    </div>
  );
}
