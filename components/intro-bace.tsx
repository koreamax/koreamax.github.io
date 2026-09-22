"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * 사이트 최초 진입 시 1회 재생되는 ABCDE 오프닝.
 *
 * 처음부터 끝까지 한 흐름이다. 가운데 떠오른 ABCDE. 그 글자들이 그대로 줄어들어
 * 키워드 스택 자리로 내려앉고, 거기서 줄이 풀려 한 글자씩 제 칸으로 들어간다.
 * 움직이는 내내 글자를 바꿔치기하지 않는다 — 다 내려앉아 멈춘 뒤에야, 같은 자리
 * 같은 크기로 겹쳐 둔 히어로 글자에 조용히 넘긴다.
 *
 * 1) 검은 덮개 위에 ABCDE. 가 흐릿하게 떠오른다
 * 2) 덮개가 걷히고, 그 줄이 기울지 않고 같이 줄어들며 스택 맨 윗줄로 내려앉는다
 * 3) 그제서야 줄이 풀려 한 글자씩 제 칸으로 내려서고, 닿는 대로 히어로 글자가
 *    자리를 넘겨받아 나머지 글자가 이어 붙는다
 * 4) 그 사이 nav → 헤드라인 → 소개 → CTA → 얼굴 순으로 히어로가 등장한다
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

/* ── 흐름의 마디. 하나로 이어 놓아야 어디서 끊기는지 한눈에 보인다 ── */
const T_IN = 0.2; // 떠오르기 시작
const D_IN = 1.0; // 떠오르는 데 걸리는 시간
const T_ROW = 1.6; // 줄째로 내려앉기 시작 (마지막 글자가 뜬 직후 — 멈칫하지 않게)
const D_ROW = 0.85;
const T_DROP = T_ROW + D_ROW; // 줄이 풀려 제 칸으로
const D_DROP = 0.55;
const STEP = 0.05; // 글자 사이 간격
const D_HAND = 0.18; // 다 내려앉은 자리에서 히어로 글자로 넘기는 시간
const T_END = 3.8;

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

