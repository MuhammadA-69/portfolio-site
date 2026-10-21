"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AsciiPlanet.module.css";
import { ShaderBackdrop } from "./ShaderBackdrop";
import { MotionIcon } from "./MotionIcon";

const glyphs = " .,:;=+*#%@";

// An original, procedural character. No image, tracking service or 3D engine.
function terrain(x: number, y: number, z: number, time: number) {
  const longitude = Math.atan2(x, z) + time;
  const latitude = Math.asin(y);
  return Math.sin(latitude * 13 + Math.sin(longitude * 3) * 1.8) * 0.16 +
    Math.sin(longitude * 8 + latitude * 7) * 0.09;
}

function makeStill() {
  const rows: string[] = [];
  for (let y = -18; y <= 18; y++) {
    let row = "";
    for (let x = -34; x <= 34; x++) {
      const nx = x / 23;
      const ny = y / 16;
      const d = nx * nx + ny * ny;
      if (d > 1) { row += " "; continue; }
      const z = Math.sqrt(1 - d);
      const light = Math.max(0.08, -nx * 0.3 - ny * 0.35 + z * 0.7 + terrain(nx, ny, z, 0));
      row += glyphs[Math.min(9, Math.floor(light * 9))];
    }
    rows.push(row);
  }
  return rows.join("\n");
}

const still = makeStill();

export function AsciiPlanet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const actionRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [greeted, setGreeted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let previous = 0;
    let clock = 0;
    let winkUntil = 0;
    let lookX = 0;
    let lookY = 0;
    let targetX = 0;
    let targetY = 0;
    let reduced = media.matches;
    let touchPointer: number | null = null;
    const stage = canvas.closest("button");
    const stopped = () => reduced || paused || document.documentElement.dataset.motion === "paused";

    function draw() {
      if (!context || !canvas || !width || !height) return;
      context.clearRect(0, 0, width, height);
      const radius = Math.min(width * 0.265, height * 0.38);
      const cx = width * 0.5;
      const cy = height * 0.49;
      const cell = Math.max(5, width / 89);
      const cellY = cell * 1.34;
      context.font = `${cell * 1.12}px ui-monospace, monospace`; // taste-skill-ignore: user-requested ASCII artwork needs fixed-width glyphs.
      context.textAlign = "center";
      context.textBaseline = "middle";
      const angle = -0.32;
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);

      for (let py = -radius * 1.7; py <= radius * 1.7; py += cellY) {
        for (let px = -radius * 1.85; px <= radius * 1.85; px += cell) {
          const x = px / radius;
          const y = py / radius;
          const distance = x * x + y * y;
          const ringX = x * ca + y * sa;
          const ringY = -x * sa + y * ca;
          const ringDistance = Math.sqrt((ringX / 1.67) ** 2 + (ringY / 0.43) ** 2);
          const onRing = ringDistance > 0.89 && ringDistance < 1.08;
          const frontRing = ringY > 0.12;
          if (onRing && (distance > 1 || frontRing)) {
            const band = Math.sin(ringDistance * 160 + clock * 0.4);
            context.fillStyle = band > 0 ? "#eeeeea" : "#96968e";
            context.fillText(band > 0.4 ? "+" : ":", cx + px, cy + py);
          } else if (distance < 1) {
            const z = Math.sqrt(1 - distance);
            const light = Math.max(0.07, -x * 0.3 - y * 0.35 + z * 0.7 + terrain(x, y, z, clock * 0.09));
            const shade = Math.min(9, Math.floor(light * 9));
            context.fillStyle = light > 0.58 ? "#eeeeea" : light > 0.28 ? "#b5b5ab" : "#696961";
            context.fillText(glyphs[shade], cx + px, cy + py);
          }
        }
      }

      const blinking = !stopped() && clock % 5.8 > 5.64;
      const winking = performance.now() < winkUntil;
      [-1, 1].forEach((side) => {
        const eyeX = cx + side * radius * 0.25 + lookX * radius * 0.055;
        const eyeY = cy - radius * 0.13 + lookY * radius * 0.06;
        const closed = blinking || (winking && side === 1);
        const eyeHeight = radius * (closed ? 0.025 : 0.235);
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.roundRect(eyeX - radius * 0.055, eyeY - eyeHeight / 2,
          radius * 0.11, eyeHeight, radius * 0.055);
        context.fill();
      });
    }

    function tick(now: number) {
      frame = 0;
      if (!visible || document.hidden || stopped()) return;
      if (now - previous >= 1000 / 24) {
        clock += Math.min((now - previous) / 1000, 0.06);
        previous = now;
        lookX += (targetX - lookX) * 0.16;
        lookY += (targetY - lookY) * 0.16;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = performance.now();
      if (!visible || document.hidden) return;
      draw();
      if (!stopped()) frame = requestAnimationFrame(tick);
    }

    function resize() {
      if (!canvas || !context) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sync();
    }

    function onPointer(event: PointerEvent) {
      if (stopped() || !visible || !canvas) return;
      if (event.pointerType === "touch" && event.pointerId !== touchPointer) return;
      const rect = canvas.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width * 0.6)));
      targetY = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height * 0.6)));
    }

    function onTouchStart(event: PointerEvent) {
      if (event.pointerType !== "touch" || touchPointer !== null || stopped()) return;
      touchPointer = event.pointerId;
      onPointer(event);
      // Give even a short tap a visible response before its click-triggered wink.
      lookX = targetX;
      lookY = targetY;
      draw();
    }

    function onTouchEnd(event: PointerEvent) {
      if (event.pointerId !== touchPointer) return;
      touchPointer = null;
      resetLook();
    }

    function onMotion() { reduced = media.matches; sync(); }
    function resetLook() { targetX = 0; targetY = 0; }
    actionRef.current = () => {
      // A tap or keyboard activation works without requiring hover or sound.
      if (stopped()) return;
      winkUntil = performance.now() + 300;
      draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    intersection.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    stage?.addEventListener("pointerdown", onTouchStart, { passive: true });
    window.addEventListener("pointerup", onTouchEnd, { passive: true });
    window.addEventListener("pointercancel", onTouchEnd, { passive: true });
    document.addEventListener("pointerleave", resetLook);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", onMotion);
    window.addEventListener("portfolio-motion-change", sync);
    resize();
    setReady(true);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointer);
      stage?.removeEventListener("pointerdown", onTouchStart);
      window.removeEventListener("pointerup", onTouchEnd);
      window.removeEventListener("pointercancel", onTouchEnd);
      document.removeEventListener("pointerleave", resetLook);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", onMotion);
      window.removeEventListener("portfolio-motion-change", sync);
      actionRef.current = null;
    };
  }, [paused]);

  return (
    <figure className={styles.world}>
      <button className={styles.stage} type="button" aria-label="Say hello to the ASCII planet"
        onClick={() => { actionRef.current?.(); setGreeted((value) => !value); }}>
        <ShaderBackdrop variant={0.1} paused={paused} className={styles.atmosphere} />
        <pre className={`${styles.still} ${ready ? styles.hidden : ""}`} aria-hidden="true">{still}</pre>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      </button>
      <figcaption className={styles.caption}>
        <span aria-live="polite">{greeted ? "A little curiosity goes a long way." : "Different worlds. A little closer."}</span>
        <button type="button" className={`${styles.pause} motion-toggle`} aria-pressed={paused}
          aria-label={paused ? "Resume planet animation" : "Pause planet animation"}
          title={paused ? "Resume planet animation" : "Pause planet animation"}
          onClick={() => setPaused((value) => !value)}>
          <MotionIcon paused={paused} />
        </button>
      </figcaption>
    </figure>
  );
}
