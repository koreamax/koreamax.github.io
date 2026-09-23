"use client";

import { useEffect, useRef, useState } from "react";
import { strengths, type Strength } from "@/components/portfolio-data";

/**
 * 일하는 방식 — 만든 것 말고, 만드는 동안 하는 일.
 *
 * 세 가지가 한 화면씩을 통째로 쓴다. 화면마다 사진이 흐르는 결이 다르다.
 *  · 01 기록        — 화면을 세로 줄로 갈라 위아래로 흐른다. 문서는 길쭉하게 읽힌다
 *  · 02 학습        — 가로 줄이 서로 반대로 양옆으로 지나간다
 *  · 03 발표·전달   — 비스듬히 누운 판 위를 줄들이 대각선으로 흐른다
 *
 * 같은 사진이 한 화면에 두 번 뜨는 일은 없다. 한 장은 한 줄에만 한 번 들어가고,
 * 줄 하나에 든 서로 다른 사진이 그 줄이 화면에 보이는 길이를 다 덮어야 한다.
 * 그래서 줄 수는 가진 장수가 정한다 — 장수가 늘면 줄이 늘고 칸은 작아진다.
 */

/** 사진을 미는 결 — 화면마다 하나 */
type Flow = "col" | "row" | "deck";
const FLOWS: Flow[] = ["col", "row", "deck"];

/* ── 줄 수를 정하는 자 ──
   전부 도면 px 기준. 화면 가로는 늘 1440 이고, 한 화면의 높이는 720~900 사이로 묶어 둔다.
   세로로 흐르는 벽은 가장 긴 화면(H_MAX)을, 가로 줄은 칸이 가장 작아지는 가장 낮은
   화면(H_MIN)을 기준으로 재야 어느 창에서도 같은 사진이 두 번 안 보인다.

   기준은 엄격하게 잡는다 — 칸의 한 귀퉁이만 화면에 걸려도 보인 것으로 친다.
   그러면 한 줄에 서로 다른 사진이 (줄이 화면에 걸치는 길이 + 칸 길이) / 한 칸 간격 보다
   많아야 같은 사진 둘이 동시에 걸리지 않는다. */
const W = 1440;
const H_MAX = 900;
const H_MIN = 720;
const GAP = 16;
/** 한 줄이 지나가는 빠르기(도면 px/초). 읽을 수 있을 만큼 느리게 */
const SPEED = 16;
/** 줄마다 조금씩 다르게 — 나란히 같이 움직이지 않게 */
const JITTER = [1, 1.2, 1.08, 1.28, 0.94, 1.14, 1.02];

type Geo = {
  maxLanes: number;
  /** 줄 수가 L 일 때 흐르는 방향으로 잰 칸 길이 */
  len: (L: number) => number;
  /** 칸 길이가 t 일 때 한 줄이 화면에 걸치는 길이 (칸 길이만큼 앞뒤로 삐져나온 것까지) */
  span: (t: number) => number;
};
const GEO: Record<Flow, Geo> = {
  /* 세로 줄: 폭을 줄 수로 나눈 16:10 칸. 화면 높이만큼 걸친다 */
  col: { maxLanes: 5, len: (L) => (W - (L + 1) * GAP) / L / 1.6, span: (t) => H_MAX + t },
  /* 가로 줄: 높이를 줄 수로 나눈 16:10 칸. 화면 폭만큼 걸친다 */
  row: { maxLanes: 4, len: (L) => ((H_MIN - (L + 1) * GAP) / L) * 1.6, span: (t) => W + t },
  /* 누운 판: 폭 1.3배 판을 줄 수로 나눈 네모 칸. 기울고 원근이 걸려 한 줄이 화면에
     걸치는 길이는 계산이 아니라 재서 얻었다 — 가장 긴 화면에서, 칸의 외곽 상자가 아니라
     실제로 그려진 픽셀을 짚어 가며 쟀다. 외곽 상자로 재면 기운 칸의 빈 귀퉁이까지 세어 부풀려진다 */
  deck: { maxLanes: 6, len: (L) => (1.3 * W - (L + 1) * GAP) / L, span: (t) => 1200 + 0.8 * t },
};

