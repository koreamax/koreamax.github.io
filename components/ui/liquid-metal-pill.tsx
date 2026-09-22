"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * LiquidMetalButton 의 결을 그대로 쓰되 크기는 안에 담기는 내용이 정한다.
 *
 * 바깥 테두리에서 금속이 흐르고, 그 안쪽에 어두운 판이 앉고, 글은 그 위에 놓인다.
 * 누르는 버튼이 아니라 읽는 칸이라 hover · press 반응은 두지 않는다.
 */
export function LiquidMetalPill({ children, className = "" }: { children: ReactNode; className?: string }) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const shaderRef = useRef<HTMLSpanElement>(null);
  const mount = useRef<ShaderMount | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const el = shaderRef.current;
    if (!host || !el) return;

    const stop = () => {
      mount.current?.dispose?.();
      mount.current = null;
    };
    const start = () => {
      if (mount.current) return;
      try {
        mount.current = new ShaderMount(
          el,
          liquidMetalFragmentShader,
          {
            u_repetition: 14,
            u_softness: 0.35,
            u_shiftRed: 0.62,
            u_shiftBlue: 0.08,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 12,
            u_scale: 1.6,
            u_shape: 1,
            u_offsetX: 0,
            u_offsetY: 0,
          },
          undefined,
          0.35,
        );
      } catch {
        /* GL 이 없으면 그냥 어두운 판만 남는다 */
      }
    };

    /* 눈에 보일 때만 돌린다 — 넷이 한꺼번에 GL 을 물고 있으면 옆의 애니메이션이 끊긴다 */
    const io = new IntersectionObserver((es) => (es.some((e) => e.isIntersecting) ? start() : stop()), { threshold: 0.05 });
    io.observe(host);
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <span ref={hostRef} className={`lm-pill ${className}`}>
      <span ref={shaderRef} className="lm-shader" aria-hidden />
      <span className="lm-face" aria-hidden />
      <span className="lm-body">{children}</span>
    </span>
  );
}
