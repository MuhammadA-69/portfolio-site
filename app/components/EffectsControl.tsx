"use client";

import { useSyncExternalStore } from "react";
import { MotionIcon } from "./MotionIcon";

const subscribe = (change: () => void) => {
  window.addEventListener("portfolio-motion-change", change);
  return () => window.removeEventListener("portfolio-motion-change", change);
};
const getSnapshot = () => document.documentElement.dataset.motion === "paused";
const getServerSnapshot = () => false;

export function EffectsControl() {
  const paused = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <button className="effects-control" type="button" aria-pressed={paused}
    aria-label={paused ? "Resume motion" : "Pause motion"}
    title={paused ? "Resume motion" : "Pause motion"}
    onClick={() => {
      const next = !paused;
      document.documentElement.dataset.motion = next ? "paused" : "playing";
      window.dispatchEvent(new Event("portfolio-motion-change"));
    }}><MotionIcon paused={paused} /></button>;
}
