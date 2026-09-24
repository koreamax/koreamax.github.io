"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import TechBadge from "@/components/tech-badge";
import IntroBace from "@/components/intro-bace";
import ProjectScenes from "@/components/project-scenes";
import Strengths from "@/components/strengths";
import HowIntro from "@/components/how-intro";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import SiteFooter from "@/components/site-footer";
import { designViewport } from "@/components/fixed-canvas";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { LiquidMetalPill } from "@/components/ui/liquid-metal-pill";
import {
  awards,
  corridorCards,
  moreProjects,
  projects,
  spreadCards,
} from "@/components/portfolio-data";

/* ───────────────────────── 공통 스타일 ───────────────────────── */

const RED = "#da291c";
const GREEN = "#22c55e";
/** 분야 태그 색 (Web / App / AI / Cloud / Embedded) */
const TAG_COLORS: Record<string, string> = {
  AI: "#a78bfa",
  WEB: "#60a5fa",
  APP: "#22d3ee",
  "WEB/APP": "#60a5fa",
  BACKEND: "#60a5fa",
  CLOUD: "#fbbf24",
  EMBEDDED: "#34d399",
};

/** "Cloud · AI · Web" 같은 태그 문자열을 색 칩으로 */
function TagChips({ tag, size = "sm" }: { tag: string; size?: "sm" | "xs" }) {
  const parts = tag.split("·").map((t) => t.trim()).filter(Boolean);
  const h = size === "sm" ? 22 : 20;
  return (
    <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
      {parts.map((t) => {
        const c = TAG_COLORS[t.toUpperCase()] ?? "rgba(255,255,255,0.6)";
        return (
          <span
            key={t}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: h,
              padding: "0 9px",
              borderRadius: 6,
              background: `color-mix(in srgb, ${c} 16%, transparent)`,
              border: `1px solid color-mix(in srgb, ${c} 55%, transparent)`,
              color: c,
              fontSize: size === "sm" ? 11 : 10.5,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </span>
        );
      })}
    </span>
  );
}

/** 프로젝트/활동 상태 색: 진행 중 = 초록, 종료/완료 = 빨강 */
const statusColor = (status: string) => (status.includes("진행") ? GREEN : RED);
const BHS = "'Black Han Sans', sans-serif";
const MONO = "'Nanum Gothic Coding', monospace";

const pillBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  height: 48,
  padding: "0 30px",
  borderRadius: 9999,
  color: "#ffffff",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 1.4,
  textTransform: "uppercase",
};

const contactBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  height: 52,
  padding: "0 28px",
  borderRadius: 9999,
  color: "#ffffff",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 1.2,
  textTransform: "uppercase",
};

