"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sitePath } from "../site-path";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const toggleButton = toggleRef.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const background = [
      ...document.querySelectorAll<HTMLElement>("main, footer"),
    ].map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => {
      element.inert = true;
    });

    const focusable = () =>
      [
        ...(menuRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? []),
      ].filter((element) => element.tabIndex >= 0);

    menuRef.current
      ?.querySelector<HTMLButtonElement>(".mobile-menu-close")
      ?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "Tab") {
        const controls = focusable();
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    const closeOnDesktop = () => {
      if (window.innerWidth > 820) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      if (toggleButton?.getClientRects().length) toggleButton.focus();
      else if (previouslyFocused?.getClientRects().length)
        previouslyFocused.focus();
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header" inert={menuOpen}>
        <Link
          className="wordmark"
          href="/"
          aria-label="Muhammad Al-amin Yusha'u, home"
        >
          M.A.Y.
        </Link>
        <nav aria-label="Primary navigation">
          <Link
            href="/work"
            aria-current={pathname.startsWith("/work") ? "page" : undefined}
          >
            Work
          </Link>
          <Link
            href="/about"
            aria-current={pathname.startsWith("/about") ? "page" : undefined}
          >
            About
          </Link>
          <a
            href={sitePath("/downloads/muhammad-alamin-yushau-cv.pdf")}
            target="_blank"
            rel="noreferrer"
            aria-label="CV PDF — opens in new tab"
          >
            CV <span className="nav-badge" aria-hidden="true">PDF</span>
          </a>
        </nav>
        <a
          className="header-contact"
          href="mailto:alaminyushau234@gmail.com"
          aria-label="Start a conversation"
          data-tooltip="Say hello"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-4.5 3.2a.4.4 0 0 1-.5-.3V6.5Z" />
            <path d="M8.5 9.5h7M8.5 13h4.5" />
          </svg>
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>
      <div
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
        id="mobile-menu"
        role="dialog"
        aria-modal={menuOpen ? true : undefined}
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-menu-top">
          <Link
            className="wordmark"
            href="/"
            aria-label="Muhammad Al-amin Yusha'u, home"
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
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Home
          </Link>
          <Link
            href="/work"
            aria-current={pathname.startsWith("/work") ? "page" : undefined}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Work
          </Link>
          <Link
            href="/about"
            aria-current={pathname.startsWith("/about") ? "page" : undefined}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            About
          </Link>
          <a
            href={sitePath("/downloads/muhammad-alamin-yushau-cv.pdf")}
            target="_blank"
            rel="noreferrer"
            aria-label="CV PDF — opens in new tab"
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
    </>
  );
}
