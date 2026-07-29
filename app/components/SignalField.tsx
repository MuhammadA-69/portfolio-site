"use client";

import { useEffect, useRef } from "react";

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame = 0;
    let elapsed = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const pointCount = Math.max(220, Math.floor(width * 0.55));
      for (let index = 0; index < pointCount; index += 1) {
        const seed = index / pointCount;
        const orbit = Math.sin(index * 0.71 + elapsed * 0.6);
        const wave = Math.cos(index * 0.16 - elapsed * 0.9);
        const x =
          width * seed +
          Math.sin(seed * Math.PI * 7 + elapsed * 0.35) * width * 0.055 +
          orbit * 7;
        const y =
          height * 0.5 +
          Math.sin(seed * Math.PI * 10 + elapsed) * height * 0.24 +
          wave * height * 0.1;
        const radius = index % 17 === 0 ? 2.2 : 0.9;

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle =
          index % 11 === 0
            ? "rgba(239, 165, 83, 0.9)"
            : "rgba(232, 226, 208, 0.58)";
        context.fill();
      }

      if (!reduceMotion) {
        elapsed += 0.009;
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}
