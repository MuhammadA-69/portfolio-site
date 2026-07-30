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
    let elapsed = reduceMotion ? 2.8 : 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawSignal = (
      width: number,
      height: number,
      direction: 1 | -1,
      depth: number,
    ) => {
      const center = height * 0.5;
      const steps = Math.max(180, Math.floor(width / 3));

      context.beginPath();
      for (let index = 0; index <= steps; index += 1) {
        const progress = index / steps;
        const convergence = Math.pow(1 - progress, 1.65);
        const interference =
          Math.sin(progress * Math.PI * 7.5 - elapsed * 1.45 + depth * 0.42) *
            0.72 +
          Math.sin(progress * Math.PI * 17 + elapsed * 0.72 + direction) *
            0.28;
        const perspective = depth * (1 - progress) * 7;
        const x = progress * width;
        const y =
          center +
          direction * interference * height * 0.27 * convergence +
          perspective;

        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      const opacity = Math.max(0.12, 0.82 - depth * 0.16);
      context.strokeStyle =
        direction === 1
          ? `rgba(255, 255, 212, ${opacity})`
          : `rgba(0, 0, 43, ${opacity})`;
      context.lineWidth = depth === 0 ? 2.4 : 1;
      context.stroke();
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(0.72, "rgba(0, 0, 43, 0.04)");
      gradient.addColorStop(1, "rgba(0, 0, 43, 0.11)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      for (let depth = 4; depth >= 0; depth -= 1) {
        drawSignal(width, height, 1, depth);
        drawSignal(width, height, -1, depth);
      }

      context.beginPath();
      context.moveTo(width * 0.82, height * 0.5);
      context.lineTo(width, height * 0.5);
      context.strokeStyle = "rgba(0, 0, 43, 0.94)";
      context.lineWidth = 3;
      context.stroke();

      context.beginPath();
      context.arc(width * 0.82, height * 0.5, 4.5, 0, Math.PI * 2);
      context.fillStyle = "#ffffd4";
      context.fill();

      if (!reduceMotion) {
        elapsed += 0.018;
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

  return (
    <canvas
      ref={canvasRef}
      className="signal-canvas"
      aria-hidden="true"
    />
  );
}
