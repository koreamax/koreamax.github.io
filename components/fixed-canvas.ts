/**
 * 어디서 보든 같은 화면.
 *
 * 이 사이트는 가로 1440px 로 그려진 한 장의 도면이다. 실제 창이 얼마나 넓든
 * 그 도면을 창 너비에 맞게 통째로 확대·축소해서 보여준다. 그래서 큰 모니터에서는
 * 같은 화면이 크게, 좁은 화면에서는 작게 나올 뿐 배치와 비율은 늘 같다.
 *
 * 배율은 CSS `zoom` 으로 준다. transform 과 달리 레이아웃 단계에서 적용되므로
 * 좌표를 재는 코드(스크롤 트리거, 화면 감지)가 그대로 동작한다. 다만 vw·vh 만은
 * 확대와 무관하게 실제 창을 가리키므로, 도면 좌표로 바꾼 --vw / --vh 를 대신 쓴다.
 *
 * 값을 바꾸고 싶다면 DESIGN_W 하나만 고치면 된다. 단, app/layout.tsx 의
 * 첫 페인트 전 스크립트도 이 값을 함께 쓴다.
 */

/** 도면의 가로 폭(px). 이 폭에서 보이는 모습이 모든 화면의 기준이 된다. */
export const DESIGN_W = 1440;

/** 도면의 세로 기준(px). 화면을 채우는 구간이 아니라 내용물 높이를 잴 때 쓴다. */
export const DESIGN_H = 860;

/**
 * 이 폭보다 좁으면 고정 도면을 포기하고 원래의 반응형(세로로 쌓는) 화면으로 돌아간다.
 * 0 이면 어떤 화면에서도 고정 도면을 쓴다 — 지금은 이 쪽이다.
 * 휴대폰 글씨가 너무 작다면 640 정도를 넣으면 된다.
 */
export const FLOW_BELOW = 0;

/**
 * 도면 좌표에서 본 창 크기.
 * 가로는 언제나 DESIGN_W 이고, 세로는 창의 가로세로비에 따라 달라진다.
 */
export function designViewport(): { w: number; h: number } {
  if (typeof window === "undefined") return { w: DESIGN_W, h: DESIGN_H };
  const d = document.documentElement;
  const real = d.clientWidth || window.innerWidth;
  // 고정 도면을 쓰지 않는 화면(좁거나, zoom 을 모르는 브라우저)에서는 창이 곧 도면이다
  if (!d.classList.contains("fixed-canvas")) return { w: real, h: window.innerHeight };
  const z = real / DESIGN_W;
  return { w: DESIGN_W, h: window.innerHeight / z };
}
