"use client";

import { useEffect, useRef, useState } from "react";
import { strengths, type Strength } from "@/components/portfolio-data";

/**
 * 일하는 방식 — 만든 것 말고, 만드는 동안 하는 일.
 *
 * 한 화면에 두 개씩 세 번. 짝마다 사진이 흐르는 결을 달리해 같은 화면이 세 번
 * 반복되지 않게 한다.
 *  · 01·02 기록      — 세로로 흐르는 두 줄. 문서와 글은 길쭉하게 읽힌다
 *  · 03·04 꾸준함·전달 — 비스듬히 누운 판 위를 여러 줄이 서로 반대로 흐른다
 *  · 05·06 발표·도구  — 가로로 두 줄이 서로 반대로. 현장 사진은 옆으로 넘겨 보는 결이 맞다
 *
 * 사진이 아직 없으면 이름만 적힌 자리로 남는다. 넣은 장수에 맞춰 줄 수가 줄어들어,
 * 같은 사진이 두 줄에 동시에 떠 있는 일은 없다.
 */

/** 사진을 미는 결 — 짝마다 하나씩 */
type Flow = "col" | "deck" | "band";

/** 한 화면에 두 개씩. 앞에서부터 둘씩 끊어 제 결을 준다.
    lanes·tiles 는 사진이 아직 없을 때 자리만 잡아 둘 크기이자 줄 수의 상한이다. */
const VIEWS: { flow: Flow; lanes: number; tiles: number }[] = [
  { flow: "col", lanes: 2, tiles: 4 },
  { flow: "deck", lanes: 3, tiles: 4 },
  { flow: "band", lanes: 2, tiles: 5 },
];

/** 줄 하나가 한 바퀴 도는 데 걸리는 시간(초). 읽을 수 있을 만큼 느리게 —
    줄마다 값이 달라야 나란히 움직이지 않는다 */
const SPIN = [52, 68, 60, 76, 56];

/** 한 줄이 칸을 끊김 없이 덮는 데 필요한 최소 장수 — 이보다 적으면 흐르다 빈 자리가 보인다 */
const MIN_TILES = 3;

/**
 * 사진을 줄에 나눠 담는다. 한 장은 한 줄에만, 그 줄에 한 번만 들어간다.
 *
 * 줄 수를 고정해 놓고 모자란 만큼 사진을 돌려 채우면 같은 장이 두 줄에 함께 떠 있게
 * 된다. 줄마다 속도가 달라 언젠가는 나란히 서기까지 한다. 그래서 반대로, 가진 장수에
 * 맞춰 줄 수를 줄인다 — 여섯 장이면 두 줄에 세 장씩이지, 두 줄에 여섯 장씩이 아니다.
 */
function split(shots: string[], maxLanes: number, empty: number): (string | null)[][] {
  if (!shots.length) return Array.from({ length: maxLanes }, () => Array.from({ length: empty }, () => null));
  const lanes = Math.max(1, Math.min(maxLanes, Math.floor(shots.length / MIN_TILES)));
  const out: string[][] = Array.from({ length: lanes }, () => []);
  shots.forEach((s, i) => out[i % lanes].push(s));
  /* 한 줄을 채울 장수조차 안 되면 그 줄 안에서만 되풀이한다 — 달리 메울 방법이 없다 */
  return out.map((l) => (l.length >= MIN_TILES ? l : Array.from({ length: MIN_TILES }, (_, i) => l[i % l.length])));
}

/** 사진 한 장. 파일이 없거나 깨지면 이름만 적힌 자리로 남는다 */
function Shot({ src, label }: { src: string | null; label: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  /* 하이드레이션 전에 이미 실패한 그림은 onError 가 오지 않는다 */
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);
  if (!src || failed) return <span className="st-ph">{label}</span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />;
}

/** 한 줄 — 같은 칸을 두 벌 이어 붙여 끝이 처음과 만나게 한다 */
function Lane({ tiles, label, spin, back }: { tiles: (string | null)[]; label: string; spin: number; back?: boolean }) {
  return (
    <span className={`st-lane ${back ? "is-back" : ""}`} style={{ ["--spin" as string]: `${spin}s` }}>
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

/** 사진이 흐르는 칸. 결에 따라 세로 두 줄 · 누운 판 · 가로 두 줄이 된다 */
function Shots({ item, flow, lanes, tiles }: { item: Strength; flow: Flow; lanes: number; tiles: number }) {
  const body = split(item.shots, lanes, tiles).map((t, c) => (
    <Lane key={c} tiles={t} label={item.ph} spin={SPIN[c % SPIN.length]} back={c % 2 === 1} />
  ));
  return (
    <span className={`st-shots is-${flow}`}>
      {flow === "deck" ? <span className="st-plane">{body}</span> : body}
    </span>
  );
}

/** 한 칸 — 사진이 위, 번호와 제목이 아래. 글은 그 한 줄이 전부다 */
function Panel({ item, flow, lanes, tiles, delay }: { item: Strength; flow: Flow; lanes: number; tiles: number; delay: number }) {
  return (
    <article className="st-panel" style={{ transitionDelay: `${delay}s` }}>
      <Shots item={item} flow={flow} lanes={lanes} tiles={tiles} />
      <span className="st-top">
        <b className="st-num">{item.num}</b>
        <h3 className="st-title">{item.title}</h3>
      </span>
    </article>
  );
}

export default function Strengths() {
  const rootRef = useRef<HTMLElement>(null);

  /* 칸은 눈에 들어올 때 한 번만 올라온다 — 왼쪽이 먼저, 오른쪽이 한 박자 뒤 */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const panels = [...root.querySelectorAll<HTMLElement>(".st-panel")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panels.forEach((p) => p.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }),
      { threshold: 0.18 },
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" ref={rootRef} className="st-sec">
      <div className="st-views">
        {VIEWS.map((v, vi) => (
          <div className="st-view" key={vi}>
            {strengths.slice(vi * 2, vi * 2 + 2).map((item, i) => (
              <Panel key={item.num} item={item} flow={v.flow} lanes={v.lanes} tiles={v.tiles} delay={i * 0.12} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
