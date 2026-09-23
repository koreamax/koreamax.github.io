"use client";

import { useEffect, useRef, useState } from "react";
import { strengths, type Strength } from "@/components/portfolio-data";

/**
 * 일하는 방식 — 만든 것 말고, 만드는 동안 하는 일.
 *
 * 세 가지가 한 화면씩을 쓴다. 위에 제목 띠, 그 아래를 사진 벽이 채운다.
 * 제목을 벽 위에 얹지 않는 건 벽의 한 줄이 통째로 가려지지 않게 하려서다.
 *  · 01 기록        — 세 줄로 갈라 위아래로 흐른다
 *  · 02 학습        — 세 줄이 서로 반대로 양옆으로 지나간다
 *  · 03 발표·전달   — 비스듬히 누운 판 위를 다섯 줄이 대각선으로 흐른다
 *
 * 줄 수와 칸 수는 정해 두고 사진이 그 칸을 채운다. 모자라면 빈 칸으로 남긴다 —
 * 사진이 들어올수록 빈 칸이 줄어들 뿐, 칸 크기는 그대로다.
 * 같은 사진은 한 화면에 두 번 뜨지 않는다. 한 장은 한 줄에만 한 번 들어가고,
 * 한 줄의 칸 수는 그 줄이 화면에 걸치는 길이를 다 덮도록 잡아 두었다.
 */

/** 사진을 미는 결 — 화면마다 하나 */
type Flow = "col" | "row" | "deck";
const FLOWS: Flow[] = ["col", "row", "deck"];

/* ── 칸을 정하는 자 ──
   전부 도면 px 기준. 화면 가로는 늘 1440, 한 화면 높이는 720~900 이고 그중 위 150 은
   제목 띠라 벽은 570~750 이다. 세로로 흐르는 벽은 가장 긴 벽을, 가로 줄은 칸이 가장
   작아지는 가장 낮은 벽을 기준으로 재야 어느 창에서도 같은 사진이 두 번 안 보인다.

   기준은 엄격하게 잡는다 — 칸의 한 귀퉁이만 걸려도 보인 것으로 친다. 그러면 한 줄의
   칸 수가 (줄이 벽에 걸치는 길이 + 칸 길이) / 한 칸 간격 보다 많아야 한다. */
const W = 1440;
const BAND = 150;
const WALL_MAX = 900 - BAND;
const WALL_MIN = 720 - BAND;
const GAP = 16;
/** 벽 좌우 여백 — 제목 띠의 글머리와 맞춘다 */
const SIDE = 72;
/** 한 줄이 지나가는 빠르기(도면 px/초). 읽을 수 있을 만큼 느리게 */
const SPEED = 16;
/** 줄마다 조금씩 다르게 — 나란히 같이 움직이지 않게 */
const JITTER = [1, 1.2, 1.08, 1.28, 0.94, 1.14, 1.02];

type Geo = {
  lanes: number;
  /** 흐르는 방향으로 잰 칸 길이 */
  len: number;
  /** 한 줄이 벽에 걸치는 길이 (칸 길이만큼 앞뒤로 삐져나온 것까지 포함하기 전) */
  along: number;
};
const colLen = (W - 2 * SIDE - 2 * GAP) / 3 / 1.6;
const rowLen = ((WALL_MIN - 4 * GAP) / 3) * 1.6;
const deckLen = (1.3 * W - 6 * GAP) / 5;
const GEO: Record<Flow, Geo> = {
  /* 세 줄, 16:10 칸. 벽 높이만큼 걸친다 */
  col: { lanes: 3, len: colLen, along: WALL_MAX },
  /* 세 줄, 벽 높이를 셋으로 나눈 16:10 칸. 화면 폭만큼 걸친다 */
  row: { lanes: 3, len: rowLen, along: W },
  /* 다섯 줄, 폭 1.3배 판을 다섯으로 나눈 네모 칸. 기울고 원근이 걸려 걸치는 길이는 재서
     얻었다 — 900 화면에서 1200 + 0.8t 였고, 벽이 짧아진 만큼 줄여 쓴다. 기운 칸은 외곽
     상자가 아니라 실제로 그려진 픽셀을 짚어 가며 쟀다 */
  deck: { lanes: 5, len: deckLen, along: (1200 * WALL_MAX) / 900 - deckLen + 0.8 * deckLen },
};

/** 한 줄의 칸 수 — 이만큼이면 같은 사진이 한 줄 안에서 두 번 걸리지 않는다 */
const slots = (f: Flow) => Math.floor((GEO[f].along + GEO[f].len) / (GEO[f].len + GAP)) + 1;

/**
 * 사진을 줄에 나눠 담는다. 한 장은 한 줄에만, 그 줄에 한 번만 들어간다.
 * 칸이 남으면 빈 칸으로 채우되, 사진 사이사이로 흩어 빈 칸이 한데 몰리지 않게 한다.
 */
function lay(f: Flow, shots: string[]) {
  const { lanes } = GEO[f];
  const per = slots(f);
  const got: string[][] = Array.from({ length: lanes }, () => []);
  shots.forEach((s, i) => got[i % lanes].push(s));
  return got.map((photos) => {
    if (photos.length >= per) return photos;
    const row: (string | null)[] = Array.from({ length: per }, () => null);
    photos.forEach((p, i) => (row[Math.floor((i * per) / photos.length)] = p));
    return row;
  });
}

/** 사진 한 장. 파일이 없거나 깨지면 빈 칸으로 남는다 */
function Shot({ src, label }: { src: string; label: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  /* 하이드레이션 전에 이미 실패한 그림은 onError 가 오지 않는다 */
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);
  if (failed) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />;
}

/**
 * 한 줄 — 같은 칸을 두 벌 이어 붙여 제 길이의 절반만큼 민다. 끝이 처음과 만난다.
 * 한 바퀴 시간은 줄 길이에 맞춰 잡아 어느 줄이든 같은 빠르기로 흐른다.
 */
function Lane({ tiles, label, step, index }: { tiles: (string | null)[]; label: string; step: number; index: number }) {
  const spin = ((tiles.length * step) / SPEED) * JITTER[index % JITTER.length];
  return (
    <span className={`st-lane ${index % 2 ? "is-back" : ""}`} style={{ ["--spin" as string]: `${spin.toFixed(1)}s` }}>
      {[0, 1].map((dup) =>
        tiles.map((src, i) => (
          <span className={`st-tile ${src ? "" : "is-empty"}`} key={`${dup}-${i}`} aria-hidden={dup === 1 || undefined}>
            {src && <Shot src={src} label={label} />}
          </span>
        )),
      )}
    </span>
  );
}

/** 한 화면 — 위에 번호와 제목, 그 아래를 사진 벽이 채운다 */
function Screen({ item, flow }: { item: Strength; flow: Flow }) {
  const step = GEO[flow].len + GAP;
  const body = lay(flow, item.shots).map((t, c) => <Lane key={c} tiles={t} label={item.ph} step={step} index={c} />);
  return (
    <article className="st-screen" data-flow={flow}>
      <span className="st-caption">
        <span className="st-top">
          <b className="st-num">{item.num}</b>
          <h3 className="st-title">{item.title}</h3>
        </span>
      </span>
      <span className={`st-wall is-${flow}`} aria-hidden>
        {flow === "deck" ? <span className="st-plane">{body}</span> : body}
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
    <section id="how" ref={rootRef} className="st-sec">
      {strengths.map((item, i) => (
        <Screen key={item.num} item={item} flow={FLOWS[i % FLOWS.length]} />
      ))}
    </section>
  );
}
