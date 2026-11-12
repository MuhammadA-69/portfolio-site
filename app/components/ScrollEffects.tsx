"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function ScrollEffects() {
 const pathname = usePathname();
 useEffect(() => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if (!entry.isIntersecting) return;
   entry.target.classList.add(entry.target.matches("figure, .selected-image, .project-image-link") ? "motion-picture" : "motion-copy");
   observer.unobserve(entry.target);
  }), { threshold: .12 });
  document.querySelectorAll(".selected-image, .project-caption, .selected-intro, .home-about figure, .home-about h2, .home-about p, .home-contact h2, .contact-email, .project-card, .case-intro, .gallery-grid figure, .timeline article").forEach(element => observer.observe(element));
  return () => observer.disconnect();
 }, [pathname]);
 return null;
}
