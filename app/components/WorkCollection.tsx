"use client";

import { useState } from "react";
import type { Project } from "../portfolio-data";
import { ProjectCard } from "./ProjectCard";

const categories = ["All", "Culture", "Communications", "Technology", "Design", "Writing"];
const groups: Record<string, string[]> = {
  kafart: ["Culture", "Communications", "Technology"],
  "subject-to-climate": ["Communications"],
  "northern-creatives-conference": ["Culture", "Communications", "Writing"],
  "editorial-work": ["Culture", "Writing"],
  alama: ["Culture", "Technology"],
  budanza: ["Design"],
};

export function WorkCollection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const visible = projects.filter((project) => filter === "All" || groups[project.slug]?.includes(filter));
  return <section className="page-shell work-collection" aria-label="Project archive">
    <div className="work-filters" role="group" aria-label="Filter projects by discipline">
      {categories.map((category) => <button key={category} type="button"
        aria-pressed={category === filter} onClick={() => setFilter(category)}>{category}</button>)}
    </div>
    <p className="collection-count" role="status">{visible.length} {visible.length === 1 ? "project" : "projects"}</p>
    <div className="work-index">
      {visible.map((project) => <ProjectCard key={project.slug} project={project} />)}
    </div>
  </section>;
}
