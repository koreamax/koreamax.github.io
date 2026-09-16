"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 맨 위 화면(얼굴 히어로)을 감싸는 스크롤 연출.
 * 처음엔 화면을 꽉 채운 상태로 보이고, 휠/터치로 스크롤하면 그 화면 전체가
 * 작아지면서 아래로 내려온다. 완전히 작아지면 스크롤을 풀어 아래 본문으로 이어진다.
 * (21st.dev ScrollExpandMedia 의 휠/터치 진행도 로직을 가져와 방향만 반대로 쓴다)
 */
export default function ScrollShrinkHero({
  children,
  hint = "Scroll ↓",
  minScale = 0.34,
  sinkVh = 14,
}: {
  children: ReactNode;
  hint?: string;
  minScale?: number;
  sinkVh?: number;
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (done) {
        // 다 작아진 뒤 맨 위에서 다시 위로 올리면 원래 크기로 되돌아간다
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

  // done 이 풀리면(맨 위에서 다시 위로) 원래 크기로
  useEffect(() => {
    if (!done && progress >= 1) setProgress(0);
  }, [done, progress]);

  const p = progress;
  const scale = 1 - p * (1 - minScale);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        // 화면이 작아지는 만큼 이 구간의 높이도 줄어 아래 본문이 따라 올라온다
        height: `calc(100vh - ${p * 38}vh)`,
        minHeight: 320,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          transformOrigin: "50% 0%",
          transform: `translateY(${p * sinkVh}vh) scale(${scale})`,
          borderRadius: p * 24,
          overflow: "hidden",
          boxShadow: p > 0 ? `0 ${20 * p}px ${60 * p}px rgba(0,0,0,${0.55 * p})` : "none",
          willChange: "transform",
        }}
      >
        {children}
        <div style={{ position: "absolute", inset: 0, background: "#000", opacity: p * 0.35, pointerEvents: "none" }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 24,
          textAlign: "center",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          opacity: 1 - Math.min(1, p / 0.15),
          pointerEvents: "none",
        }}
      >
        {hint}
      </div>
    </div>
  );
}
