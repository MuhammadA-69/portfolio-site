"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "alaminyushau234@gmail.com";

export function CopyEmail({
  email = EMAIL,
  className = "copy-email-button",
}: {
  email?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2400);
  }

  const tooltip =
    status === "copied"
      ? "Copied"
      : status === "error"
        ? email
        : "Copy email";

  return (
    <span className="copy-email-wrap">
      <button
        type="button"
        className={className}
        data-status={status}
        data-tooltip={tooltip}
        onClick={handleCopy}
        aria-label={
          status === "copied"
            ? `Copied ${email}`
            : `Copy email address ${email}`
        }
      >
        {status === "copied" ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 13 4 4L19 7" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {status === "copied"
          ? `Copied ${email} to clipboard.`
          : status === "error"
            ? `Copy unavailable. Email address is ${email}.`
            : ""}
      </span>
    </span>
  );
}
