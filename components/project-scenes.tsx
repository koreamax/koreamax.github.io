"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, type CategoryItem, type CategoryIssue } from "@/components/portfolio-data";
import { ProgressiveFluxLoader } from "@/components/ui/progressive-flux-loader";
import { GlowCard } from "@/components/ui/spotlight-card";
import { designViewport } from "@/components/fixed-canvas";

gsap.registerPlugin(ScrollTrigger);

/**
 * "온 더 스크린" 전용 무대.
 *
 * 화면은 제자리에 고정되고, 스크롤 진행도가 장면을 바꾼다. 다만 장면이 통째로 사라졌다
 * 나타나는 것이 아니라 현재 장면이 해체되어 흩어지고 그 자리에서 다음 장면이 조립된다.
 *
 * 요소는 세 겹으로 나뉜다. 배경, 본문 카드, 앞쪽 제목이 서로 다른 속도와 방향으로 움직여
 * 깊이가 생긴다. 전환마다 해체·조립 방식이 달라 같은 동작이 반복되지 않고, 스크롤 속도를
 * 읽어 빠르게 굴릴수록 무대가 조금 더 크게 반응한다.
 *
 * 화면 크기에 따라 구성이 달라지지 않도록 1440 × 860 고정 캔버스에 그린 뒤 배율만 맞춘다.
 * 모바일과 prefers-reduced-motion 에서는 고정하지 않고 평범한 세로 흐름으로 되돌린다.
 */

const CANVAS_W = 1440;
const CANVAS_H = 860;

const GREEN = "#22c55e";
const RED = "#da291c";
const statusColor = (status: string) => (status.includes("진행") ? GREEN : RED);

const FLUX_ONGOING = { "--flux-from": "#16a34a", "--flux-to": "#4ade80" } as CSSProperties;
const FLUX_DONE = { "--flux-from": "#da291c", "--flux-to": "#ff8a7a" } as CSSProperties;

/** 카드 아래에 붙는 진행 상태 — 진행 중이면 초록 바가 계속 흐르고, 끝났으면 빨간 바가 꽉 찬다 */
function CardStatus({ status }: { status: string }) {
  const ongoing = status.includes("진행");
  const c = statusColor(status);
  return (
    <div className="pcard-foot" style={ongoing ? FLUX_ONGOING : FLUX_DONE}>
      <span className="pcard-status" style={{ color: c }}>
        <span
          className="pcard-status-dot"
          style={{ background: c, boxShadow: ongoing ? `0 0 8px ${c}` : "none", animation: ongoing ? "statusPulse 1.4s ease-in-out infinite" : "none" }}
        />
        {ongoing ? "진행 중" : "종료"}
      </span>
      <div className="pcard-bar">
        {ongoing ? (
          <ProgressiveFluxLoader showLabel={false} duration={4} loop className="max-w-none gap-0" barClassName="h-1.5 bg-white/10 shadow-none" />
        ) : (
          <ProgressiveFluxLoader showLabel={false} value={100} className="max-w-none gap-0" barClassName="h-1.5 bg-white/10 shadow-none" />
        )}
      </div>
    </div>
  );
}

/** 문제·해결이 담긴 에디터 창 — 왼쪽 구조도와 같은 창틀을 쓴다 */
/* 들어오자마자 바뀌면 코드가 깔려 있었다는 걸 못 본다 — 잠깐 그대로 둔다 */
const CODE_HOLD = 0.55;
/** 글자 수에 맞춘 길이. 다 같이 시작하니 길이는 비슷하게 두어 함께 끝나게 한다 */
const span = (len: number) => 800 + len * 6;

/** 관점 이름을 코드에 적을 때 쓰는 말 — 주석 줄에 깔아 둔다 */
const LENS_NOTE: Record<string, string> = {
  백엔드: "# backend",
  클라우드: "# cloud",
  AI: "# ai",
  임베디드: "# embedded",
};