/** 연락처 버튼 묶음 — 히어로 첫 화면에 둔다 */
function Contacts() {
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      <a href="mailto:koreamax012@gmail.com" className="btn-ghost btn-email" style={{ ...contactBtn, border: "1px solid rgba(255,255,255,0.3)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        Email
      </a>
      <a href="https://github.com/koreamax" target="_blank" rel="noopener noreferrer" className="btn-ghost btn-github" style={{ ...contactBtn, border: "1px solid rgba(255,255,255,0.3)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
        GitHub
      </a>
      <a href="https://velog.io/@koreamax01/posts" target="_blank" rel="noopener noreferrer" className="btn-ghost btn-velog" style={{ ...contactBtn, border: "1px solid rgba(255,255,255,0.3)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 3, background: "#20c997", color: "#161616", fontFamily: MONO, fontWeight: 700, fontSize: 13 }}>V</span>
        Velog
      </a>
      <a href="https://www.linkedin.com/in/koreamax" target="_blank" rel="noopener noreferrer" className="btn-ghost btn-linkedin" style={{ ...contactBtn, border: "1px solid rgba(255,255,255,0.3)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </a>
    </div>
  );
}

/* ───────────────────────── 3D 프로젝트 복도 ───────────────────────── */

/* 카드를 키우는 배수. 가로세로를 같은 값으로 키워야 화면 비율이 그대로라 잘리지 않는다 */
const CARD_SCALE = 1.3;
/* 카드가 커진 만큼 지나가는 길도 벌려야 서로 겹치지 않는다 (rb·re = 레일이 좌우로 벌어지는 폭) */
const RAIL_SPREAD = 1.58;

const P = { persp: 30, cardH: 25, birth: 2.2, exit: 40, rb: -12 * RAIL_SPREAD, re: 48 * RAIL_SPREAD, fan: 2.75, tb: 6, te: 28, stops: 24 };

function keyframes(dir: 1 | -1, name: string): string {
  let s = "";
  for (let i = 0; i <= P.stops; i++) {
    const u = i / P.stops;
    const sc = (P.birth / P.cardH) * Math.pow(P.exit / P.birth, u);
    const z = P.persp * (1 - 1 / sc);
    const rail = P.re - (P.re - P.rb) * Math.pow(1 - u, P.fan);
    const t = P.tb + (P.te - P.tb) * u;
    s +=
      (u * 100).toFixed(2) +
      "%{transform:translate3d(" +
      (dir * rail).toFixed(2) +
      "cqw,0," +
      z.toFixed(2) +
      "cqw) rotateY(" +
      (-dir * t).toFixed(2) +
      "deg)}";
  }
  return "@keyframes " + name + "{" + s + "}";
}

const CORRIDOR_CSS = keyframes(1, "ishr") + keyframes(-1, "ishl");
/* 한 바퀴 도는 데 걸리는 시간(초). 작을수록 빠르게 지나간다 */
const CORRIDOR_SPEED = 38 / 1.5;

/**
 * 같은 카드를 양쪽에 다 태우면 레일마다 열한 장이 줄줄이 붙어 앞뒤가 서로 가린다.
 * 그래서 프로젝트를 한 줄씩 번갈아 나눠 싣는다. 레일당 대여섯 장이라
 * 카드 사이가 두 배로 벌어지고, 프로젝트는 여전히 한 바퀴에 한 번씩만 나온다.
 */
const CORRIDOR_RAILS = {
  ishr: corridorCards.filter((_, i) => i % 2 === 0),
  ishl: corridorCards.filter((_, i) => i % 2 === 1),
} as const;

function Corridor() {
  return (
    <div data-corridor-stage data-offscreen-pause style={{ position: "absolute", inset: 0, pointerEvents: "none", perspective: "30cqw", perspectiveOrigin: "50% 55%" }}>
      <style dangerouslySetInnerHTML={{ __html: CORRIDOR_CSS }} />
      <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
        {(["ishr", "ishl"] as const).map((name) =>
          CORRIDOR_RAILS[name].map((card, i, rail) => {
            /* 실제 화면이 있는 카드는 화면 비율에 맞춰 가로로 눕힌다 */
            const shots = card.shots ?? [];
            const w = (card.cardW ?? (shots.length ? 30 : 18)) * CARD_SCALE;
            const h = (card.cardH ?? (shots.length ? 19 : 25)) * CARD_SCALE;
            return (
              <div
                key={name + i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "55%",
                  width: `${w}cqw`,
                  height: `${h}cqw`,
                  marginLeft: `${-w / 2}cqw`,
                  marginTop: `${-h / 2}cqw`,
                  borderRadius: 6,
                  overflow: "hidden",
                  backfaceVisibility: "hidden",
                  background: "#1f1f1f",
                  /* 1px 테두리는 3D 로 크게 늘어나면 매 프레임 다시 그려지며 지지직거린다 */
                  willChange: "transform",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: shots.length ? 0 : "1.4cqw",
                  animation: `${name} ${CORRIDOR_SPEED}s linear infinite`,
                  animationDelay: `${-(i * CORRIDOR_SPEED) / rail.length}s`,
                }}
              >
                {shots.length > 0 && (
                  /* 한 프로젝트의 화면을 한 카드 안에 모아 깐다 */
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      gridTemplateColumns: `repeat(${card.shotColumns ?? (shots.length > 1 ? 2 : 1)}, 1fr)`,
                      gridAutoRows: "1fr",
                      /* 화면끼리 붙여 바탕이 비치지 않게 한다 */
                      gap: 0,
                      background: "#101010",
                    }}
                  >
                    {shots.map((src, k) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={src}
                        src={src}
                        alt={card.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          /* 카드 높이를 화면 비율에 맞춰 잡아 두었으므로 잘려 나가는 부분이 없다 */
                          objectFit: "cover",
                          display: "block",
                          /* 홀수로 넣으면 빈칸이 생기므로 첫 장을 한 줄로 눕힌다 */
                          gridColumn: !card.shotColumns && shots.length % 2 === 1 && k === 0 ? "1 / -1" : undefined,
                        }}
                      />
                    ))}
                  </span>
                )}
                {shots.length > 0 && (
                  /* 이름이 읽히도록 아래쪽만 어둡게 */
                  <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 58%, rgba(0,0,0,0.88) 100%)" }} />
                )}
                <span
                  style={{
                    position: "relative",
                    padding: shots.length ? "0 1.3cqw 1.1cqw" : 0,
                    fontFamily: BHS,
                    fontSize: "2cqw",
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </span>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── 프로젝트 수 카운터 ───────────────────────── */

/** 화면에 내세우는 프로젝트 수 — 목록 길이와 따로 둔다 */
const TOTAL_PROJECTS = 10;
/** 함께 만든 팀원 수 — 실제 숫자에 맞게 고치면 된다 */
const TOTAL_TEAMMATES = 30;
/** 프로젝트를 만들어 온 기간(개월) */
const TOTAL_MONTHS = 18;

/** 화면에 들어오면 0 → to 까지 빨갛게 올라간다 */
function CountUp({ to, suffix = "", duration = 2800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paint = (v: number) => {
      el.textContent = String(v) + suffix;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const run = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      paint(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(run);
    };
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          io.disconnect();
          raf = requestAnimationFrame(run);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, suffix, duration]);
  return (
    <span ref={ref} className="proj-count-num">
      0{suffix}
    </span>
  );
}

/* ───────────────────────── 이미지 슬롯 ───────────────────────── */

function ImageSlot({ src, placeholder, radius = 0 }: { src?: string; placeholder: string; radius?: number }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // SSR 로 그려진 <img> 는 하이드레이션 전에 error 이벤트가 끝나 있을 수 있으므로 마운트 시 한 번 더 확인
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);
  if (src && !failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img ref={imgRef} src={src} alt={placeholder} onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: radius }} />;
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1f1f1f",
        border: "1px dashed rgba(255,255,255,0.18)",
        borderRadius: radius,
        color: "rgba(255,255,255,0.35)",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
        textAlign: "center",
        padding: 12,
      }}
    >
      {placeholder}
    </div>
  );
}


/* 최종 위치는 화면 안(±50vw / ±50vh)에 머물면서 가운데(수상 목록) 를 비운다.
   번호가 붙은 카드는 01 02 / 03 04 로 읽히도록 네 모서리에 놓는다. */
/* 펼친 자리 — 가운데 글자를 둘러싸는 타원.
 *
 * 여덟 장을 45도 간격으로 돌려 놓는다. 가로 반지름 34(도면 폭의 %), 세로 반지름 35(짧은 쪽 화면의 %).
 * 대각 네 장은 타원 위(25.5, 25)에 둔다 — 이보다 안으로 넣으면 가운데 글자에 닿는다.
 * 세로는 헤더에 닿기 직전까지 키웠고 가로는 그만큼 모았다. 이 크기여야 대각 카드가 글자 띠 바깥으로
 * 나가고, 이웃 카드끼리도 한 축은 반드시 떨어진다. 더 줄이면 겹치기 시작한다.
 * 네 모서리는 분야 카드, 위아래와 좌우는 사진이 온다.
 */
const CFG = [
  { sx: -8, sy: -10, sr: -18, x: 0, y: -35 },
  { sx: 14, sy: -10, sr: 20, x: -25.5, y: -25 },
  { sx: -16, sy: 0, sr: -4, x: -34, y: 0 },
  { sx: 1, sy: -10, sr: -2, x: 25.5, y: -25 },
  { sx: 18, sy: 1, sr: 6, x: 34, y: 0 },
  { sx: -6, sy: 10, sr: 6, x: -25.5, y: 25 },
  { sx: 8, sy: 7, sr: 3, x: 0, y: 35 },
  { sx: 20, sy: 12, sr: -7, x: 25.5, y: 25 },
];
/** 펼친 덩어리를 통째로 내리는 양(--sh 단위). 위쪽 빨간 띠와 떼어 놓는다 */
const SPREAD_DY = 4;
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const MARQUEE_ITEMS = ["AI", "BACKEND", "CLOUD", "DEVELOPER", "EMBEDDED"];
/** 히어로 왼쪽 ABCDE 스택 — 인트로의 다섯 글자가 이 자리로 날아와 그대로 남는다 */
/* 인트로에서는 가로로 A·B·C·D·E 로 모였다가, 풀리면 Developer 가 맨 아래로 간다.
   문장으로 읽으면 "AI · Backend · Cloud · Embedded 개발자" 이므로 D 가 마지막이다.
   그래서 세로 순서만 A·B·C·E·D 로 어긋나고, 인트로에서 D 와 E 가 서로를 지나친다. */
const ABCDE = [
  { ini: "A", rest: "I" },
  { ini: "B", rest: "ackend" },
  { ini: "C", rest: "loud" },
  { ini: "E", rest: "mbedded" },
  { ini: "D", rest: "eveloper" },
];

/* ───────────────────────── 컴포넌트 ───────────────────────── */

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLImageElement>(null);
  const spreadRef = useRef<HTMLElement>(null);
  const spreadTextRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shrinkRef = useRef<HTMLDivElement>(null);
  const [shrinkNatural, setShrinkNatural] = useState(0);

  // 작아지는 블록(얼굴+이름+소개)의 원래 높이를 재서, 작아진 만큼 아래 여백을 당겨 올린다
  useEffect(() => {
    const el = shrinkRef.current;
    if (!el) return;
    const measure = () => setShrinkNatural(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanup: (() => void)[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* 섹션 제목 fade-up (Trevor Noah 스타일).
       제 입장을 스스로 챙기는 구간은 건드리지 않는다 — 여기서 얹은 translateY 가 남아
       그 구간의 타임라인과 겹치면, 나란히 놓인 번호와 제목이 서로 다른 만큼 밀려
       줄이 어긋난다. */
    const rv = [...root.querySelectorAll<HTMLElement>("section h2, section h3, blockquote")].filter((el) => !el.closest("[data-spread], .pstage, .st-sec, .hw-intro"));
    rv.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(36px)";
      el.style.transition = "opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1)";
    });
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "none";
            io.unobserve(el);
          }
        }),
      { threshold: 0.15 },
    );
    rv.forEach((el) => io.observe(el));
    cleanup.push(() => io.disconnect());

    // 얼굴 입장은 인트로(gsap)가 바깥 래퍼에서 처리하므로 스크럽은 바로 시작한다
    const face = faceRef.current;
    const faceEntranceDone = true;

    /* 헤더 표시용: 구간과 링크를 짝지어 둔다 */
    /* 어느 구간에도 안 걸리면 맨 위(소개)로 본다 — 처음 들어왔을 때 이름이 켜져야 한다 */
    const NAV_MAP: [string, string][] = [
      ["[data-spread]", "#awards"],
      ["#work", "#work"],
      [".pstage", "#work"],
      [".flow-art", "#how"],
      ["#how", "#how"],
    ];
    let lastActive = "";

    const onScroll = () => {
      const word = wordRef.current;
      const heroEl = headerRef.current;
      const spreadSec = spreadRef.current;
      const txt = spreadTextRef.current;
      const heroTop = heroEl ? heroEl.getBoundingClientRect().top + window.scrollY : 0;
      const rel = Math.max(0, window.scrollY - heroTop); // 히어로 상단 기준 스크롤량

      if (word) word.style.transform = "translate(-50%,-50%) translateY(" + rel * 0.18 + "px)";

      /* 지금 보고 있는 구간을 헤더 링크에 표시한다 */
      {
        const mid = window.innerHeight * 0.45;
        let active = "#top";
        for (const [sel, href] of NAV_MAP) {
          const el = document.querySelector(sel);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= mid && r.bottom >= mid) active = href;
        }
        if (active !== lastActive) {
          lastActive = active;
          document.querySelectorAll<HTMLElement>(".nav-link, .nav-logo").forEach((el) => {
            el.classList.toggle("is-active", el.dataset.nav === active);
          });
        }
      }

    };

    // 매 프레임 scrollY 폴링 (원본과 동일한 rAF 루프)
    /* 펼침: 화면에 들어오면 스크롤과 무관하게 한 번 자연스럽게 펼쳐진다 */
    const applySpread = (p: number) => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const c = CFG[i % CFG.length];
        const tx = c.sx + (c.x - c.sx) * p;
        const ty = c.sy + (c.y - c.sy) * p + SPREAD_DY * p;
        el.style.transform =
          "translate(calc(-50% + var(--vw) * " + tx + "), calc(-50% + var(--sh) * " + ty + ")) rotate(" + c.sr * (1 - p) + "deg) scale(" + (0.82 + 0.18 * p) + ")";
      });
      const txt = spreadTextRef.current;
      if (txt) {
        txt.style.opacity = String(clamp((p - 0.25) / 0.45));
        txt.style.transform =
          "translateY(calc(var(--sh) * " + SPREAD_DY * p + ")) scale(" + (0.9 + 0.1 * clamp((p - 0.2) / 0.7)) + ")";
      }
    };
    applySpread(0);

    if (spreadRef.current) {
      const target = spreadRef.current;
      const reducedSpread = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const narrow = designViewport().w <= 900;
      if (reducedSpread || narrow) {
        // 모바일과 동작 최소화에서는 평범하게 쌓아 보여주므로 인라인 변형을 지운다
        cardRefs.current.forEach((el) => el && (el.style.transform = ""));
        const txt = spreadTextRef.current;
        if (txt) {
          txt.style.opacity = "1";
          txt.style.transform = "none";
        }
      } else {
        /* 내려가며 지나친 뒤 다시 올라오면 이미 펼쳐진 채로 둔다.
           위로 올라가 구간이 화면 아래로 빠졌을 때만 조용히 도로 모은다. */
        let opened = false;
        let spreadRaf = 0;
        const open = () => {
          if (opened) return;
          opened = true;
          const start = performance.now();
          const DUR = 2600;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / DUR);
            // 부드럽게 붙었다 펼쳐지도록 뒤로 갈수록 느려지는 곡선
            applySpread(1 - Math.pow(1 - t, 3));
            if (t < 1) spreadRaf = requestAnimationFrame(tick);
          };
          spreadRaf = requestAnimationFrame(tick);
        };
        const reset = () => {
          if (!opened) return;
          opened = false;
          cancelAnimationFrame(spreadRaf);
          applySpread(0);
        };
        const io3 = new IntersectionObserver(
          (es) => {
            const e = es[es.length - 1];
            if (e.intersectionRatio >= 0.7) open();
            // 구간이 화면 '아래'에 있다 = 내가 그 위에 있다 → 다음에 내려올 때 다시 펼친다
            else if (e.intersectionRatio <= 0.02 && e.boundingClientRect.top >= window.innerHeight) reset();
          },
          { threshold: [0, 0.02, 0.7] },
        );
        io3.observe(target);
        cleanup.push(() => {
          io3.disconnect();
          cancelAnimationFrame(spreadRaf);
        });
      }
    }

    /* 스크롤 위치나 창 폭이 바뀔 때만, 한 프레임에 한 번 부른다.
       예전엔 매 프레임 scrollY 를 들여다봤는데, 가만히 있어도 루프가 돌아 저사양에서 다른 애니메이션을 깎아 먹었다 */
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        onScroll();
      });
    };
    /* 끝없이 도는 애니메이션(복도 카드 · 흐르는 띠 · 떠 있는 얼굴)은 화면 밖에 있는 동안만 멈춘다.
       보이는 동안은 그대로 돈다 — 멈춘 자리에서 이어 돌 뿐 모양은 같다 */
    const offscreen = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("is-off", !e.isIntersecting)));
    root.querySelectorAll("[data-offscreen-pause]").forEach((el) => offscreen.observe(el));
    cleanup.push(() => offscreen.disconnect());

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    cleanup.push(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    });

    // 섹션 입장: 카드/칩이 뷰포트에 들어올 때 한 번 슬라이드 업 (stagger)
    if (!reduced) {
      const items: HTMLElement[] = [
        ...root.querySelectorAll<HTMLElement>("#work a[target]"),
        ...root.querySelectorAll<HTMLElement>("#skills > div > div"),
      ];
      items.forEach((el, i) => {
        const d = (i % 4) * 0.09;
        el.style.opacity = "0";
        el.style.transform = "translateY(32px)";
        el.style.transition = "opacity .7s ease " + d + "s, transform .7s cubic-bezier(.2,.7,.2,1) " + d + "s";
      });
      const io2 = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              el.style.opacity = "1";
              el.style.transform = "none";
              io2.unobserve(el);
              setTimeout(() => {
                // 입장이 끝나면 인라인 값을 비워 CSS hover(translateY) 가 다시 동작하게 함
                el.style.transition = "";
                el.style.transform = "";
                el.style.opacity = "";
              }, 1100);
            }
          }),
        { threshold: 0.12 },
      );
      items.forEach((el) => io2.observe(el));
      cleanup.push(() => io2.disconnect());
    }

    return () => cleanup.forEach((fn) => fn());
  }, []);

  return (
    <div ref={rootRef} className="dc" style={{ minHeight: "calc(var(--vh) * 100)", background: "#161616", color: "#ffffff" }}>
      <IntroBace />
      <ScrollProgress progressProps={{ className: "scroll-bar" }} />
      {/* ── NAV ── */}
      <nav data-hero-item className="navbar">
        <div className="navpill">
          <a href="#top" className="nav-logo" data-nav="#top">
            ABCDE<span style={{ color: RED }}>.</span>
          </a>
          {[
            ["#awards", "Awards"],
            ["#work", "Projects"],
            ["#how", "How"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="nav-link" data-nav={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO (스크롤하면 이 화면 전체가 작아지며 아래로 내려온다) ── */}
      <header id="top" ref={headerRef} style={{ position: "relative", overflow: "hidden", padding: "80px 24px 0" }}>
        <div style={{ position: "relative", display: "flow-root", maxWidth: 1280, margin: "0 auto", minHeight: "max(440px, calc(var(--ch) * 100 - 330px))" }}>
          <div
            ref={wordRef}
            className="giant-word"
            style={{
              position: "absolute",
              left: "50%",
              top: 330,
              transform: "translate(-50%,-50%)",
              fontFamily: BHS,
              fontSize: "min(calc(var(--vw) * 15),220px)",
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: "#1f1f1f",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            멀티플레이어
          </div>
          {/* 스크롤하면 이 블록(얼굴 + 이름 + 소개)만 작아지며 아래로 내려온다 */}
          <div ref={shrinkRef} style={{ position: "relative" }}>
          {/* 왼쪽: 인트로에서 풀어진 ABCDE 가 날아와 그대로 남는 키워드 스택 / 오른쪽: 얼굴 */}
          <div className="hero-grid">
            <div className="hero-left">
              <div className="bace-stack">
                <span className="bace-rule" aria-hidden />
                {ABCDE.map((k) => (
                  <span key={k.ini} className={`bace-row br-${k.ini.toLowerCase()}`}>
                    <span className="bace-ini" data-flip-id={`kw-${k.ini}`}>
                      {k.ini}
                    </span>
                    <span className="bace-rest">{k.rest}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-face">
              <div className="face-wrap" data-offscreen-pause style={{ animation: "heroFloat 5s ease-in-out infinite" }}>
                {/* gsap 입장 애니메이션은 안쪽 래퍼에만 걸어 레이아웃을 건드리지 않는다 */}
                <div data-hero-item data-hero-portrait style={{ height: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={faceRef}
                    data-hero-face
                    src="/uploads/face-2026.png"
                    alt="이민형"
                    style={{
                      height: "100%",
                      width: "auto",
                      maxWidth: "none",
                      objectFit: "contain",
                      filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))",
                      willChange: "transform",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="hero-copy" data-hero-item>
              <h1 className="hero-name" style={{ margin: 0, fontFamily: BHS, lineHeight: 1.05, letterSpacing: "0.01em" }}>
                이민형
              </h1>
              <p className="hero-sub" style={{ margin: "18px 0 0" }}>
                A부터 E까지 모두 가능한
                <br />이 시대의 멀티플레이어 개발자
              </p>
            </div>
          </div>

          {/* 연락처 버튼 (원래 맨 아래에 있던 것) */}
          <div className="hero-center" data-hero-item>
            <Contacts />
          </div>
          </div>
        </div>
      </header>

      {/* ── MARQUEE ── */}
      <div className="band" style={{ overflow: "hidden", background: RED, padding: "14px 0", display: "flex" }}>
        <div data-offscreen-pause style={{ display: "flex", flex: "none", width: "max-content", alignItems: "center", animation: "marquee 46s linear infinite", fontFamily: BHS, fontSize: 16, letterSpacing: 2, color: "#ffffff" }}>
          {[0, 1].map((g) => (
            <div key={g} style={{ display: "flex", flex: "none", alignItems: "center" }}>
              {Array.from({ length: 4 }).map((_, r) =>
                MARQUEE_ITEMS.map((item) => (
                  <span key={`${r}-${item}`} style={{ display: "contents" }}>
                    <span style={{ padding: "0 24px" }}>{item}</span>
                    <span>·</span>
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── STACK SPREAD ── */}
      <section
        ref={spreadRef}
        data-spread
        /* 배경과 테두리를 두면 카드가 펼쳐지는 자리가 상자로 잘려 보인다 — 경계 없이 흐르게 둔다 */
        style={{ position: "relative", height: "calc(var(--vh) * 100)" }}
      >
        {/* 헤더의 Awards 는 카드가 다 펼쳐진 지점으로 보낸다 */}
        <span id="awards" style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />
        <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
          <div ref={spreadTextRef} className="spread-text">
            <h2 className="spread-h2" style={{ margin: 0, fontFamily: BHS, lineHeight: 1.15 }}>
              하나의 스택에
              <br />
              갇히지 않습니다
            </h2>
            <div className="spread-awards">
              {awards.map((a, i) => (
                <LiquidMetalPill key={i} className="sp-award">
                  <span className="sp-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.logo} alt="" />
                  </span>
                  <span className="sp-t">
                    {a.prize}
                    <span className="sp-p">{a.title}</span>
                  </span>
                  <span className="sp-d">{a.date}</span>
                </LiquidMetalPill>
              ))}
            </div>
          </div>
          <div className="spread-cards">
          {spreadCards.map((c, i) => (
            <div
              key={i}
              className="spread-card"
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: `calc(var(--vw) * ${c.w})`,
                height: `calc(var(--ch) * ${c.h})`,
                zIndex: c.z,
                willChange: "transform",
                borderRadius: 8,
                overflow: "hidden",
                transform: "translate(-50%,-50%)",
              }}
            >
              {c.kind === "image" ? (
                <div style={{ position: "absolute", inset: 0 }}>
                  <ImageSlot src={c.src} placeholder={c.ph} radius={8} />
                </div>
              ) : (
                <div className="spread-label" style={{ position: "absolute", inset: 0, background: "#1f1f1f", border: "1px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column", gap: 6, padding: 16 }}>
                  {/* 번호와 이름은 한 벌이다 — 장면 머리(.pscene-head)처럼 크기도 줄 높이도 같게 둔다 */}
                  <span style={{ fontFamily: BHS, fontSize: 18, color: RED, lineHeight: 1 }}>{c.num}</span>
                  <span style={{ fontFamily: BHS, fontSize: 18, color: "#ffffff", lineHeight: 1, marginBottom: 2 }}>{c.label}</span>
                  <span className="sp-stack">
                    {c.items.map((it) => (
                      <TechBadge key={it} name={it} />
                    ))}
                  </span>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" style={{ maxWidth: 1280, margin: "0 auto", padding: "84px 24px 96px" }}>
        <div
          data-corridor
          className="corridor"
          style={{ position: "relative", height: "calc(var(--vh) * 58)", minHeight: 380, overflow: "hidden", marginBottom: 0, containerType: "inline-size" }}
        >
          <Corridor />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, pointerEvents: "none" }}>
            <span style={{ fontFamily: BHS, fontSize: "min(calc(var(--vw) * 8),96px)", letterSpacing: "0.02em", color: "#ffffff", textShadow: "0 4px 40px rgba(0,0,0,0.7)", lineHeight: 1 }}>PROJECTS</span>
          </div>
          <div className="proj-count">
            <span className="proj-stat">
              <CountUp to={TOTAL_PROJECTS} suffix="+" />
              <span className="proj-stat-label">Projects</span>
            </span>
            <span className="proj-stat-div" aria-hidden />
            <span className="proj-stat">
              <CountUp to={TOTAL_TEAMMATES} suffix="+" />
              <span className="proj-stat-label">People</span>
            </span>
            <span className="proj-stat-div" aria-hidden />
            <span className="proj-stat">
              <CountUp to={TOTAL_MONTHS} suffix="+" />
              <span className="proj-stat-label">Months</span>
            </span>
          </div>
        </div>
      </section>

      <ProjectScenes />

      {/* ── 일하는 방식 — 태블릿 장면 위로 사진 벽이 기울어진 채 올라와 덮는다 ── */}
      <FlowArt aria-label="일하는 방식" snap snapIn>
        <FlowSection aria-label="일하는 방식 소개">
          <HowIntro />
        </FlowSection>
        <FlowSection aria-label="기록과 학습">
          <Strengths />
        </FlowSection>
      </FlowArt>

      {/* ── CONTACT / FOOTER ── */}
      <SiteFooter />
    </div>
  );
}