/** 줄 수가 L 일 때 한 줄에 서로 다른 사진이 몇 장 있어야 하는지 */
const perLane = (f: Flow, L: number) => {
  const t = GEO[f].len(L);
  return Math.floor(GEO[f].span(t) / (t + GAP)) + 1;
};

/**
 * 사진을 줄에 나눠 담는다. 한 장은 한 줄에만, 그 줄에 한 번만 들어간다.
 * 가진 장수로 채울 수 있는 가장 많은 줄을 고른다 — 줄이 많을수록 칸이 작다.
 */
function plan(f: Flow, shots: string[]) {
  let L = 1;
  for (let n = GEO[f].maxLanes; n >= 1; n--) {
    if (shots.length >= n * perLane(f, n)) {
      L = n;
      break;
    }
  }
  const lanes: string[][] = Array.from({ length: L }, () => []);
  shots.forEach((s, i) => lanes[i % L].push(s));
  return { lanes, step: GEO[f].len(L) + GAP };
}

/** 사진 한 장. 파일이 없거나 깨지면 이름만 적힌 자리로 남는다 */
function Shot({ src, label }: { src: string; label: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  /* 하이드레이션 전에 이미 실패한 그림은 onError 가 오지 않는다 */
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);
  if (failed) return <span className="st-ph">{label}</span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />;
}

/**
 * 한 줄 — 같은 칸을 두 벌 이어 붙여 제 길이의 절반만큼 민다. 끝이 처음과 만난다.
 * 한 바퀴 시간은 줄 길이에 맞춰 잡아 짧은 줄이든 긴 줄이든 같은 빠르기로 흐른다.
 */
function Lane({ tiles, label, step, index }: { tiles: string[]; label: string; step: number; index: number }) {
  const spin = ((tiles.length * step) / SPEED) * JITTER[index % JITTER.length];
  return (
    <span className={`st-lane ${index % 2 ? "is-back" : ""}`} style={{ ["--spin" as string]: `${spin.toFixed(1)}s` }}>
      {[0, 1].map((dup) =>
        tiles.map((src, i) => (
          <span className="st-tile" key={`${dup}-${i}`} aria-hidden={dup === 1 || undefined}>
            <Shot src={src} label={label} />
          </span>
        )),
      )}
    </span>
  );
}

/** 한 화면 — 사진 벽이 화면을 채우고, 번호와 제목은 그 위 아래쪽에 얹힌다 */
function Screen({ item, flow }: { item: Strength; flow: Flow }) {
  const { lanes, step } = plan(flow, item.shots);
  const body = lanes.map((t, c) => <Lane key={c} tiles={t} label={item.ph} step={step} index={c} />);
  return (
    <article className="st-screen" data-flow={flow}>
      <span className={`st-wall is-${flow}`} aria-hidden>
        {flow === "deck" ? <span className="st-plane">{body}</span> : body}
      </span>
      <span className="st-caption">
        <span className="st-top">
          <b className="st-num">{item.num}</b>
          <h3 className="st-title">{item.title}</h3>
        </span>
      </span>
    </article>
  );
}

export default function Strengths() {
  const rootRef = useRef<HTMLElement>(null);

  /* 화면에 들어올 때 제목이 올라오고, 화면을 벗어나면 벽이 멈춘다 —
     화면 셋이 한꺼번에 사진 수십 장을 밀고 있을 이유가 없다 */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const screens = [...root.querySelectorAll<HTMLElement>(".st-screen")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      screens.forEach((s) => s.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          e.target.classList.toggle("is-live", e.isIntersecting);
          if (e.intersectionRatio > 0.18) e.target.classList.add("is-in");
        }),
      { threshold: [0, 0.18] },
    );
    screens.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section id="timeline" ref={rootRef} className="st-sec">
      {strengths.map((item, i) => (
        <Screen key={item.num} item={item} flow={FLOWS[i % FLOWS.length]} />
      ))}
    </section>
  );
}
