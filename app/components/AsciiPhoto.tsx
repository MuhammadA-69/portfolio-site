"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

type OverlayProps = {
  image: string;
  cellSize: number;
  opacity: number;
  whitening: number;
  scroll: boolean;
  reshuffleRate: number;
  jitter: number;
  charGap: number;
};
// The supplied JSX's property-level JSDoc is inferred as a positional string
// parameter by TypeScript. Keep the upstream file and type this boundary.
const Overlay = dynamic<OverlayProps>(() => import("./annnimate/ascii-overlay")
  .then((module) => module.default as unknown as ComponentType<OverlayProps>), { ssr: false });

class EffectFallback extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** The photograph always exists beneath the optional, lazy-loaded shader. */
export function AsciiPhoto({ image }: { image: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setAllowed(!media.matches && !document.hidden && document.documentElement.dataset.motion !== "paused" && "WebGLRenderingContext" in window);
    check();
    media.addEventListener("change", check);
    document.addEventListener("visibilitychange", check);
    window.addEventListener("portfolio-motion-change", check);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", check);
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("portfolio-motion-change", check);
    };
  }, []);

  return (
    <div ref={root} className="ascii-photo-layer">
      {allowed && visible && enabled && !failed && (
        <EffectFallback key={image} onFailure={() => setFailed(true)}>
          <Overlay image={image} cellSize={7} opacity={0.55} whitening={0.25}
            scroll={false} reshuffleRate={0.12} jitter={0.15} charGap={0.45} />
        </EffectFallback>
      )}
      {allowed && !failed && <button className="ascii-photo-toggle" type="button" aria-pressed={enabled}
        onClick={() => setEnabled((value) => !value)}>
        {enabled ? "Original photo" : "ASCII texture"}
      </button>}
    </div>
  );
}
