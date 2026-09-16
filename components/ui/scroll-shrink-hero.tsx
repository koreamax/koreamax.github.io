"use client";

import { useEffect, useState, type ReactNode } from "react";

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
      if (!done && window.scrollY > 0) window.scrollTo(0, 0);
    };

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
          left: 0,
          right: 0,
          bottom: 20,
          textAlign: "center",
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
