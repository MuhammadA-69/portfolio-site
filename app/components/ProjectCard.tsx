/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Project } from "../portfolio-data";
import { sitePath } from "../site-path";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={`project-card accent-${project.accent} ${
        featured ? "project-card-featured" : ""
      }`}
    >
      <Link href={`/work/${project.slug}`} className="project-image-link">
        <img src={sitePath(project.hero)} alt={project.heroAlt} />
      </Link>
      <div className="project-card-copy">
        <div className="project-card-meta">
          <span>{project.period}</span>
          <span>{project.discipline}</span>
        </div>
        <h3>
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.lead}</p>
        <Link className="text-link" href={`/work/${project.slug}`}>
          Read the case study <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
