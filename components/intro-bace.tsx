"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

/**
 * 사이트 최초 진입 시 1회 재생되는 BACE 오프닝.
 *
 * 1) 검은 화면 중앙에 BACE
 * 2) 같은 B / A / C / E 엘리먼트가 FLIP 으로 화면 곳곳으로 흩어짐 (동일 DOM, 새 글자 아님)
 * 3) 각 글자 옆에 나머지 글자가 붙어 Backend / AI / Cloud / Embedded 가 됨
 * 4) 그 네 단어가 다시 FLIP 으로 실제 히어로의 키워드 칩 자리(data-flip-id 일치)로 날아가고,
 *    배경이 걷히며 nav → 헤드라인 → 소개 → CTA → 얼굴 순으로 등장
 *
 * sessionStorage 로 같은 세션에서는 반복하지 않고, prefers-reduced-motion 이면 바로 히어로를 보여준다.
 */

const WORDS = [
  { l: "B", rest: "ackend", cls: "w-b" },
  { l: "A", rest: "I", cls: "w-a" },
  { l: "C", rest: "loud", cls: "w-c" },
  { l: "E", rest: "mbedded", cls: "w-e" },
] as const;

const KEY = "bace-intro-played";

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

export default function IntroBace() {
  const [show, setShow] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let played = false;
    try {
      played = sessionStorage.getItem(KEY) === "1";
    } catch {}

    if (reduced || played) {
      setShow(false);
      revealHero(true);
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;
    const words = gsap.utils.toArray<HTMLElement>(".intro-word", overlay);
    const chars = gsap.utils.toArray<HTMLElement>(".intro-ch", overlay);
    const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
    const heroKw = gsap.utils.toArray<HTMLElement>("[data-flip-id].kw");

    document.documentElement.classList.add("intro-lock");
    // 히어로 요소는 인트로가 걷힐 때 등장하도록 미리 숨겨 둔다 (오버레이 뒤라 보이지 않음)
    gsap.set(heroItems, { opacity: 0, y: 30 });
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

    // STEP 1 — BACE 등장 (0.2s) 후 잠시 정지
    tl.fromTo(
      words,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.04 },
      0.2,
    );

    // STEP 2 — 같은 글자들이 흩어짐 (FLIP)
    tl.add(() => {
      const state = Flip.getState(words);
      overlay.dataset.state = "scatter";
      Flip.from(state, { duration: 1.0, ease: "power3.inOut", stagger: 0.06, scale: true });
    }, 1.0);

    // STEP 3 — 글자 옆에 나머지가 붙어 키워드가 됨
    tl.add(() => {
      overlay.dataset.state = "words";
      gsap.fromTo(
        chars,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.028 },
      );
    }, 2.0);

    // STEP 4 — 네 단어가 실제 히어로의 키워드 칩으로 날아가고 배경이 걷힘
    tl.add(() => {
      const state = Flip.getState(words, { props: "color" });
      gsap.set(words, { display: "none" });
      gsap.set(heroKw, { opacity: 1 });
      Flip.from(state, {
        targets: heroKw,
        duration: 0.95,
        ease: "power3.inOut",
        scale: true,
        stagger: 0.05,
        props: "color",
        onComplete: () => gsap.set(heroKw, { clearProps: "all" }),
      });
      gsap.to(overlay, { backgroundColor: "rgba(22,22,22,0)", duration: 0.7, ease: "power2.inOut" });
      gsap.set(overlay, { pointerEvents: "none" });
    }, 2.85);

    // 히어로 요소 순차 등장 (nav → 헤드라인 → 소개 → CTA → 얼굴)
    tl.add(() => {
      gsap.to(heroItems, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, clearProps: "transform,opacity" });
      if (portrait) gsap.to(portrait, { scale: 1, duration: 0.9, ease: "power3.out", clearProps: "transform" });
    }, 3.05);

    tl.add(() => {}, 3.9); // 완료 시점

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
            <span className="intro-letter">{w.l}</span>
            <span className="intro-rest">
              {w.rest.split("").map((c, i) => (
                <span key={i} className="intro-ch">
                  {c}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
