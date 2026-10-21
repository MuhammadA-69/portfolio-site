export function MotionIcon({ paused }: { paused: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      {paused ? <path d="M8 4.5a1 1 0 0 0-1.5.87v13.26a1 1 0 0 0 1.5.87l11-6.63a1 1 0 0 0 0-1.74Z" /> :
        <><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></>}
    </svg>
  );
}
