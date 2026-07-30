"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sitePath } from "../site-path";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 820) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`site-header ${menuOpen ? "site-header-menu-open" : ""}`}
    >
      <Link className="wordmark" href="/" aria-label="Muhammad Al-amin Yusha'u, home">
        M.A.Y.
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <a href={sitePath("/downloads/muhammad-alamin-yushau-cv.pdf")}>CV</a>
      </nav>
      <a className="header-contact" href="mailto:alaminyushau234@gmail.com">
        Start a conversation
      </a>
      <button
        className={`menu-toggle ${menuOpen ? "menu-toggle-open" : ""}`}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-top">
          <Link
            className="wordmark wordmark-light"
            href="/"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            M.A.Y.
          </Link>
          <button
            className="mobile-menu-close"
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <Link href="/work" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            Work
          </Link>
          <Link href="/about" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            About
          </Link>
          <a
            href={sitePath("/downloads/muhammad-alamin-yushau-cv.pdf")}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            CV
          </a>
        </nav>
        <div className="mobile-menu-contact">
          <a
            href="mailto:alaminyushau234@gmail.com"
            tabIndex={menuOpen ? 0 : -1}
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-yusha-u-732a8921b/"
            target="_blank"
            rel="noreferrer"
            tabIndex={menuOpen ? 0 : -1}
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/alameenyushh"
            target="_blank"
            rel="noreferrer"
            tabIndex={menuOpen ? 0 : -1}
          >
            Instagram
          </a>
        </div>
      </div>
    </header>
  );
}
