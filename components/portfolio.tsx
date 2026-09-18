"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import ScrollShrinkHero from "@/components/ui/scroll-shrink-hero";
import { ProgressiveFluxLoader } from "@/components/ui/progressive-flux-loader";
import TechBadge from "@/components/tech-badge";
import IntroBace from "@/components/intro-bace";
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

/* ───────────────────────── 토큰 ───────────────────────── */

const ORANGE = "#cf4500";
const ORANGE_2 = "#f37338";
const GREEN = "#1f9d55";
const RED = "#e0262e";
const CREAM = "#f3f0ee";

/** 분야 태그 색 (Backend / Web / App / AI / Cloud / Embedded) */
const TAG_COLORS: Record<string, string> = {
  AI: "#7c3aed",
  WEB: "#2563eb",
  APP: "#0891b2",
  BACKEND: "#2563eb",
  "WEB/APP": "#2563eb",
  CLOUD: "#d97706",
  EMBEDDED: "#059669",
};

/** "Cloud · AI · Web" 같은 태그 문자열을 색 칩으로 */
function TagChips({ tag, size = "sm" }: { tag: string; size?: "sm" | "xs" }) {
  const parts = tag.split("·").map((t) => t.trim()).filter(Boolean);
  const h = size === "sm" ? 24 : 22;
  return (
    <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
      {parts.map((t) => {
        const c = TAG_COLORS[t.toUpperCase()] ?? "#696969";
        return (
          <span
            key={t}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: h,
              padding: "0 10px",
              borderRadius: 999,
              background: `color-mix(in srgb, ${c} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${c} 45%, transparent)`,
              color: c,
              fontSize: size === "sm" ? 11.5 : 11,
              fontWeight: 700,
              letterSpacing: 0.8,
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

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function Arrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

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
    s += (u * 100).toFixed(2) + "%{transform:translate3d(" + (dir * rail).toFixed(2) + "cqw,0," + z.toFixed(2) + "cqw) rotateY(" + (-dir * t).toFixed(2) + "deg)}";
  }
  return "@keyframes " + name + "{" + s + "}";
}

const CORRIDOR_CSS = keyframes(1, "ishr") + keyframes(-1, "ishl");
const CORRIDOR_SPEED = 18;
const CORRIDOR_N = 9;

function Corridor() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", perspective: "30cqw", perspectiveOrigin: "50% 55%" }}>
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
                borderRadius: "2cqw",
                overflow: "hidden",
                backfaceVisibility: "hidden",
                background: "#262627",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.4cqw",
                animation: `${name} ${CORRIDOR_SPEED}s linear infinite`,
                animationDelay: `${-(i * CORRIDOR_SPEED) / CORRIDOR_N}s`,
              }}
            >
              <span style={{ fontSize: "0.85cqw", fontWeight: 700, letterSpacing: "0.2cqw", color: ORANGE_2 }}>PROJECT</span>
              <span style={{ fontSize: "1.9cqw", fontWeight: 700, letterSpacing: "-0.02em", color: CREAM, lineHeight: 1.15 }}>
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

function ImageSlot({ src, placeholder }: { src?: string; placeholder: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);
  if (src && !failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img ref={imgRef} src={src} alt={placeholder} onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />;
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e8e2da",
        color: "#696969",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
        textAlign: "center",
        padding: 16,
      }}
    >
      {placeholder}
    </div>
  );
}

/* ───────────────────────── 타임라인 진행 상태 ───────────────────────── */

const FLUX_ONGOING = { "--flux-from": "#16a34a", "--flux-to": "#4ade80" } as CSSProperties;
const FLUX_DONE = { "--flux-from": "#e0262e", "--flux-to": "#ff8a7a" } as CSSProperties;

