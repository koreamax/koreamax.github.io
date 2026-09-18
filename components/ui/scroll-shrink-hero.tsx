"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 맨 위 화면의 스크롤 연출 컨트롤러.
 * 페이지 최상단에서 휠/터치로 스크롤하면 실제 스크롤 대신 진행도(0→1)를 올리고,
 * 진행도가 1이 되면 스크롤을 풀어 아래 본문으로 이어진다. 맨 위에서 다시 위로 올리면 되돌아온다.
 * 실제로 무엇을 어떻게 작아지게 할지는 children(progress) 렌더 함수에서 정한다.
 * (21st.dev ScrollExpandMedia 의 휠/터치 진행도 로직을 가져왔다)
 */
export default function ScrollShrinkHero({
  children,
  hint = "Scroll ↓",
}: {
  children: (progress: number) => ReactNode;
  hint?: string;
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  // 앵커 클릭 직후의 scroll 이벤트가 곧바로 맨 위로 되돌리지 않도록 동기적으로 읽는 값
  const doneRef = useRef(false);
  doneRef.current = done;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (done) {
        if (e.deltaY < 0 && window.scrollY <= 5) {
          setDone(false);
          e.preventDefault();
        }
        return;
      }
      if (progress <= 0 && e.deltaY < 0) return;
      e.preventDefault();
      const next = Math.min(Math.max(progress + e.deltaY * 0.0009, 0), 1);
      setProgress(next);
      if (next >= 1) setDone(true);
    };

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (done) {
        if (deltaY < -20 && window.scrollY <= 5) {
          setDone(false);
          e.preventDefault();
        }
        return;
      }
      if (progress <= 0 && deltaY < 0) {
        setTouchStartY(touchY);
        return;
      }
      e.preventDefault();
      const factor = deltaY < 0 ? 0.008 : 0.005;
      const next = Math.min(Math.max(progress + deltaY * factor, 0), 1);
      setProgress(next);
      if (next >= 1) setDone(true);
      setTouchStartY(touchY);
    };

    const handleTouchEnd = () => setTouchStartY(0);

    const handleScroll = () => {
      if (!doneRef.current && window.scrollY > 0) window.scrollTo(0, 0);
    };

    // 헤더의 섹션 링크: 잠금을 풀어 해당 위치로 실제 이동하게 한다
    const handleAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href") || "";
      if (hash.length < 2) return;
      if (hash === "#top") {
        // 로고를 누르면 처음 상태(펼쳐진 히어로)로 되돌린다
        e.preventDefault();
        doneRef.current = false;
        setDone(false);
        setProgress(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      doneRef.current = true;
      setDone(true);
      setProgress(1);
    };
    document.addEventListener("click", handleAnchor, true);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("click", handleAnchor, true);
    };
  }, [progress, done, touchStartY]);

  // 맨 위에서 다시 위로 올려 done 이 풀리면 원래 크기로
  useEffect(() => {
    if (!done && progress >= 1) setProgress(0);
  }, [done, progress]);

  return (
    <div style={{ position: "relative" }}>
      {children(progress)}
      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 14,
          textAlign: "right",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          opacity: 1 - Math.min(1, progress / 0.15),
          pointerEvents: "none",
        }}
      >
        {hint}
      </div>
    </div>
  );
}
