"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import gsap from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * LiquidMetalButton 의 결을 그대로 쓰되 크기는 안에 담기는 내용이 정한다.
 *
 * 바깥 테두리에서 금속이 흐르고, 그 안쪽에 어두운 판이 앉고, 글은 그 위에 놓인다.
 * 누르는 버튼은 아니지만 마우스를 올리면 테두리가 더 빨리 흐른다.
 */

/** 가만히 있을 때 — 테두리가 천천히 돈다 */
const SPEED = 0.35;
/** 마우스를 올렸을 때 — 눈에 띄게 빨라진다 */
const SPEED_HOVER = 1.7;

/** 칸 하나마다 앞당겨 띄우는 시간(ms). 한 바퀴(약 3.3초)의 약 5분의 2 */
const PHASE = 1370;
/** 그 위에 한 번 더 얹는 들쭉날쭉한 시간 — 등간격이면 그것대로 규칙이 보인다 */
const LEAN = [0, 420, 910, 230];

/* 셰이더가 칸 전체를 덮게 하는 값.
   원 모양 마스크는 기본값이면 상자 한쪽에 치우쳐 앉아 테두리의 일부만 금속이 되고
   나머지는 맨 판으로 남는다. 가운데(origin 0.5)에 놓고 긴 변에 맞춰(cover) 키운 뒤
   1보다 큰 scale 로 한 번 더 넓혀야 네 귀퉁이까지 원 안에 들어온다. */
const FILL = {
  u_originX: 0.5,
  u_originY: 0.5,
  u_worldWidth: 0,
  u_worldHeight: 0,
  u_rotation: 0,
  u_fit: 2, // cover
  u_scale: 1.25,
} as const;

export function LiquidMetalPill({ children, className = "" }: { children: ReactNode; className?: string }) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const shaderRef = useRef<HTMLSpanElement>(null);
  const mount = useRef<ShaderMount | null>(null);
  /* 올리고 내릴 때마다 뚝 끊기지 않도록 속도를 조금씩 밀어 올린다 */
  const speed = useRef({ v: SPEED });

  useEffect(() => {
    const host = hostRef.current;
    const el = shaderRef.current;
    if (!host || !el) return;
    const spd = speed.current;

    const stop = () => {
      mount.current?.dispose?.();
      mount.current = null;
    };
    const start = () => {
      if (mount.current) return;
      /* 네 칸이 같은 지점에서 출발하면 무늬가 한 몸처럼 같이 움직여 인쇄물처럼 보인다.
         제 순서만큼 시간을 앞당겨 띄워 저마다 다른 데서 흐르게 한다. 무늬가 한 바퀴
         도는 데 약 3.3초라, 칸 수로 나누지 않고 어긋난 간격을 줘야 겹치지 않는다. */
      const nth = [...document.querySelectorAll(".lm-pill")].indexOf(host);
      const offset = (nth < 0 ? 0 : nth) * PHASE + (LEAN[(nth < 0 ? 0 : nth) % LEAN.length] ?? 0);
      try {
        mount.current = new ShaderMount(
          el,
          liquidMetalFragmentShader,
          {
            ...FILL,
            u_repetition: 9,
            u_softness: 0.3,
            u_shiftRed: 0.62,
            u_shiftBlue: 0.08,
            u_distortion: 0,
            u_contour: 0,
            /* 흐르는 방향도 칸마다 조금씩 틀어 같은 무늬로 읽히지 않게 한다 */
            u_angle: 12 + (nth < 0 ? 0 : nth % LEAN.length) * 9,
            u_shape: 1,
            u_offsetX: 0,
            u_offsetY: 0,
          },
          undefined,
          spd.v,
          offset,
        );
      } catch {
        /* GL 이 없으면 그냥 어두운 판만 남는다 */
      }
    };

    const ramp = (to: number) =>
      gsap.to(spd, {
        v: to,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => mount.current?.setSpeed(spd.v),
      });
    const enter = () => ramp(SPEED_HOVER);
    const leave = () => ramp(SPEED);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);

    /* 눈에 보일 때만 돌린다 — 넷이 한꺼번에 GL 을 물고 있으면 옆의 애니메이션이 끊긴다 */
    const io = new IntersectionObserver((es) => (es.some((e) => e.isIntersecting) ? start() : stop()), { threshold: 0.05 });
    io.observe(host);
    return () => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(spd);
      spd.v = SPEED;
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
