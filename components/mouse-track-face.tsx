"use client";

import { useEffect, useRef, useState, type CSSProperties, type Ref } from "react";

/**
 * 마우스를 따라 시선(눈)과 입만 살짝 움직이는 얼굴.
 *
 * 구현: WebGL 프래그먼트 셰이더로 원본 PNG 를 그대로 그리되, 눈/입 주변만
 * 부드러운 타원 마스크(feathered ellipse)만큼 픽셀을 '당겨서'(displacement) 샘플링한다.
 * 사각형 크롭을 옮기는 방식이 아니라 실제 픽셀 워프라서 경계가 보이지 않는다.
 * 얼굴·머리·머리 위 오브젝트는 마스크 밖이라 완전히 고정된다.
 *
 * 움직임: mousemove 에서는 목표 방향과 마우스 속도만 기록하고,
 * 하나의 requestAnimationFrame 루프에서 spring-damper 로 현재값이 목표를 따라간다.
 * 마우스 속도가 빠를수록 spring 이 단단해지고(빠른 반응) 감쇠가 줄어 살짝 overshoot 한다.
 * 눈이 먼저, 입이 아주 조금 늦게 따라온다.
 *
 * 마우스/호버가 없는 기기(모바일), prefers-reduced-motion, WebGL 미지원이면 평범한 <img> 로 그린다.
 */

interface Props {
  src: string;
  alt: string;
  /** 원본 이미지 픽셀 크기 (레이아웃 시프트 방지용) */
  width: number;
  height: number;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
  "data-hero-face"?: boolean | "";
}

/* 얼굴 랜드마크 (원본 이미지 픽셀 좌표, 1086×1448 기준) */
const LANDMARKS = {
  eyeL: [440, 737],
  eyeR: [655, 737],
  mouth: [548, 965],
} as const;

/* 최대 이동량 (화면 CSS px 기준) */
const MAX = { eyeX: 11, eyeY: 5.5, mouthX: 5, mouthY: 2.5 };
const HARD = { eyeX: 13, eyeY: 7, mouthX: 6, mouthY: 3 };

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uImg;
uniform vec2 uEyeL;
uniform vec2 uEyeR;
uniform vec2 uMouth;
uniform vec2 uEyeOff;
uniform vec2 uMouthOff;

/* 타원 안쪽(inner 이하)은 1, 가장자리(1.0)까지 부드럽게 0 으로 */
float fall(vec2 p, vec2 c, vec2 r, float inner){
  vec2 q = (p - c) / r;
  float d = length(q);
  return 1.0 - smoothstep(inner, 1.0, d);
}

/* 눈: 넓은 눈 영역은 절반만, 홍채 부근은 전부 따라가서 '시선이 움직이는' 느낌 */
float eyeW(vec2 p, vec2 c){
  return 0.35 * fall(p, c, vec2(120.0, 64.0), 0.12) + 0.65 * fall(p, c, vec2(40.0, 32.0), 0.45);
}

