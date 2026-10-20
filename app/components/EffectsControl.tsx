"use client";

import { useSyncExternalStore } from "react";

const subscribe = (change: () => void) => {
  window.addEventListener("portfolio-motion-change", change);
  return () => window.removeEventListener("portfolio-motion-change", change);
};
const getSnapshot = () => document.documentElement.dataset.motion === "paused";
const getServerSnapshot = () => false;

export function EffectsControl() {
  const paused = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <button className="effects-control" type="button" aria-pressed={paused}
    onClick={() => {
      const next = !paused;
      document.documentElement.dataset.motion = next ? "paused" : "playing";
      window.dispatchEvent(new Event("portfolio-motion-change"));
    }}>{paused ? "Resume motion" : "Pause motion"}</button>;
}
