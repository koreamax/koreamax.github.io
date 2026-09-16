"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import ScrollShrinkHero from "@/components/ui/scroll-shrink-hero";
import { ProgressiveFluxLoader } from "@/components/ui/progressive-flux-loader";
import TechBadge from "@/components/tech-badge";
import {
  awards,
  corridorTitles,
  events,
  moreProjects,
  projects,
  quals,
  skills,
  spreadCards,
} from "@/components/portfolio-data";

/* ───────────────────────── 공통 스타일 ───────────────────────── */

const RED = "#da291c";
const GREEN = "#22c55e";
/** 프로젝트/활동 상태 색: 진행 중 = 초록, 종료/완료 = 빨강 */
const statusColor = (status: string) => (status.includes("진행") ? GREEN : RED);
const BHS = "'Black Han Sans', sans-serif";
const MONO = "'Nanum Gothic Coding', monospace";

const eyebrow: CSSProperties = {
  margin: "0 0 8px",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: RED,
};

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

const logoBox: CSSProperties = {
  flex: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 64,
  height: 64,
  borderRadius: 8,
  background: "#ffffff",
};

/* ───────────────────────── 3D 프로젝트 복도 ───────────────────────── */

const P = { persp: 30, cardH: 25, birth: 2.6, exit: 46, rb: -11, re: 44, fan: 3.3, tb: 6, te: 28, stops: 24 };

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
const CORRIDOR_SPEED = 18;
const CORRIDOR_N = 9;

