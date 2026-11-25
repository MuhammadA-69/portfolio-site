/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { imageSize } from "../image-meta";
import type { Project } from "../portfolio-data";
import { sitePath } from "../site-path";

export function ProjectCard({
  project,
  headingLevel = "h2",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const displaySrc = project.heroThumbnail ?? project.hero;
  const dims = imageSize(displaySrc);

  return (
    <article
      className={`project-card project-card-${project.slug} accent-${project.accent}`}
    >
      <Link
        href={`/work/${project.slug}`}
        className={`project-image-link ${
          project.heroFit === "contain" ? "project-image-contain" : ""
        }`}
      >
        <img
          src={sitePath(displaySrc)}
          alt={project.heroAlt}
          width={dims.width}
          height={dims.height}
          loading="lazy"
          decoding="async"
          style={
            project.heroPosition
              ? { objectPosition: project.heroPosition }
              : undefined
          }
        />
      </Link>
      <div className="project-card-copy">
        <div className="project-card-meta">
          <span className="tabular">{project.period}</span>
          <span>{project.discipline}</span>
        </div>
        <Heading className="project-card-title">
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </Heading>
        <p>{project.lead}</p>
        <Link className="text-link" href={`/work/${project.slug}`}>
          Read the case study <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