const mid = (r: DOMRect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

/**
 * 이 사이트는 body 를 CSS zoom 으로 통째로 확대·축소해 창에 맞춘다(fixed-canvas.ts).
 * 자로 잰 값(getBoundingClientRect)은 화면 좌표인데 transform 의 translate 는 그 안쪽
 * 좌표라, 잰 거리를 그대로 옮기면 딱 zoom 배만큼 덜 간다. 옮길 거리는 이 값으로 나눈다.
 */
function canvasZoom(): number {
  const d = document.documentElement;
  if (!d.classList.contains("fixed-canvas")) return 1;
  return Number.parseFloat(getComputedStyle(d).getPropertyValue("--z")) || 1;
}

/**
 * 상자가 아니라 글자를 (cx, cy) 에 scale 배로 놓는 transform.
 * 확대는 상자 중심을 축으로 도니, 글자 중심이 그 자리에 오도록 그만큼 빼 준다.
 */
function put(box: DOMRect, glyph: DOMRect, cx: number, cy: number, scale: number, z: number) {
  const bx = box.left + box.width / 2;
  const by = box.top + box.height / 2;
  const g = mid(glyph);
  return { x: (cx - bx - scale * (g.x - bx)) / z, y: (cy - by - scale * (g.y - by)) / z, scale };
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
    // 로고와 같은 빨간 마침표 — 글자들과 같이 줄어들다가 줄이 풀릴 때 조용히 사라진다
    const dot = overlay.querySelector<HTMLElement>(".intro-dot");

    const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
    const heroIni = gsap.utils.toArray<HTMLElement>("[data-flip-id].bace-ini");
    const heroRest = gsap.utils.toArray<HTMLElement>(".bace-rest");
    const rule = document.querySelector<HTMLElement>(".bace-rule");
    const portrait = document.querySelector<HTMLElement>("[data-hero-portrait]");

    document.documentElement.classList.add("intro-lock");
    // 빨간 막대는 처음엔 없다가 글자가 제자리를 잡는 동안 계속 자라난다
    if (rule) gsap.set(rule, { scaleY: 0, transformOrigin: "50% 0%" });
    // 히어로 요소는 인트로가 걷힐 때 등장하도록 미리 숨겨 둔다
    gsap.set(heroItems, { opacity: 0, y: 30 });
    // 제자리에 놓인 ABCDE 와 나머지 글자도 숨긴다. 글자가 다 내려앉은 뒤에 켜진다.
    gsap.set([...heroIni, ...heroRest], { opacity: 0 });
    gsap.set(heroRest, { x: -12 });
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

    /* 화면에 놓인 순서가 달라도 같은 글자끼리 이어지도록 data-flip-id 로 짝짓는다 */
    const pairs = words
      .map((w) => ({ w, h: heroIni.find((e) => e.dataset.flipId === w.dataset.flipId) || null }))
      .filter((p): p is { w: HTMLElement; h: HTMLElement } => Boolean(p.h));

    /**
     * 줄이 어디로 얼마만 하게 내려앉는지 — 딱 한 번 재서 나눠 쓴다.
     *
     * 재는 시점이 중요하다. 글꼴이 오기 전에 재면 대체 글꼴 기준이라 줄의 폭도 높이도
     * 달라 내려앉을 자리가 통째로 어긋난다. 구글 글꼴은 처음 쓰이는 순간에야 받아오기
     * 시작하므로 document.fonts.ready 도 믿을 수 없다. 그래서 값을 미리 굳히지 않고
     * 줄이 움직이기 시작하는 순간(T_ROW)에 처음 불리도록 둔다.
     */
    type Spot = { x: number; y: number; scale: number };
    let plan: { row: Spot[]; home: Spot[]; dot: Spot | null } | null = null;
    const measure = () => {
      if (plan) return plan;
      /* 상자가 아니라 글자 자체를 재야 한 줄로 선다.
         제자리 글자(.bace-ini)는 min-width 로 상자가 글자보다 넓고 line-height 도 달라서,
         상자 중심끼리 맞추면 글자마다 다른 만큼 어긋나 비뚤어져 보인다. */
      const fromBox = pairs.map((p) => p.w.getBoundingClientRect());
      const from = pairs.map((p) => ink(p.w));
      const to = pairs.map((p) => ink(p.h));
      const ok = pairs.length > 0 && from.every((r, i) => r.width && to[i]?.width && to[i].height);
      /* 잴 수 없으면 제자리에 둔다 — 글자는 그대로 히어로 쪽으로 넘어간다 */
      if (!ok) {
        const stay = pairs.map(() => ({ x: 0, y: 0, scale: 1 }));
        return (plan = { row: stay, home: stay, dot: { x: 0, y: 0, scale: 1 } });
      }

      /* 큰 줄과 제자리 글자의 크기 비. 글자마다 따로 재면 소수점 끝자리가 달라
         같은 순간에 글자마다 크기가 조금씩 어긋나므로 하나로 묶어 쓴다. */
      const ratio = from.reduce((a, r, i) => a + r.width / to[i].width, 0) / from.length;
      const small = 1 / ratio;
      const head = mid(to[0]); // 맨 윗줄 글자가 놓일 자리 — 줄째로 여기에 내려앉는다
      const lead = mid(from[0]);
      /* 큰 줄의 한 점이 줄어든 줄에서 놓일 자리. 글자든 마침표든 같은 식으로 옮겨야
         줄 전체가 한 덩어리로 움직이고 기울지 않는다. */
      const shrink = (p: { x: number; y: number }) => ({ x: head.x + (p.x - lead.x) / ratio, y: head.y + (p.y - lead.y) / ratio });

      const z = canvasZoom();
      const dBox = dot?.getBoundingClientRect() ?? null;
      const dRow = dBox ? shrink(mid(dBox)) : null;
      return (plan = {
        row: pairs.map((_, i) => {
          const r = shrink(mid(from[i]));
          return put(fromBox[i], from[i], r.x, r.y, small, z);
        }),
        home: pairs.map((_, i) => {
          const h = mid(to[i]);
          return put(fromBox[i], from[i], h.x, h.y, small, z);
        }),
        dot: dBox && dRow ? put(dBox, dBox, dRow.x, dRow.y, small, z) : null,
      });
    };

    pairs.forEach(({ w: el, h: hero }, i) => {
      const rest = hero.parentElement?.querySelector<HTMLElement>(".bace-rest") || null;

      // 1) 떠오른다 — 흐릿하게 아래에서 올라와 제 크기가 된다
      tl.fromTo(
        el,
        { opacity: 0, y: 34, scale: 0.94, filter: "blur(10px)", transformOrigin: "50% 50%" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: D_IN, ease: "power2.out" },
        T_IN + i * 0.07,
      );
      // 2) 한 줄 그대로 — 기울지 않고 같이 줄어들며 맨 윗줄 자리로 내려앉는다
      tl.to(
        el,
        { x: () => measure().row[i].x, y: () => measure().row[i].y, scale: () => measure().row[i].scale, duration: D_ROW, ease: "power2.inOut" },
        T_ROW,
      );
      // 3) 그제서야 줄이 풀려 한 글자씩 제 칸으로 내려선다 (A 는 이미 제자리라 안 움직인다)
      tl.to(
        el,
        { x: () => measure().home[i].x, y: () => measure().home[i].y, scale: () => measure().home[i].scale, duration: D_DROP, ease: "power3.inOut" },
        T_DROP + i * STEP,
      );
      // 내려앉는 동안 히어로 글자와 같은 빨강으로 물든다 — 넘겨줄 때 색이 튀지 않게
      tl.to(el, { color: "#da291c", textShadow: "0 0 34px rgba(218,41,28,0.5)", duration: 0.6, ease: "power1.out" }, T_DROP - 0.2);

      /* 4) 멈춘 자리에서 히어로 글자에 넘긴다. 같은 자리 같은 크기로 겹쳐 있어
            바뀌는 순간이 보이지 않는다 — 여기서만 글자가 갈린다. */
      const land = T_DROP + i * STEP + D_DROP - D_HAND;
      tl.to(hero, { opacity: 1, duration: D_HAND, ease: "none" }, land);
      tl.to(el, { opacity: 0, duration: D_HAND, ease: "none" }, land);
      // 넘겨받은 뒤에야 나머지 글자가 이어 붙는다
      if (rest) tl.to(rest, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", clearProps: "all" }, land + D_HAND);
    });

    if (dot) {
      // 마침표도 같은 줄의 일부다 — 글자들과 똑같이 줄어들며 따라 내려온다
      tl.fromTo(
        dot,
        { opacity: 0, y: 34, scale: 0.94, filter: "blur(10px)", transformOrigin: "50% 50%" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: D_IN, ease: "power2.out" },
        T_IN + pairs.length * 0.07,
      );
      tl.to(
        dot,
        {
          x: () => measure().dot?.x ?? 0,
          y: () => measure().dot?.y ?? 0,
          scale: () => measure().dot?.scale ?? 1,
          duration: D_ROW,
          ease: "power2.inOut",
        },
        T_ROW,
      );
      // 줄이 풀릴 때는 갈 칸이 없다 — 있던 자리에서 조용히 사라진다
      tl.to(dot, { opacity: 0, duration: 0.4, ease: "power2.in" }, T_DROP);
    }

    // 막대는 줄이 내려앉기 시작할 때부터 풀네임이 다 나올 때까지 계속 자란다
    if (rule) tl.to(rule, { scaleY: 1, duration: 1.7, ease: "none" }, T_ROW);
    tl.add(() => {}, T_END); // 완료 시점

    // 덮개가 걷히는 건 줄이 움직이기 직전. 바탕도 같은 #161616 이라 색이 달라지지 않는다.
    tl.to(overlay, { backgroundColor: "rgba(22,22,22,0)", duration: 0.5, ease: "power1.inOut" }, 1.35);
    tl.add(() => gsap.set(overlay, { pointerEvents: "none" }), T_ROW);
    // 히어로 요소 순차 등장 (nav → 헤드라인 → 소개 → CTA → 얼굴)
    tl.add(() => {
      gsap.to(heroItems, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.14, clearProps: "transform,opacity" });
      if (portrait) gsap.to(portrait, { scale: 1, duration: 0.9, ease: "power3.out", clearProps: "transform" });
    }, 2.3);

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
