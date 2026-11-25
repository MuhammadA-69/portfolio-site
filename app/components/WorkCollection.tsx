"use client";

import { useEffect, useState } from "react";
import type { Project } from "../portfolio-data";
import { ProjectCard } from "./ProjectCard";

const categories = [
  "All",
  "Culture",
  "Communications",
  "Technology",
  "Design",
  "Writing",
] as const;

type Category = (typeof categories)[number];

const groups: Record<string, Category[]> = {
  "creative-work": ["Design", "Culture"],
  hibaf: ["Culture", "Communications", "Technology", "Design"],
  kafart: ["Culture", "Communications", "Technology", "Design"],
  "subject-to-climate": ["Communications"],
  "northern-creatives-conference": ["Culture", "Communications", "Writing"],
  "editorial-work": ["Culture", "Writing"],
  alama: ["Culture", "Technology"],
  budanza: ["Design"],
};

function parseFilterParam(raw: string | null): Category {
  if (!raw) return "All";
  const matched = categories.find(
    (category) => category.toLowerCase() === raw.toLowerCase(),
  );
  return matched ?? "All";
}

export function WorkCollection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Category>("All");

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setFilter(parseFilterParam(params.get("discipline")));
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  function selectFilter(next: Category) {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "All") {
      url.searchParams.delete("discipline");
    } else {
      url.searchParams.set("discipline", next.toLowerCase());
    }
    window.history.replaceState(null, "", url.toString());
  }

  const visible = projects.filter(
    (project) => filter === "All" || groups[project.slug]?.includes(filter),
  );

  return (
    <section className="page-shell work-collection" aria-label="Project archive">
      <div className="work-filter-bar">
        <div
          className="work-filters"
          role="group"
          aria-label="Filter projects by discipline"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={category === filter}
              onClick={() => selectFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {filter !== "All" && (
          <button
            type="button"
            className="filter-reset"
            onClick={() => selectFilter("All")}
          >
            Show all
          </button>
        )}
      </div>
      <p className="collection-count tabular" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter !== "All" ? ` in ${filter}` : ""}
      </p>
      <div className="work-index">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} headingLevel="h2" />
        ))}
      </div>
    </section>
  );
}