function Corridor() {
  return (
    <div data-corridor-stage style={{ position: "absolute", inset: 0, pointerEvents: "none", perspective: "30cqw", perspectiveOrigin: "50% 55%" }}>
      <style dangerouslySetInnerHTML={{ __html: CORRIDOR_CSS }} />
      <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
        {(["ishr", "ishl"] as const).map((name) =>
          Array.from({ length: CORRIDOR_N }, (_, i) => (
            <div
              key={name + i}
              style={{
                position: "absolute",
                left: "50%",
                top: "55%",
                width: "18cqw",
                height: "25cqw",
                marginLeft: "-9cqw",
                marginTop: "-12.5cqw",
                borderRadius: 6,
                overflow: "hidden",
                backfaceVisibility: "hidden",
                background: "#1f1f1f",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.4cqw",
                animation: `${name} ${CORRIDOR_SPEED}s linear infinite`,
                animationDelay: `${-(i * CORRIDOR_SPEED) / CORRIDOR_N}s`,
              }}
            >
              <span style={{ fontSize: "0.9cqw", fontWeight: 700, letterSpacing: "0.2cqw", color: RED }}>PROJECT</span>
              <span style={{ fontFamily: BHS, fontSize: "2cqw", color: "#fff", lineHeight: 1.2 }}>
                {corridorTitles[i % corridorTitles.length]}
              </span>
            </div>
          )),
        )}
      </div>
    </div>
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

/* ───────────────────────── 타임라인 진행 상태 ───────────────────────── */

const FLUX_ONGOING = { "--flux-from": "#16a34a", "--flux-to": "#4ade80" } as CSSProperties;
const FLUX_DONE = { "--flux-from": "#da291c", "--flux-to": "#ff8a7a" } as CSSProperties;

/** 하고 있는 활동은 초록 바가 계속 흐르고, 끝난 활동은 빨간 바가 꽉 찬 채로 멈춰 있다 */
function StatusMeter({ kind, ongoing }: { kind: string; ongoing: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{kind}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", justifyContent: "flex-end" }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            color: ongoing ? GREEN : RED,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 9999,
              background: ongoing ? GREEN : RED,
              boxShadow: ongoing ? `0 0 8px ${GREEN}` : "none",
              animation: ongoing ? "statusPulse 1.4s ease-in-out infinite" : "none",
            }}
          />
          {ongoing ? "진행 중" : "완료"}
        </span>
        <div style={{ width: 96, ...(ongoing ? FLUX_ONGOING : FLUX_DONE) }}>
          {ongoing ? (
            <ProgressiveFluxLoader showLabel={false} duration={4} loop className="max-w-none gap-0" barClassName="h-1.5 bg-white/10 shadow-none" />
          ) : (
            <ProgressiveFluxLoader showLabel={false} value={100} className="max-w-none gap-0" barClassName="h-1.5 bg-white/10 shadow-none" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 스크롤 연출 설정 ───────────────────────── */

const CFG = [
  { sx: -8, sy: -10, sr: -18, x: -20, y: -34 },
  { sx: 14, sy: -10, sr: 20, x: 32, y: -30 },
  { sx: -16, sy: 0, sr: -4, x: -36, y: -2 },
  { sx: 1, sy: -10, sr: -2, x: 6, y: -32 },
  { sx: 18, sy: 1, sr: 6, x: 37, y: 6 },
  { sx: -6, sy: 10, sr: 6, x: -24, y: 34 },
  { sx: 8, sy: 7, sr: 3, x: 2, y: 36 },
  { sx: 20, sy: 12, sr: -7, x: 30, y: 34 },
];
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const MARQUEE_ITEMS = ["WEB/APP", "AI", "CLOUD", "EMBEDDED"];

/* ───────────────────────── 컴포넌트 ───────────────────────── */

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLImageElement>(null);
  const peekRef = useRef<HTMLImageElement>(null);
  const spreadRef = useRef<HTMLElement>(null);
  const spreadTextRef = useRef<HTMLDivElement>(null);
  const spreadHintRef = useRef<HTMLDivElement>(null);
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

    // 섹션 제목 fade-up (Trevor Noah 스타일)
    const rv = [...root.querySelectorAll<HTMLElement>("section h2, section h3, blockquote")].filter((el) => !el.closest("[data-spread]"));
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

    // 히어로 얼굴: CSS dropIn 입장 애니메이션이 끝나면 transform 제어권을 JS로 넘김
    const face = faceRef.current;
    let faceEntranceDone = false;
    if (face) {
      const done = () => {
        face.style.animation = "none";
        faceEntranceDone = true;
      };
      face.addEventListener("animationend", done, { once: true });
      const t = setTimeout(() => {
        if (!faceEntranceDone) done();
      }, 1400);
      cleanup.push(() => clearTimeout(t));
    }

    let peeked = false;
    const onScroll = () => {
      const word = wordRef.current;
      const heroEl = headerRef.current;
      const peek = peekRef.current;
      const spreadSec = spreadRef.current;
      const txt = spreadTextRef.current;
      const hint = spreadHintRef.current;
      const heroTop = heroEl ? heroEl.getBoundingClientRect().top + window.scrollY : 0;
      const rel = Math.max(0, window.scrollY - heroTop); // 히어로 상단 기준 스크롤량

      if (word) word.style.transform = "translate(-50%,-50%) translateY(" + rel * 0.18 + "px)";

      // Deadpool 스타일 bounded scrub: 히어로 경계를 지나는 동안만 반응 — 아래/오른쪽으로 가라앉음
      if (face && heroEl && faceEntranceDone) {
        const hh = heroEl.offsetHeight;
        const pp = clamp((rel - hh * 0.2) / (hh * 0.55));
        face.style.transform =
          pp > 0
            ? "translateY(" + (pp * 110).toFixed(1) + "px) translateX(" + (pp * 42).toFixed(1) + "px) scale(" + (1 - pp * 0.11).toFixed(3) + ") rotate(" + (pp * 3).toFixed(2) + "deg)"
            : "none";
      }

      if (peek && !peeked && peek.parentElement) {
        const r = peek.parentElement.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.6 && r.bottom > 0) {
          peeked = true;
          peek.style.transition = "transform .9s cubic-bezier(.34,1.56,.64,1)";
          peek.style.transform = "translateY(38%) rotate(-4deg)";
        }
      }

      if (spreadSec) {
        const r = spreadSec.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const raw = total > 0 ? clamp(-r.top / total) : 1;
        const p = clamp((raw - 0.1) / 0.75);
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const c = CFG[i % CFG.length];
          const tx = c.sx + (c.x - c.sx) * p;
          const ty = c.sy + (c.y - c.sy) * p;
          el.style.transform = "translate(calc(-50% + " + tx + "vw), calc(-50% + " + ty + "vh)) rotate(" + c.sr * (1 - p) + "deg) scale(" + (0.82 + 0.18 * p) + ")";
        });
        if (txt) {
          txt.style.opacity = String(clamp((p - 0.35) / 0.4));
          txt.style.transform = "scale(" + (0.88 + 0.12 * clamp((p - 0.3) / 0.6)) + ")";
        }
        if (hint) hint.style.opacity = String(1 - clamp(p / 0.15));
      }
    };

    // 매 프레임 scrollY 폴링 (원본과 동일한 rAF 루프)
    let lastY = -1;
    let lastW = -1;
    let raf = 0;
    const loop = () => {
      if (window.scrollY !== lastY || window.innerWidth !== lastW) {
        lastY = window.scrollY;
        lastW = window.innerWidth;
        onScroll();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    cleanup.push(() => cancelAnimationFrame(raf));

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
    <div ref={rootRef} className="dc" style={{ minHeight: "100vh", background: "#161616", color: "#ffffff" }}>
      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 16, zIndex: 50, display: "flex", justifyContent: "center", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(24,24,24,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 9999,
            padding: "8px 8px 8px 24px",
          }}
        >
          <a href="#top" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 17, letterSpacing: 0.5, marginRight: 16 }}>
            이민형<span style={{ color: RED }}>.</span>
          </a>
          {[
            ["#work", "Projects"],
            ["#timeline", "Timeline"],
            ["#awards", "Awards"],
            ["#skills", "Skills"],
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", padding: "10px 14px" }}>
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-red-nav"
            style={{ display: "inline-flex", alignItems: "center", height: 40, padding: "0 22px", borderRadius: 9999, background: RED, color: "#ffffff", fontSize: 12, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase" }}
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* ── HERO (스크롤하면 이 화면 전체가 작아지며 아래로 내려온다) ── */}
      <ScrollShrinkHero>
      {(p) => {
        const scale = 1 - p * 0.58;
        const sinkPx = p * 120;
        return (
      <header id="top" ref={headerRef} style={{ position: "relative", overflow: "hidden", padding: "48px 24px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.4)" }}>
          <span>01 &nbsp;WEB/APP</span>
          <span>02 &nbsp;AI</span>
          <span>03 &nbsp;CLOUD</span>
          <span>04 &nbsp;EMBEDDED</span>
        </div>
        <div style={{ position: "relative", display: "flow-root", maxWidth: 1280, margin: "0 auto", minHeight: `max(600px, calc((100vh - 140px) * ${(1 - p * 0.5).toFixed(3)}))` }}>
          <div
            ref={wordRef}
            className="giant-word"
            style={{
              position: "absolute",
              left: "50%",
              top: 340,
              transform: "translate(-50%,-50%)",
              fontFamily: BHS,
              fontSize: "min(17vw,250px)",
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: "#242424",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            멀티플레이어
          </div>
          {/* 스크롤하면 이 블록(얼굴 + 이름 + 소개)만 작아지며 아래로 내려온다 */}
          <div
            ref={shrinkRef}
            style={{
              position: "relative",
              transformOrigin: "50% 0%",
              transform: `translateY(${sinkPx}px) scale(${scale})`,
              marginBottom: shrinkNatural ? -(shrinkNatural * (1 - scale)) + sinkPx : 0,
              willChange: "transform",
            }}
          >
          <div style={{ position: "absolute", left: "50%", top: 30, transform: "translateX(-50%)", height: 560, animation: "heroFloat 5s ease-in-out infinite" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={faceRef}
              data-hero-face
              src="/uploads/pasted-1789519232538-0.png"
              alt="이민형"
              style={{
                height: "100%",
                width: "auto",
                maxWidth: "none",
                objectFit: "contain",
                filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))",
                willChange: "transform",
                animation: "dropIn 1s cubic-bezier(0.16,1,0.3,1) both",
              }}
            />
          </div>
          <div style={{ position: "relative", textAlign: "center", paddingTop: 630, pointerEvents: "none" }}>
            <h1 style={{ margin: 0, fontFamily: BHS, fontSize: 88, lineHeight: 1.05, letterSpacing: "0.01em" }}>이민형</h1>
            <p style={{ margin: "20px auto 0", maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>
              Web/App부터 AI, Cloud, Embedded까지 모두를 아우를 수 있는
              <br />이 시대의 멀티플레이어 개발자
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, pointerEvents: "auto" }}>
              <a href="#work" className="btn-red" style={{ ...pillBtn, background: RED }}>
                프로젝트 보기
              </a>
              <a href="#contact" className="btn-ghost" style={{ ...pillBtn, border: "1px solid rgba(255,255,255,0.35)" }}>
                이력서 받기
              </a>
            </div>
          </div>
          </div>
          <div
            className="hero-card"
            style={{
              position: "absolute",
              right: 0,
              top: 440,
              background: "linear-gradient(rgba(15,15,18,0.55),rgba(15,15,18,0.78)),url('/uploads/pasted-1789544448004-0.png') center 35%/cover no-repeat",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "20px 24px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
            }}
          >
            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Education</p>
            <p style={{ margin: "6px 0 0", fontFamily: BHS, fontSize: 26, color: "#ffffff" }}>동국대학교</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>정보통신공학전공 · 학점 3.8</p>
          </div>
        </div>
      </header>
        );
      }}
      </ScrollShrinkHero>

      {/* ── MARQUEE ── */}
      <div style={{ overflow: "hidden", background: RED, padding: "14px 0", display: "flex" }}>
        <div style={{ display: "flex", flex: "none", width: "max-content", alignItems: "center", animation: "marquee 24s linear infinite", fontFamily: BHS, fontSize: 16, letterSpacing: 2, color: "#ffffff" }}>
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
        style={{ position: "relative", height: "260vh", background: "#111111", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <div
            ref={spreadTextRef}
            style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: 0, pointerEvents: "none", padding: "0 24px" }}
          >
            <h2 style={{ margin: 0, fontFamily: BHS, fontSize: 64, lineHeight: 1.15 }}>
              하나의 스택에
              <br />
              갇히지 않습니다
            </h2>
            <p style={{ margin: "16px 0 0", fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 480 }}>
              Web/App · AI · Cloud · Embedded
              <br />
              전부 다 수상으로 증명
            </p>
          </div>
          {spreadCards.map((c, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: `${c.w}vw`,
                height: `${c.h}vh`,
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
                <div style={{ position: "absolute", inset: 0, background: "#1f1f1f", border: "1px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 18 }}>
                  <span style={{ fontFamily: BHS, fontSize: 26, color: RED }}>{c.num}</span>
                  <span style={{ fontFamily: BHS, fontSize: 24, color: "#ffffff" }}>{c.label}</span>
                </div>
              )}
            </div>
          ))}
          <div
            ref={spreadHintRef}
            style={{ position: "absolute", left: 0, right: 0, bottom: 24, zIndex: 11, textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}
          >
            Scroll ↓
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" style={{ maxWidth: 1280, margin: "0 auto", padding: "112px 24px 64px" }}>
        <div
          data-corridor
          style={{ position: "relative", height: "56vh", minHeight: 360, overflow: "hidden", marginBottom: 72, containerType: "inline-size", borderRadius: 8, background: "#0d0d0d" }}
        >
          <Corridor />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <span style={{ fontFamily: BHS, fontSize: "min(9vw,110px)", letterSpacing: "0.02em", color: "#ffffff", textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}>PROJECTS</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={peekRef}
            src="/uploads/pasted-1789519232538-0.png"
            alt=""
            style={{ position: "absolute", right: "6%", bottom: 0, height: 190, width: "auto", maxWidth: "none", transform: "translateY(105%)", zIndex: 5, pointerEvents: "none", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <p style={eyebrow}>Projects</p>
            <h2 style={{ margin: 0, fontFamily: BHS, fontSize: 48, lineHeight: 1.1 }}>온 더 스크린</h2>
          </div>
          <a
            href="https://github.com/koreamax"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: 4 }}
          >
            GitHub에서 보기 →
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {projects.map((p) => (
            <a key={p.title} href={p.repo} target="_blank" rel="noopener noreferrer" className="card-lift" style={{ display: "block", color: "#ffffff" }}>
              <div style={{ height: 360, overflow: "hidden", borderRadius: 4, background: "#1f1f1f" }}>
                <ImageSlot src={p.image} placeholder={p.ph} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "18px 0 6px" }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: RED }}>{p.tag}</p>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: statusColor(p.status), border: `1px solid ${statusColor(p.status)}`, borderRadius: 9999, padding: "4px 10px" }}>
                  {p.status}
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>{p.desc}</p>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 56 }}>
          {moreProjects.map((m) => (
            <a
              key={m.title}
              href={m.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="row-hover"
              style={{ display: "grid", gridTemplateColumns: "minmax(140px,200px) minmax(0,1fr) auto auto", gap: 24, alignItems: "baseline", padding: "20px 12px", borderTop: "1px solid rgba(255,255,255,0.12)", color: "#ffffff" }}
            >
              <span style={{ fontSize: 17, fontWeight: 700 }}>{m.title}</span>
              <span style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.55)" }}>{m.desc}</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: RED }}>{m.tag}</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: statusColor(m.status) }}>{m.status}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
        <p style={eyebrow}>Latest</p>
        <h2 style={{ margin: "0 0 48px", fontFamily: BHS, fontSize: 48, lineHeight: 1.1 }}>지금 어디에?</h2>
        <div>
          {events.map((e) => (
            <div
              key={e.date + e.title}
              className="row-hover"
              style={{ display: "grid", gridTemplateColumns: "150px minmax(0,1fr) 200px", gap: 32, alignItems: "baseline", padding: "28px 12px", borderTop: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, color: RED }}>{e.date}</span>
              <div>
                <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700 }}>{e.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", maxWidth: 640 }}>{e.desc}</p>
              </div>
              <StatusMeter kind={e.kind} ongoing={e.ongoing} />
            </div>
          ))}
        </div>
      </section>

      {/* ── AWARDS / QUALIFICATIONS ── */}
      <section id="awards" style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "112px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: 64 }}>
          <div>
            <p style={eyebrow}>Awards</p>
            <h2 style={{ margin: "0 0 32px", fontFamily: BHS, fontSize: 40, lineHeight: 1.1 }}>수상</h2>
            {awards.map((a, i) => (
              <a
                key={i}
                href={a.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="row-hover"
                style={{ display: "flex", gap: 16, alignItems: "center", padding: "20px 12px", borderTop: "1px solid rgba(255,255,255,0.12)", color: "#ffffff" }}
              >
                <span style={{ ...logoBox, padding: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.logo} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </span>
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4 }}>{a.title}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: RED, whiteSpace: "nowrap" }}>{a.date}</span>
                  </span>
                  <span style={{ display: "block", marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{a.prize}</span>
                </span>
              </a>
            ))}
          </div>
          <div>
            <p style={eyebrow}>Qualifications</p>
            <h2 style={{ margin: "0 0 32px", fontFamily: BHS, fontSize: 40, lineHeight: 1.1 }}>자격증</h2>
            {quals.map((q) => (
              <div key={q.title} className="row-hover" style={{ display: "flex", gap: 16, alignItems: "center", padding: "20px 12px", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ ...logoBox, padding: 6 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.logo} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </span>
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4 }}>{q.title}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: RED, whiteSpace: "nowrap" }}>{q.date}</span>
                  </span>
                  <span style={{ display: "block", marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{q.org}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ maxWidth: 1280, margin: "0 auto", padding: "112px 24px" }}>
        <p style={eyebrow}>Skills</p>
        <h2 style={{ margin: "0 0 48px", fontFamily: BHS, fontSize: 48, lineHeight: 1.1 }}>다섯 개의 무기</h2>
        <div className="skills-grid" style={{ display: "grid", gap: 16 }}>
          {skills.map((g) => (
            <div key={g.num} className="skill-card" style={{ background: "#1f1f1f", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: 22 }}>
              <p style={{ margin: 0, fontFamily: BHS, fontSize: 40, color: RED }}>{g.num}</p>
              <h3 style={{ margin: "12px 0 16px", fontSize: 20, fontWeight: 700 }}>{g.area}</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {g.items.map((it) => (
                  <TechBadge key={it} name={it} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT / FOOTER ── */}
      <footer id="contact" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 24px 64px", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 32px", fontFamily: BHS, fontSize: 72, lineHeight: 1.1 }}>같이 만들어볼까요?</h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:koreamax012@gmail.com" className="btn-red btn-email" style={{ ...contactBtn, background: RED }}>
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
          <p style={{ margin: "24px 0 0", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>koreamax012@gmail.com</p>
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 15 }}>
            이민형<span style={{ color: RED }}>.</span>
          </span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>© 2026 Minhyung Lee. All Rights Reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              ["https://github.com/koreamax", "GitHub"],
              ["https://velog.io/@koreamax01/posts", "Velog"],
              ["https://www.linkedin.com/in/koreamax", "LinkedIn"],
            ].map(([href, label]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