/**
 * 코드 끝에 달아 둔 영어 설명만 뽑아낸다.
 * 태그 줄에는 깔아 둘 코드가 따로 없다. 없다고 아무 글자나 흩뿌리면 한글 초성이
 * 깔려 코드처럼 읽히지 않으니, 바로 아래 줄 코드에 이미 적어 둔 설명을 끌어다 쓴다.
 */
function codeNote(code?: string): string | undefined {
  const m = code?.match(/(?:\/\/|#)\s*(.+)$/);
  return m ? `// ${m[1]}` : undefined;
}

/**
 * 문제 해결을 한 판에 다 싣는다 — 누르지 않아도 한눈에 읽힌다.
 * 맨 위 초록 주석이 어떤 서비스인지 한 줄로 말하고, 그 아래로 문제마다
 * [번호] 제목 → - 문제(번호 붙은 항목) → + 해결(방법 → 결과) 가 같은 순서로 이어진다.
 * 모든 덩어리가 같은 모양이라 두 번째부터는 어디에 무엇이 있는지 바로 보인다.
 */
function ProblemWindow({ issues, title, brief }: { issues: CategoryIssue[]; title: string; brief?: string }) {
  /* 한 줄씩 차례로 넘기면 눈이 따라다니느라 정신없다 — 파일 전체가 한 번에 넘어간다 */
  const slot = (len: number) => ({ delay: CODE_HOLD, dur: span(len) });
  let ln = 0; // 빈 줄도 번호를 먹는다 — 에디터가 그렇다
  const rows: ReactNode[] = [];
  /* 한 줄은 번호 · 접두 · 본문 세 칸이다. 본문이 접혀도 접두 자리는 비어 있어 글머리가 맞는다 */
  const push = (kind: string, prefix: ReactNode, body: ReactNode) =>
    rows.push(
      <span className={`pw-row ${kind}`} key={rows.length}>
        <b className="pw-gutter">{++ln}</b>
        <b className="pw-pre">{prefix}</b>
        <span className="pw-line">{body}</span>
      </span>,
    );
  const reveal = (text: string, code?: string) => <CodeReveal text={text} code={code} {...slot(text.length)} />;

  if (brief) {
    push("is-comment is-brief", null, reveal(`// ${title} — ${brief}`, LENS_NOTE[issues[0]?.lens ?? ""]));
    push("", null, null);
  }
  issues.forEach((iss, k) => {
    if (k) push("", null, null);
    push("is-tag", <em className="pw-idx">[{String(k + 1).padStart(2, "0")}]</em>, reveal(iss.tag, codeNote(iss.problemCode)));
    /* 문제는 지워질 줄, 해결은 더해질 줄 — diff 로 읽으면 한눈에 갈린다.
       문제 항목은 줄마다 번호를 달고, 첫 줄에만 "- 문제" 를 붙인다 */
    iss.problem.forEach((p, i) =>
      push(
        `is-del ${i ? "is-cont" : ""}`,
        <>
          <em className="pw-sign">{i ? "" : "-"}</em>
          <em className="pw-key">{i ? "" : "문제"}</em>
        </>,
        <span className="pw-item">
          <em className="pw-item-n">{i + 1}.</em>
          {reveal(p, i ? undefined : iss.problemCode)}
        </span>,
      ),
    );
    push(
      "is-add",
      <>
        <em className="pw-sign">+</em>
        <em className="pw-key">해결</em>
      </>,
      reveal(iss.solution, iss.solutionCode),
    );
  });

  const lenses = issues.reduce<Record<string, number>>((m, i) => ((m[i.lens ?? ""] = (m[i.lens ?? ""] ?? 0) + 1), m), {});
  return (
    <span className="pw-ed">
      <span className="pw-ed-tabs" aria-hidden>
        <span className="pw-ed-tab is-on">
          <i className="pw-ed-dot" />
          {title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.problems.diff
        </span>
      </span>
      <span className="pw-ed-code">{rows}</span>
      <span className="pw-ed-panel" aria-hidden>
        <b className="is-on">PROBLEMS {issues.length}</b>
        {Object.entries(lenses).map(([lens, c]) => (
          <b key={lens}>
            {lens.toUpperCase()} {c}
          </b>
        ))}
      </span>
    </span>
  );
}

/** 문제·해결 한 짝 — 그림 없는 장면에서 쓴다 */
function IssueBlock({ iss, k }: { iss: CategoryIssue; k: number }) {
  return (
    <span className="pcard-issue">
      <span className="pcard-issue-head">
        <b className="pcard-issue-num">{String(k + 1).padStart(2, "0")}</b>
        <b className="pcard-issue-tag">{iss.tag}</b>
      </span>
      <span className="pcard-block">
        <b className="pb-problem">문제</b>
        {iss.problem.join(" · ")}
      </span>
      <span className="pcard-block">
        <b className="pb-fix">해결</b>
        {iss.solution}
      </span>
    </span>
  );
}

/** 구조도 한 장. 그림 자체가 한 장의 도면이라 창틀을 씌우지 않는다 */
function ArchShot({ arch }: { arch: NonNullable<CategoryItem["arch"]> }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="pw-arch pw-arch-ph">architecture</span>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="pw-arch"
      src={arch.src}
      alt={arch.caption}
      /* 하이드레이션 전에 이미 실패한 그림은 onError 가 오지 않는다 */
      ref={(el) => {
        if (el?.complete && el.naturalWidth === 0) setFailed(true);
      }}
      onError={() => setFailed(true)}
    />
  );
}

/* 아직 글이 안 온 칸에서 깜빡이는 글리프.
   여기는 코드가 깔린 에디터라 한글 초성이 섞이면 코드로 안 읽힌다 — 영문과 기호만 쓴다.
   한글 한 자 자리는 두 자로 메워야 줄 폭이 그대로다. */
const GLYPH = "abcdefgilmnoprstuvxy0123456789_-+*/=<>(){}[];.#$";
const one = () => GLYPH[(Math.random() * GLYPH.length) | 0];
const pick = (slots: number) => {
  let s = "";
  for (let i = 0; i < slots; i++) s += one();
  return s;
};

/* 한글 한 자가 영문 몇 자 폭인지 — 폰트마다 다르므로 실제로 재서 쓴다.
   어림잡아 2로 두면 깔아 둔 코드가 설명보다 짧거나 길어져 칸이 안 맞는다. */
let wideRatio = 0;
function measureWide(el: HTMLElement) {
  if (wideRatio) return wideRatio;
  const cv = document.createElement("canvas").getContext("2d");
  if (!cv) return (wideRatio = 2);
  const cs = getComputedStyle(el);
  cv.font = `${cs.fontSize} ${cs.fontFamily}`;
  const narrow = cv.measureText("a".repeat(20)).width / 20;
  const wide = cv.measureText("가".repeat(20)).width / 20;
  return (wideRatio = narrow > 0 ? wide / narrow : 2);
}

/* 고정 무대에서는 네 장면이 같은 자리에 겹쳐 있고, 차례가 아닌 장면은 autoAlpha 로만
   감춰 둔다. IntersectionObserver 는 감춰진 것도 "보인다"고 해서, 무대에 들어서는 순간
   뒤쪽 장면(04 VIAssist)까지 한꺼번에 코드가 풀려 버리고 정작 그 장면에 닿았을 땐
   이미 글이 되어 있다. 그래서 제 장면이 실제로 켜졌는지 한 번 더 보고 시작한다. */
const waiting = new Set<{ el: HTMLElement; run: () => void }>();
let pump = 0;

function sceneLit(el: HTMLElement, seen: Map<HTMLElement, boolean>) {
  const scene = el.closest<HTMLElement>(".pscene") ?? el;
  const known = seen.get(scene);
  if (known !== undefined) return known;
  const cs = getComputedStyle(scene);
  const lit = cs.visibility !== "hidden" && Number(cs.opacity) > 0.05;
  seen.set(scene, lit);
  return lit;
}

/* 줄이 수십 개라 저마다 제 눈으로 살피면 프레임마다 같은 계산을 되풀이한다 — 한 번 재고 나눠 쓴다 */
function tick() {
  pump = 0;
  const seen = new Map<HTMLElement, boolean>();
  for (const w of [...waiting]) {
    if (!sceneLit(w.el, seen)) continue;
    waiting.delete(w);
    w.run();
  }
  if (waiting.size) pump = requestAnimationFrame(tick);
}

function whenLit(el: HTMLElement, run: () => void) {
  const w = { el, run };
  waiting.add(w);
  if (!pump) pump = requestAnimationFrame(tick);
  return () => waiting.delete(w);
}

/**
 * 깔려 있던 코드가 설명으로 바뀐다.
 * 앞에서부터 설명이 들어앉고, 아직 안 온 칸은 그대로 코드가 메우고 있다.
 * 완성된 글을 안 보이게 깔아 자리를 잡아 두므로 바뀌는 내내 줄바꿈이 그대로다.
 */
function CodeReveal({ text, code, delay = 0, dur }: { text: string; code?: string; delay?: number; dur?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = [...text];
    const r = measureWide(el);
    const w = chars.map((c) => (c.charCodeAt(0) > 0x1100 ? r : 1));
    /* 한 글자가 영문 몇 칸을 먹는지 — 깜빡이는 칸을 그만큼 채워야 줄 폭이 그대로다 */
    const slot = w.map((x) => Math.max(1, Math.round(x)));
    const total = Math.round(w.reduce((a, b) => a + b, 0));
    /* 코드는 설명과 꼭 같은 폭만큼만 깔린다. 깔아 둘 코드가 없으면 그 자리는
       영문 글리프로 메운다 — 한글 초성을 섞으면 코드로 안 읽힌다. */
    const src = (code ?? pick(total)).padEnd(total, " ").slice(0, total);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      return;
    }

    const DUR = dur ?? 800 + chars.length * 9;
    const EDGE = 5; // 앞머리 몇 칸은 아직 굳지 않은 채 깜빡인다
    let raf = 0;
    let t0 = 0;

    const frame = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / DUR);
      const upto = Math.floor(p * chars.length);
      let out = "";
      let used = 0;
      let i = 0;
      for (; i < upto; i++) {
        out += chars[i];
        used += w[i];
      }
      for (let k = 0; k < EDGE && i < chars.length; k++, i++) {
        out += chars[i] === " " ? " " : pick(slot[i]);
        used += w[i];
      }
      out += src.slice(Math.round(used));
      el.textContent = out;
      if (p < 1) raf = requestAnimationFrame(frame);
      else el.textContent = text;
    };

    /* 장면이 눈에 들어오기 전까지는 깔아 둔 코드만 보인다 */
    el.textContent = src;
    let timer = 0;
    let drop = () => {};
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        /* 자리에 들어왔더라도 제 장면이 켜질 때까지 기다린다 */
        drop = whenLit(el, () => {
          timer = window.setTimeout(() => {
            raf = requestAnimationFrame(frame);
          }, delay * 1000);
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      drop();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, code, delay, dur]);

  return (
    <span className="cr">
      {/* 완성된 글이 자리를 잡아 준다 — 코드가 깔려 있는 동안에도 칸이 그대로다 */}
      <span className="cr-size">{text}</span>
      <span className="cr-live" ref={ref} />
    </span>
  );
}

