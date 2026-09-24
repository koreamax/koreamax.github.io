import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/**
 * 휠이나 손가락을 조금만 움직여도 다음 멈춤 자리까지 한 번에 넘어가게 한다.
 *
 * 멈춤 자리(스크롤 위치) 목록을 받아, 지금 위치가 두 멈춤 자리 사이에 있을 때만 입력을
 * 가로챈다 — 그 밖에서는 평소처럼 스크롤된다. 여러 구역이 따로 붙여도 넘어가는 중에는
 * 한 곳만 움직이도록 잠금을 함께 쓴다.
 */

let busy = false;

export function attachWheelSnap(getStops: () => number[], duration = 1.1) {
  const html = document.documentElement;

  /* 지금 위치에서 dir 방향으로 넘어갈 곳 — 멈춤 자리 사이 구간 밖이면 없음 */
  const target = (dir: number) => {
    const s = getStops();
    const y = window.scrollY;
    for (let i = 0; i < s.length - 1; i++) {
      const a = s[i];
      const b = s[i + 1];
      if (dir > 0 && y >= a - 2 && y < b - 2) return b;
      if (dir < 0 && y > a + 2 && y <= b + 2) return a;
    }
    return null;
  };
  const inZone = () => target(1) !== null || target(-1) !== null;

  const go = (to: number) => {
    busy = true;
    /* 사이트 전체의 부드러운 스크롤이 켜져 있으면 GSAP 가 매 프레임 옮기는 값과 싸운다 */
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    gsap.to(window, {
      scrollTo: to,
      duration,
      ease: "power2.inOut",
      overwrite: true,
      onComplete: () => {
        html.style.scrollBehavior = prev;
        /* 관성으로 남은 휠 입력이 곧바로 다음 넘김을 부르지 않게 잠깐 더 쉰다 */
        window.setTimeout(() => (busy = false), 250);
      },
    });
  };

  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) < 2) return;
    if (busy) {
      if (inZone()) e.preventDefault();
      return;
    }
    const to = target(Math.sign(e.deltaY));
    if (to === null) return;
    e.preventDefault();
    go(to);
  };
  let touchY = 0;
  const onTouchStart = (e: TouchEvent) => (touchY = e.touches[0]?.clientY ?? 0);
  const onTouchMove = (e: TouchEvent) => {
    const dy = touchY - (e.touches[0]?.clientY ?? touchY);
    if (busy) {
      if (inZone()) e.preventDefault();
      return;
    }
    if (Math.abs(dy) < 12) return;
    const to = target(Math.sign(dy));
    if (to === null) return;
    e.preventDefault();
    go(to);
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
  };
}
