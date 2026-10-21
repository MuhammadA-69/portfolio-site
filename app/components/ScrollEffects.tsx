"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: server-rendered text is always readable without JS. */
export function ScrollEffects() {
  const pathname = usePathname();
  const fade = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = new Set<HTMLElement>();
    const disabled = () => reduced.matches || document.documentElement.dataset.motion === "paused";
    const reveal = (element: HTMLElement) => {
      element.classList.add("accordion-visible");
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
    }, { rootMargin: "0px 0px -3% 0px", threshold: 0 });
    const register = () => {
      document.querySelectorAll<HTMLElement>("main h2, main h3, main p").forEach((element) => {
        if (elements.has(element) || element.closest("dialog, [aria-hidden='true']")) return;
        elements.add(element);
        if (disabled() || element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add("accordion-reveal");
        observer.observe(element);
      });
    };
    const showAll = () => { if (disabled()) elements.forEach(reveal); };
    const focusReveal = (event: FocusEvent) => {
      if (event.target instanceof Element) {
        const element = event.target.closest<HTMLElement>(".accordion-reveal");
        if (element) reveal(element);
      }
    };
    register();
    const mutations = new MutationObserver(register);
    const main = document.querySelector("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    reduced.addEventListener("change", showAll);
    window.addEventListener("portfolio-motion-change", showAll);
    document.addEventListener("focusin", focusReveal);

    const footer = document.querySelector("footer");
    const fadeElement = fade.current;
    const footerObserver = new IntersectionObserver(([entry]) => {
      if (fade.current) fade.current.dataset.hidden = String(entry.isIntersecting);
    });
    if (fade.current) fade.current.dataset.hidden = "false";
    if (footer) footerObserver.observe(footer);
    return () => {
      observer.disconnect(); mutations.disconnect(); footerObserver.disconnect();
      reduced.removeEventListener("change", showAll);
      window.removeEventListener("portfolio-motion-change", showAll);
      document.removeEventListener("focusin", focusReveal);
      elements.forEach((element) => element.classList.remove("accordion-reveal", "accordion-visible"));
      if (fadeElement) fadeElement.dataset.hidden = "true";
    };
  }, [pathname]);

  return <div ref={fade} className="viewport-fade" data-hidden="true" aria-hidden="true" />;
}
