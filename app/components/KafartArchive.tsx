"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "../portfolio-data";
import { CaseGallery } from "./CaseGallery";

export type ArchiveSection = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  images: ProjectImage[];
};

export function KafartArchive({ sections }: { sections: ArchiveSection[] }) {
  const [activeId, setActiveId] = useState(sections[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      if (sections.some((section) => section.id === hash)) {
        setActiveId(hash);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            containerRef.current?.scrollIntoView({
              behavior: "auto",
              block: "start",
            });
          });
        });
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [sections]);

  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeId),
  );
  const current = sections[activeIndex] ?? sections[0];
  const totalItems = sections.reduce((sum, s) => sum + s.images.length, 0);

  function selectTab(id: string) {
    setActiveId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      (index + (event.key === "ArrowRight" ? 1 : -1) + sections.length) %
      sections.length;
    selectTab(sections[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      ref={containerRef}
      id="kafart-archive"
      className="page-shell kafart-archive section-block"
      aria-labelledby="kafart-archive-heading"
    >
      {/* Hidden anchor targets preserve deep links for every archive category */}
      {sections.map((section) => (
        <span
          key={section.id}
          id={section.id}
          className="archive-anchor"
          aria-hidden="true"
        />
      ))}

      <div className="archive-header">
        <div>
          <p className="eyebrow">Production archive</p>
          <h2 id="kafart-archive-heading">Design &amp; programme archive</h2>
        </div>
        <p className="archive-summary tabular">
          {totalItems} artefacts across {sections.length} collections
        </p>
      </div>

      <div
        className="archive-tabs"
        role="tablist"
        aria-label="KAFART archive collections"
      >
        {sections.map((section, index) => {
          const selected = section.id === current.id;
          return (
            <button
              key={section.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`tab-${section.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${section.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(section.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {section.label}{" "}
              <span className="tabular" aria-hidden="true">
                ({section.images.length})
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="archive-panel"
      >
        <CaseGallery
          key={current.id}
          images={current.images}
          title={current.title}
          id={`${current.id}-heading`}
          subtitle={current.subtitle}
          embedded
        />
      </div>
    </section>
  );
}
