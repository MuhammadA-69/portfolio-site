import Link from "next/link";
import { sitePath } from "../site-path";

export function SiteFooter() {
  return (
    <footer className="site-footer page-shell">
      <div className="footer-brand">
        <Link
          className="wordmark"
          href="/"
          aria-label="Muhammad Al-amin Yusha'u, home"
        >
          M.A.Y.
        </Link>
        <p>
          Abuja, Nigeria
          <br />© {new Date().getFullYear()} Muhammad Al-amin Yusha’u
        </p>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <a
          href={sitePath("/downloads/muhammad-alamin-yushau-cv.pdf")}
          target="_blank"
          rel="noreferrer"
          aria-label="CV PDF — opens in new tab"
        >
          CV (PDF)
        </a>
      </nav>
      <div className="footer-links">
        <a href="mailto:alaminyushau234@gmail.com" aria-label="Email">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/muhammad-yusha-u-732a8921b/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M5.3 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.5 9h3.6v12H3.5zM9.5 9h3.4v1.6h.1A3.8 3.8 0 0 1 16.4 8c3.6 0 4.1 2.3 4.1 5.3V21h-3.6v-6.8c0-1.6 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4V21H9.5z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/alameenyushh"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