/** 하고 있는 활동은 초록 바가 계속 흐르고, 끝난 활동은 빨간 바가 꽉 찬 채로 멈춰 있다 */
function StatusMeter({ kind, ongoing }: { kind: string; ongoing: boolean }) {
  const c = ongoing ? GREEN : RED;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
      <span className="status muted">{kind}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", justifyContent: "flex-end" }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1, color: c, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
          <span style={{ width: 6, height: 6, borderRadius: 9999, background: c, boxShadow: ongoing ? `0 0 8px ${c}` : "none", animation: ongoing ? "statusPulse 1.4s ease-in-out infinite" : "none" }} />
          {ongoing ? "진행 중" : "완료"}
        </span>
        <div style={{ width: 96, ...(ongoing ? FLUX_ONGOING : FLUX_DONE) }}>
          {ongoing ? (
            <ProgressiveFluxLoader showLabel={false} duration={4} loop className="max-w-none gap-0" barClassName="h-1.5 bg-black/10 shadow-none" />
          ) : (
            <ProgressiveFluxLoader showLabel={false} value={100} className="max-w-none gap-0" barClassName="h-1.5 bg-black/10 shadow-none" />
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

const MARQUEE_ITEMS = ["BACKEND", "AI", "CLOUD", "EMBEDDED"];
const KEYWORDS = [
  { id: "B", word: "Backend" },
  { id: "A", word: "AI" },
  { id: "C", word: "Cloud" },
  { id: "E", word: "Embedded" },
];

/* ───────────────────────── 컴포넌트 ───────────────────────── */

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const faceRef = useRef<HTMLImageElement>(null);
  const peekRef = useRef<HTMLImageElement>(null);
  const spreadRef = useRef<HTMLElement>(null);
  const spreadTextRef = useRef<HTMLDivElement>(null);
  const spreadHintRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanup: (() => void)[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 섹션 제목 fade-up
    const rv = [...root.querySelectorAll<HTMLElement>("section h2, section h3, footer h2")].filter((el) => !el.closest("[data-spread]"));
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

    let peeked = false;
    const onScroll = () => {
      const face = faceRef.current;
      const heroEl = headerRef.current;
      const peek = peekRef.current;
      const spreadSec = spreadRef.current;
      const txt = spreadTextRef.current;
      const hint = spreadHintRef.current;
      const heroTop = heroEl ? heroEl.getBoundingClientRect().top + window.scrollY : 0;
      const rel = Math.max(0, window.scrollY - heroTop);

      // 히어로를 지나가는 동안 얼굴이 살짝 가라앉는 bounded scrub
      if (face && heroEl) {
        const hh = heroEl.offsetHeight;
        const pp = clamp((rel - hh * 0.2) / (hh * 0.55));
        face.style.transform =
          pp > 0
            ? "translateY(" + (pp * 90).toFixed(1) + "px) translateX(" + (pp * 30).toFixed(1) + "px) scale(" + (1 - pp * 0.1).toFixed(3) + ") rotate(" + (pp * 2.5).toFixed(2) + "deg)"
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

    // 카드/칩 입장 stagger
    if (!reduced) {
      const items: HTMLElement[] = [...root.querySelectorAll<HTMLElement>("#work .proj, #work .row"), ...root.querySelectorAll<HTMLElement>("#skills .skill-card")];
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
    <div ref={rootRef} className="mc">
      <IntroBace />

      {/* ── NAV (floating pill) ── */}
      <nav className="navbar" data-hero-item>
        <div className="navpill">
          <a href="#top" className="logo">
            BACE
          </a>
          <div className="links">
            <a href="#work">Projects</a>
            <a href="#timeline">Timeline</a>
            <a href="#awards">Awards</a>
            <a href="#skills">Skills</a>
          </div>
          <a href="#contact" className="btn btn-ink">
            Get in touch
          </a>
        </div>
      </nav>

      {/* ── HERO (스크롤하면 전체가 작아지며 아래로 내려간다) ── */}
      <ScrollShrinkHero>
        {(p) => {
          const scale = 1 - p * 0.55;
          const sinkPx = p * 110;
          return (
            <header id="top" ref={headerRef} className="hero">
              <div className="wrap" style={{ display: "flow-root", minHeight: `max(560px, calc((100vh - 120px) * ${(1 - p * 0.5).toFixed(3)}))` }}>
                <div
                  className="hero-inner"
                  style={{
                    minHeight: "calc(100vh - 160px)",
                    transform: `translateY(${sinkPx}px) scale(${scale})`,
                    willChange: "transform",
                  }}
                >
                  <div>
                    {/* 인트로의 Backend / AI / Cloud / Embedded 가 이 칩 자리로 날아온다 */}
                    <div className="kw-strip">
                      {KEYWORDS.map((k) => (
                        <span key={k.id} className="kw" data-flip-id={`kw-${k.id}`}>
                          {k.word}
                        </span>
                      ))}
                    </div>
                    <div data-hero-item>
                      <Eyebrow>Multiplayer developer</Eyebrow>
                      <h1 className="h1">
                        백엔드부터 AI,
                        <br />
                        클라우드, 임베디드까지
                        <br />
                        전부 다 하는 이민형입니다.
                      </h1>
                    </div>
                    <p className="lead" data-hero-item style={{ marginTop: 22 }}>
                      Web/App부터 AI, Cloud, Embedded까지 모두를 아우를 수 있는 이 시대의 멀티플레이어 개발자.
                      문제가 부르는 곳이 제 자리입니다.
                    </p>
                    <div className="hero-ctas" data-hero-item>
                      <a href="#work" className="btn btn-ink">
                        프로젝트 보기
                      </a>
                      <a href="#contact" className="btn btn-outline">
                        이력서 받기
                      </a>
                    </div>
                  </div>

                  <div className="portrait" data-hero-item data-hero-portrait>
                    <div className="disc" />
                    <div className="ghost" aria-hidden>
                      BACE
                    </div>
                    <div className="face-float">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img ref={faceRef} src="/uploads/pasted-1789519232538-0.png" alt="이민형" />
                    </div>
                    <a href="#work" className="satellite" aria-label="프로젝트로 이동">
                      <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </header>
          );
        }}
      </ScrollShrinkHero>

      {/* ── MARQUEE BAND ── */}
      <div className="wrap">
        <div className="band">
          <div className="band-track">
            {[0, 1].map((g) => (
              <div key={g} style={{ display: "flex", flex: "none", alignItems: "center" }}>
                {Array.from({ length: 4 }).map((_, r) =>
                  MARQUEE_ITEMS.map((item) => (
                    <span key={`${r}-${item}`} style={{ display: "contents" }}>
                      <span style={{ padding: "0 28px" }}>{item}</span>
                      <span className="dot">●</span>
                    </span>
                  )),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STACK SPREAD ── */}
      <section ref={spreadRef} data-spread className="spread" style={{ padding: 0, marginTop: 64 }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <div
            ref={spreadTextRef}
            style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: 0, pointerEvents: "none", padding: "0 24px" }}
          >
            <h2 className="h2" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              하나의 스택에
              <br />
              갇히지 않습니다
            </h2>
            <p className="lead" style={{ margin: "16px 0 0", textAlign: "center" }}>
              Backend · AI · Cloud · Embedded
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
                transform: "translate(-50%,-50%)",
                boxShadow: "rgba(0,0,0,0.08) 0 24px 48px",
                borderRadius: 40,
              }}
            >
              {c.kind === "image" ? (
                <div className="spread-card-img">
                  <ImageSlot src={c.src} placeholder={c.ph} />
                </div>
              ) : (
                <div className="spread-card-label">
                  <span className="num">{c.num}</span>
                  <span className="lbl">{c.label}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={spreadHintRef} className="eyebrow" style={{ position: "absolute", left: 0, right: 0, bottom: 24, zIndex: 11, justifyContent: "center", color: "#696969" }}>
            Scroll
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work">
        <div className="wrap">
          <div className="corridor">
            <Corridor />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <span style={{ fontSize: "min(9vw,110px)", fontWeight: 800, letterSpacing: "-0.03em", color: CREAM, textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}>PROJECTS</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={peekRef}
              src="/uploads/pasted-1789519232538-0.png"
              alt=""
              style={{ position: "absolute", right: "6%", bottom: 0, height: 190, width: "auto", maxWidth: "none", transform: "translateY(105%)", zIndex: 5, pointerEvents: "none", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }}
            />
          </div>
          <div className="sec-head">
            <div>
              <Eyebrow>Projects</Eyebrow>
              <h2 className="h2">온 더 스크린</h2>
            </div>
            <a href="https://github.com/koreamax" target="_blank" rel="noopener noreferrer" className="textlink">
              GitHub에서 보기 →
            </a>
          </div>
          <div className="proj-grid">
            {projects.map((p) => (
              <a key={p.title} href={p.repo} target="_blank" rel="noopener noreferrer" className="proj">
                <div className="orb">
                  <div className="img">
                    <ImageSlot src={p.image} placeholder={p.ph} />
                  </div>
                  <span className="satellite">
                    <Arrow />
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <TagChips tag={p.tag} />
                  <span className="status" style={{ color: statusColor(p.status), border: `1px solid ${statusColor(p.status)}`, borderRadius: 999, padding: "4px 10px", fontSize: 10.5 }}>
                    {p.status}
                  </span>
                </div>
                <h3 className="h3">{p.title}</h3>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="proj-list">
            {moreProjects.map((m) => (
              <a key={m.title} href={m.repo} target="_blank" rel="noopener noreferrer" className="row row-proj">
                <span className="title">{m.title}</span>
                <span className="desc">{m.desc}</span>
                <TagChips tag={m.tag} size="xs" />
                <span className="status" style={{ color: statusColor(m.status) }}>{m.status}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Eyebrow>Latest</Eyebrow>
          <h2 className="h2" style={{ marginBottom: 40 }}>
            지금 어디에?
          </h2>
          <div>
            {events.map((e) => (
              <div key={e.date + e.title} className="row row-time">
                <span className="date">{e.date}</span>
                <div>
                  <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>{e.title}</h3>
                  <p className="desc" style={{ margin: 0, maxWidth: 640 }}>
                    {e.desc}
                  </p>
                </div>
                <StatusMeter kind={e.kind} ongoing={e.ongoing} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS / QUALIFICATIONS (paper on paper) ── */}
      <section id="awards" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="paper">
            <div>
              <Eyebrow>Awards</Eyebrow>
              <h2 className="h2" style={{ marginBottom: 28 }}>
                수상
              </h2>
              {awards.map((a, i) => (
                <a key={i} href={a.repo} target="_blank" rel="noopener noreferrer" className="award">
                  <span className="logo-orb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.logo} alt="" />
                  </span>
                  <span style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
                      <span className="t">{a.title}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: ORANGE, whiteSpace: "nowrap" }}>{a.date}</span>
                    </span>
                    <span className="s">{a.prize}</span>
                  </span>
                </a>
              ))}
            </div>
            <div>
              <Eyebrow>Qualifications</Eyebrow>
              <h2 className="h2" style={{ marginBottom: 28 }}>
                자격증
              </h2>
              {quals.map((q) => (
                <div key={q.title} className="award">
                  <span className="logo-orb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={q.logo} alt="" />
                  </span>
                  <span style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
                      <span className="t">{q.title}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: ORANGE, whiteSpace: "nowrap" }}>{q.date}</span>
                    </span>
                    <span className="s">{q.org}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Eyebrow>Skills</Eyebrow>
          <h2 className="h2" style={{ marginBottom: 40 }}>
            다섯 개의 무기
          </h2>
          <div className="skills-grid">
            {skills.map((g) => (
              <div key={g.num} className="skill-card">
                <p className="num" style={{ margin: 0 }}>
                  {g.num}
                </p>
                <h3>{g.area}</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {g.items.map((it) => (
                    <TechBadge key={it} name={it} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / FOOTER ── */}
      <footer id="contact">
        <div className="wrap">
          <div className="top">
            <h2 className="h2">같이 만들어볼까요?</h2>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }}>
              <a href="mailto:koreamax012@gmail.com" className="btn btn-dark btn-email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Email
              </a>
              <a href="https://github.com/koreamax" target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-github">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </a>
              <a href="https://velog.io/@koreamax01/posts" target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-velog">
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 4, background: "#20c997", color: "#141413", fontWeight: 800, fontSize: 13 }}>V</span>
                Velog
              </a>
              <a href="https://www.linkedin.com/in/koreamax" target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-linkedin">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
            <p style={{ margin: "24px 0 0", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>koreamax012@gmail.com</p>
          </div>
          <div className="bottom">
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.03em", color: "#fff" }}>
              BACE<span style={{ color: ORANGE_2 }}>.</span>
            </span>
            <span>© 2026 Minhyung Lee. All Rights Reserved.</span>
            <div style={{ display: "flex", gap: 20 }}>
              {[
                ["https://github.com/koreamax", "GitHub"],
                ["https://velog.io/@koreamax01/posts", "Velog"],
                ["https://www.linkedin.com/in/koreamax", "LinkedIn"],
              ].map(([href, label]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