void main(){
  vec2 p = vUv * uImg;
  float we = eyeW(p, uEyeL) + eyeW(p, uEyeR);
  float wm = fall(p, uMouth, vec2(150.0, 60.0), 0.3);
  vec2 d = uEyeOff * we + uMouthOff * wm;
  vec2 uv = (p - d) / uImg;
  gl_FragColor = texture2D(uTex, uv);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("[mouse-track-face] shader error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

interface Spring {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/** 감쇠 스프링 한 스텝 (semi-implicit Euler, 안정성을 위해 서브스텝) */
function stepSpring(s: Spring, tx: number, ty: number, k: number, zeta: number, dt: number) {
  const c = 2 * zeta * Math.sqrt(k);
  const n = Math.max(1, Math.ceil(dt / (1 / 120)));
  const h = dt / n;
  for (let i = 0; i < n; i++) {
    const ax = k * (tx - s.x) - c * s.vx;
    const ay = k * (ty - s.y) - c * s.vy;
    s.vx += ax * h;
    s.vy += ay * h;
    s.x += s.vx * h;
    s.y += s.vy * h;
  }
}

export default function MouseTrackFace({ src, alt, width, height, style, ref, ...rest }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"static" | "gl">("static");

  // 외부 ref 와 내부 ref 를 함께 연결
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") ref(wrapRef.current);
    else (ref as { current: HTMLDivElement | null }).current = wrapRef.current;
  }, [ref]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;
    setMode("gl");
  }, []);

  useEffect(() => {
    if (mode !== "gl") return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, preserveDrawingBuffer: false });
    if (!gl) {
      setMode("static");
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setMode("static");
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("[mouse-track-face] link error:", gl.getProgramInfoLog(prog));
      setMode("static");
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {
      img: gl.getUniformLocation(prog, "uImg"),
      eyeL: gl.getUniformLocation(prog, "uEyeL"),
      eyeR: gl.getUniformLocation(prog, "uEyeR"),
      mouth: gl.getUniformLocation(prog, "uMouth"),
      eyeOff: gl.getUniformLocation(prog, "uEyeOff"),
      mouthOff: gl.getUniformLocation(prog, "uMouthOff"),
      tex: gl.getUniformLocation(prog, "uTex"),
    };
    gl.uniform2f(U.img, width, height);
    gl.uniform2f(U.eyeL, LANDMARKS.eyeL[0], LANDMARKS.eyeL[1]);
    gl.uniform2f(U.eyeR, LANDMARKS.eyeR[0], LANDMARKS.eyeR[1]);
    gl.uniform2f(U.mouth, LANDMARKS.mouth[0], LANDMARKS.mouth[1]);
    gl.uniform1i(U.tex, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.disable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);

    let ready = false;
    let disposed = false;
    let dirty = true;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      ready = true;
      dirty = true;
      // 첫 프레임을 그린 뒤에야 정적 이미지를 숨겨 깜빡임이 없게 한다
      render();
      const still = wrap.querySelector("img");
      if (still) still.style.visibility = "hidden";
    };
    img.onerror = () => setMode("static");
    img.src = src;

    /* ── 캔버스 크기 (DPR 반영, 레이아웃 크기 기준) ── */
    let cssW = 0;
    let cssH = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = wrap.clientWidth;
      cssH = wrap.clientHeight;
      const w = Math.max(1, Math.round(cssW * dpr));
      const h = Math.max(1, Math.round(cssH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        dirty = true;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* ── 입력: 방향 목표 + 속도만 기록 ── */
    let targetX = 0; // -1..1
    let targetY = 0;
    let active = false;
    let speedSm = 0; // px/ms, 부드럽게 평활화
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;

    const onMove = (e: MouseEvent) => {
      const now = e.timeStamp;
      if (lastT) {
        const dt = Math.max(1, now - lastT);
        const inst = Math.min(6, Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt);
        speedSm += (inst - speedSm) * 0.35;
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;

      // 얼굴(눈높이) 중심 기준 정규화 방향. transform 의 영향을 받지 않도록 실제 rect 사용
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width * 0.5;
      const cy = r.top + r.height * (LANDMARKS.eyeL[1] / height);
      const rangeX = clamp(window.innerWidth * 0.4, 260, 900);
      const rangeY = clamp(window.innerHeight * 0.45, 200, 600);
      targetX = clamp((e.clientX - cx) / rangeX, -1, 1);
      targetY = clamp((e.clientY - cy) / rangeY, -1, 1);
      active = true;
    };
    const onLeave = () => {
      // 화면 밖: 천천히 정면으로
      active = false;
      targetX = 0;
      targetY = 0;
      lastT = 0;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    /* ── 애니메이션 루프 ── */
    const eye: Spring = { x: 0, y: 0, vx: 0, vy: 0 };
    const mouth: Spring = { x: 0, y: 0, vx: 0, vy: 0 };
    let prev = performance.now();
    let raf = 0;

    const render = () => {
      if (!ready) return;
      // 화면 px → 원본 이미지 px
      const s = cssH > 0 ? height / cssH : 1;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.eyeOff, eye.x * s, eye.y * s);
      gl.uniform2f(U.mouthOff, mouth.x * s, mouth.y * s);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, Math.max(0.001, (now - prev) / 1000));
      prev = now;

      // 마우스가 멈추면 속도 평활값이 서서히 내려간다
      speedSm *= Math.exp(-dt / 0.25);
      const f = clamp(speedSm / 2.2, 0, 1); // 0 = 느림, 1 = 빠름

      let tEx: number;
      let tEy: number;
      let tMx: number;
      let tMy: number;
      let kE: number;
      let zE: number;
      let kM: number;
      let zM: number;
      if (active) {
        const boost = 1 + 0.15 * f; // 빠르게 휙 움직이면 순간적으로 조금 더 크게
        tEx = clamp(targetX * MAX.eyeX * boost, -HARD.eyeX, HARD.eyeX);
        tEy = clamp(targetY * MAX.eyeY * boost, -HARD.eyeY, HARD.eyeY);
        tMx = clamp(targetX * MAX.mouthX * boost, -HARD.mouthX, HARD.mouthX);
        tMy = clamp(targetY * MAX.mouthY * boost, -HARD.mouthY, HARD.mouthY);
        kE = 70 + 280 * f; // 느리면 부드럽게, 빠르면 단단하게
        zE = 1.0 - 0.38 * f; // 빠를수록 감쇠를 줄여 살짝 overshoot
        kM = 45 + 130 * f; // 입은 조금 늦게
        zM = 1.05;
      } else {
        tEx = tEy = tMx = tMy = 0;
        kE = 38; // ≈ 0.5s 에 걸쳐 정면 복귀
        zE = 1.0;
        kM = 30;
        zM = 1.0;
      }
      stepSpring(eye, tEx, tEy, kE, zE, dt);
      stepSpring(mouth, tMx, tMy, kM, zM, dt);

      const moving =
        Math.abs(eye.vx) + Math.abs(eye.vy) + Math.abs(mouth.vx) + Math.abs(mouth.vy) > 0.02 ||
        Math.abs(eye.x - tEx) + Math.abs(eye.y - tEy) + Math.abs(mouth.x - tMx) + Math.abs(mouth.y - tMy) > 0.02;
      if (moving || dirty) {
        render();
        dirty = false;
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [mode, src, width, height]);

  return (
    <div
      ref={wrapRef}
      {...rest}
      style={{
        position: "relative",
        height: "100%",
        aspectRatio: `${width} / ${height}`,
        ...style,
      }}
    >
      {/* 정적 원본: 모바일/감소된 동작/WebGL 실패 시 그대로 보이고, GL 모드에서는 텍스처 준비 전까지 보인다 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          userSelect: "none",
          visibility: mode === "gl" ? "hidden" : "visible",
        }}
      />
      {mode === "gl" && (
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        />
      )}
    </div>
  );
}
