import type { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * 스크롤이 전환 한가운데서 멈추면, 방금 굴리던 방향으로 전환을 끝까지 마저 보여 준다.
 *
 * 휠 입력은 가로채지 않는다 — 굴리는 동안은 평소 그대로고, 손을 뗀 뒤에만 가장 가까운
 * 쉼 자리(장면이 다 보이는 자리)까지 이어서 굴러간다. 걸리는 시간은 애니메이션이 빨라
 * 보이지 않도록 넉넉히 잡는다.
 *
 * points 는 0~1 진행도로 적은 쉼 자리들. 호출할 때마다 다시 읽는다.
 */
export function completeSnap(points: () => number[]): ScrollTrigger.SnapVars {
  const html = document.documentElement;
  let prev = "";
  /* 사이트 전체의 부드러운 스크롤이 켜져 있으면 GSAP 가 매 프레임 옮기는 값과 싸운다 — 굴러가는 동안만 끈다 */
  const off = () => {
    prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
  };
  const on = () => {
    html.style.scrollBehavior = prev;
  };
  return {
    snapTo: (value: number, self?: ScrollTrigger) => {
      const pts = points();
      const eps = 0.002;
      /* 굴리던 방향으로 — 아래로 굴리다 멈췄으면 다음 쉼 자리, 위로면 앞 쉼 자리 */
      if ((self?.direction ?? 1) > 0) return pts.find((p) => p >= value - eps) ?? pts[pts.length - 1];
      return [...pts].reverse().find((p) => p <= value + eps) ?? pts[0];
    },
    inertia: false,
    delay: 0.1,
    duration: { min: 1.2, max: 2.4 },
    ease: "power1.inOut",
    onStart: off,
    onComplete: on,
    onInterrupt: on,
  };
}
