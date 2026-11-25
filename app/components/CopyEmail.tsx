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
    timer.current = window.setTimeout(() => setStatus("idle"), 2600);
  }

  return (
    <span className="copy-email-wrap">
      <button
        type="button"
        className={className}
        onClick={handleCopy}
        aria-label={
          status === "copied"
            ? `Copied ${email}`
            : `Copy email address ${email}`
        }
      >
        {status === "copied"
          ? "Email copied"
          : status === "error"
            ? email
            : "Copy email"}
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