const SHOW = "inset(0% 0% 0% 0%)";

/** 분야마다 카드에 감도는 빛의 색 — 그 분야의 강조색과 가장 가까운 쪽으로 */
const GLOW: Record<string, "blue" | "purple" | "green" | "orange"> = {
  "01": "blue",
  "02": "purple",
  "03": "green",
  "04": "orange",
};

/** 장면 하나를 넘기는 데 필요한 스크롤 (화면 높이 배수) */
const SCENE_SCROLL = 2.1;

export default function ProjectScenes() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  /* 고정 캔버스 배율 — 어떤 화면에서도 같은 구성으로 보이게 한다 */
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const fit = () => {
      if (root.classList.contains("pstage-flow")) {
        canvas.style.removeProperty("--ps");
        return;
      }
      // 창이 아니라 도면 기준으로 재야 어느 화면에서든 같은 크기로 보인다
      const v = designViewport();
      const s = Math.min(v.w / CANVAS_W, v.h / CANVAS_H, 1.35);
      canvas.style.setProperty("--ps", String(s));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = designViewport().w <= 1000;
    const scenes = gsap.utils.toArray<HTMLElement>(".pscene", root);
    if (scenes.length < 2) return;

    /* 폴백: 평범하게 쌓아서 보여준다 */
    if (reduced || small) {
      root.classList.add("pstage-flow");
      if (trackRef.current) trackRef.current.style.height = "auto";
      canvasRef.current?.style.removeProperty("--ps");
      if (reduced) return;
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              gsap.fromTo(e.target, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.2 },
      );
      scenes.forEach((s) => io.observe(s));
      return () => io.disconnect();
    }

    const ctx = gsap.context(() => {
      const n = scenes.length;
      const q = (s: HTMLElement, sel: string) => gsap.utils.toArray<HTMLElement>(sel, s);

      /* 첫 장면만 보이고, 나머지는 조립되기 전 상태로 숨겨 둔다 */
      gsap.set(scenes[0], { autoAlpha: 1 });
      gsap.set(scenes.slice(1), { autoAlpha: 0 });
      scenes.forEach((s, i) => {
        if (i === 0) return;
        gsap.set(q(s, "[data-name],[data-num]"), { clipPath: "inset(0% 0% 100% 0%)", yPercent: 38 });
        gsap.set(q(s, "[data-rule]"), { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(q(s, "[data-count]"), { opacity: 0, y: 18 });
        gsap.set(q(s, "[data-item]"), { clipPath: "inset(0% 0% 100% 0%)", y: 60 });
        gsap.set(q(s, "[data-bg]"), { scale: 0.6, opacity: 0 });
      });

      /* 스크롤 속도에 따른 반응은 기울이지 않고 아주 약한 확대로만 준다 */
      const setPush = gsap.quickTo(".pscene-inner", "scale", { duration: 0.6, ease: "power3.out" });

      const track = trackRef.current;
      // 무대는 sticky 로 화면에 붙고, 스크롤 길이는 트랙이 갖는다.
      // ScrollTrigger 의 pin 은 잰 크기를 다시 써 넣는데 그 값이 화면 좌표라,
      // 화면 전체가 확대·축소된 이 사이트에서는 어긋난다.
      if (track) track.style.height = `calc(var(--vh) * ${100 * (1 + (n - 1) * SCENE_SCROLL)})`;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: track || root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const v = gsap.utils.clamp(0, 1, Math.abs(self.getVelocity()) / 2600);
            setPush(1 + v * 0.012);
          },
        },
      });

      for (let i = 0; i < n - 1; i++) {
        const cur = scenes[i];
        const nxt = scenes[i + 1];
        const at = i;
        const P = (t: number) => at + t; // 구간 안에서의 상대 위치

        const pick = (s: HTMLElement) => ({
          name: q(s, "[data-name]"),
          num: q(s, "[data-num]"),
          count: q(s, "[data-count]"),
          rule: q(s, "[data-rule]"),
          cards: q(s, "[data-item]"),
          bg: q(s, "[data-bg]"),
        });
        const a = pick(cur);
        const b = pick(nxt);

        /* ── 해체 ── 구간 앞부분(0 ~ 0.34)은 그대로 멈춰 있어 카드를 끝까지 읽을 수 있다 ── */
        tl.to(a.num, { xPercent: -140, opacity: 0, duration: 0.2, ease: "power2.in" }, P(0.34));
        tl.to(a.name, { x: -170, y: -28, opacity: 0, duration: 0.22, ease: "power2.in" }, P(0.36));
        tl.to(a.count, { y: 40, opacity: 0, duration: 0.18, ease: "power2.in" }, P(0.35));
        tl.to(a.rule, { scaleX: 0, transformOrigin: "100% 50%", duration: 0.16, ease: "power2.in" }, P(0.37));
        tl.to(a.bg, { x: 190, scale: 1.25, opacity: 0, duration: 0.3, ease: "power1.inOut" }, P(0.34));

        if (i === 0) {
          /* 좌우로 갈라지며 뒤로 물러난다.
             이 장면은 큰 판 두 장뿐이라 카드 넉 장과 같은 거리로 밀면 거의 안 움직여 보인다 */
          const big = cur.querySelector(".pwide") ? 2.1 : 1;
          tl.to(
            a.cards,
            {
              x: (idx) => (idx % 2 ? 230 : -230) * big,
              y: (idx) => (idx % 2 ? 54 : -46) * big,
              rotate: (idx) => (idx % 2 ? 5 : -5) * big,
              scale: big > 1 ? 0.64 : 0.82,
              opacity: 0,
              duration: 0.24,
              stagger: big > 1 ? 0.07 : 0.025,
              ease: "power2.in",
            },
            P(0.38),
          );
        } else if (i === 1) {
          /* 아래로 쏟아지듯 떨어진다 */
          tl.to(
            a.cards,
            { y: 250, rotate: (idx) => -4 + idx * 3, scale: 0.9, opacity: 0, duration: 0.24, stagger: { each: 0.025, from: "end" }, ease: "power2.in" },
            P(0.38),
          );
        } else {
          /* 보는 사람 쪽으로 확대되며 지나간다 */
          tl.to(a.cards, { scale: 1.22, y: -70, opacity: 0, duration: 0.24, stagger: 0.025, ease: "power2.in" }, P(0.38));
        }

        /* 장면 자체는 요소가 다 흩어진 뒤에 꺼지고, 다음 장면은 조립 직전에 켜진다 */
        tl.to(cur, { autoAlpha: 0, duration: 0.08 }, P(0.6));
        tl.to(nxt, { autoAlpha: 1, duration: 0.08 }, P(0.56));

        /* ── 조립 ── 배경이 먼저 열리고 번호, 이름, 선, 카드 순으로 ── */
        tl.fromTo(b.bg, { scale: 0.6, x: -150, opacity: 0 }, { scale: 1, x: 0, opacity: 1, duration: 0.32, ease: "power2.out" }, P(0.58));
        tl.fromTo(b.num, { clipPath: "inset(0% 0% 100% 0%)", yPercent: 38 }, { clipPath: SHOW, yPercent: 0, duration: 0.22, ease: "power3.out" }, P(0.64));
        tl.fromTo(b.name, { clipPath: "inset(0% 0% 100% 0%)", yPercent: 38 }, { clipPath: SHOW, yPercent: 0, duration: 0.24, ease: "power3.out" }, P(0.66));
        tl.fromTo(b.rule, { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: 0.2, ease: "power3.out" }, P(0.7));
        tl.fromTo(b.count, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" }, P(0.74));

        if (i === 0) {
          /* 아래에서 마스크가 걷히며 올라온다 */
          tl.fromTo(b.cards, { clipPath: "inset(0% 0% 100% 0%)", y: 70 }, { clipPath: SHOW, y: 0, duration: 0.22, stagger: 0.025, ease: "power3.out" }, P(0.7));
        } else if (i === 1) {
          /* 왼쪽에서 오른쪽으로 닦여 나온다. 옆으로만 움직이니 숨겨 둘 때 내려 둔 y 는 여기서 걷어 낸다 —
             안 그러면 이 장면만 카드가 60 내려앉은 채로 멈춘다 */
          tl.fromTo(b.cards, { clipPath: "inset(0% 100% 0% 0%)", x: -40, y: 0 }, { clipPath: SHOW, x: 0, y: 0, duration: 0.22, stagger: 0.025, ease: "power3.out" }, P(0.7));
        } else {
          /* 가운데부터 펼쳐지며 아주 약한 overshoot */
          tl.fromTo(
            b.cards,
            { clipPath: "inset(12% 6% 12% 6%)", scale: 0.94, y: 40, opacity: 0 },
            { clipPath: SHOW, scale: 1, y: 0, opacity: 1, duration: 0.24, stagger: { each: 0.025, from: "center" }, ease: "back.out(1.3)" },
            P(0.7),
          );
        }

        /* 진행 표시 */
        tl.to(root.querySelectorAll(".pstage-dot")[i + 1], { backgroundColor: RED, scale: 1.25, duration: 0.14 }, P(0.62));
        tl.to(root.querySelectorAll(".pstage-dot")[i], { backgroundColor: "rgba(255,255,255,0.22)", scale: 1, duration: 0.14 }, P(0.62));
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={trackRef} className="pstage-track">
    <div ref={rootRef} className="pstage">
      <div ref={canvasRef} className="pstage-canvas">
        {categories.map((c) => (
          <section key={c.num} className="pscene" style={{ ["--cat" as string]: c.color }}>
            <span className="pscene-bg" data-bg aria-hidden />

            <div className="pscene-inner">
              <div className="pscene-head">
                <span className="pscene-mask">
                  <span className="pscene-num" data-num>
                    {c.num}
                  </span>
                </span>
                <span className="pscene-mask">
                  <h3 className="pscene-name" data-name>
                    {c.name}
                  </h3>
                </span>
                {c.items.length > 1 && (
                  <span className="pscene-count" data-count>
                    {c.items.length} projects
                  </span>
                )}
                <span className="pscene-rule" data-rule aria-hidden />
              </div>

              <div className="pscene-row" style={{ ["--n" as string]: c.items.length }}>
                {c.items.map((it) =>
                  it.arch ? (
                    /* 그림과 글만 놓는 장면 — 껍데기도 없고, 눌러도 딴 데로 가지 않는다 */
                    <span key={it.title} className="pcard-link pw-link">
                      <span className="pwide">
                        <span className="pw-left" data-item>
                          <ArchShot arch={it.arch} />
                        </span>
                        <span className="pw-right" data-item>
                          <ProblemWindow issues={it.issues ?? []} title={it.title} brief={it.brief} />
                        </span>
                      </span>
                    </span>
                  ) : (
                    <a key={it.title} data-item href={it.repo} target="_blank" rel="noopener noreferrer" className="pcard-link">
                      <GlowCard customSize pointerSpace="element" glowColor={GLOW[c.num] ?? "blue"} className="pcard">
                        <span className="pcard-top">
                          <span className="pl-title">{it.title}</span>
                          <span className="pl-go" aria-hidden>
                            ↗
                          </span>
                        </span>
                        <span className="pcard-summary">{it.summary}</span>
                        {/* 짚은 문제가 여럿이면 번호를 붙여 따로 적는다 — 한 덩어리로 뭉치면 읽히지 않는다 */}
                        {it.issues ? (
                          it.issues.map((iss, k) => <IssueBlock key={iss.tag} iss={iss} k={k} />)
                        ) : (
                          <>
                            <span className="pcard-block">
                              <b className="pb-problem">문제</b>
                              {it.problem}
                            </span>
                            <span className="pcard-block">
                              <b className="pb-fix">해결</b>
                              {it.solution}
                            </span>
                          </>
                        )}
                        <CardStatus status={it.status} />
                      </GlowCard>
                    </a>
                  ),
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="pstage-dots" aria-hidden>
        {categories.map((c, i) => (
          <span key={c.num} className="pstage-dot" style={i === 0 ? { background: RED, transform: "scale(1.25)" } : undefined} />
        ))}
      </div>
    </div>
    </div>
  );
}
