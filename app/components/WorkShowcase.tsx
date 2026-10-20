"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import type { Project } from "../portfolio-data";
import { sitePath } from "../site-path";
import { AsciiPhoto } from "./AsciiPhoto";
import styles from "./WorkShowcase.module.css";

type Work = Pick<Project, "slug" | "title" | "period" | "lead" | "hero" | "heroAlt">;
const labels: Record<string, string> = {
  kafart: "KAFART",
  "subject-to-climate": "SubjectToClimate",
  "northern-creatives-conference": "Northern Creatives Conference",
};

export function WorkShowcase({ projects }: { projects: Work[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <section className={styles.showcase} aria-labelledby="selected-work">
      <div className={styles.reading}>
        <div className={styles.heading}>
          <h2 id="selected-work">Selected work</h2>
          <p>Ideas made public. People brought together. Systems built to last.</p>
        </div>
        <div className={styles.index}>
          {projects.map((project, index) => (
            <article key={project.slug} className={`${styles.project} ${index === active ? styles.active : ""}`}
              onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <Link href={`/work/${project.slug}`} className={styles.projectLink}>
                <img className={`${styles.mobileImage} ${project.slug === "subject-to-climate" ? styles.presentation : ""}`} src={sitePath(project.hero)} alt={project.heroAlt}
                  width={1000} height={750} loading="lazy" />
                <span className={styles.period}>{project.period}</span>
                <h3>{labels[project.slug] ?? project.title}</h3>
                <p>{project.lead}</p>
                <span className={styles.open}>Open case study <span aria-hidden="true">↗</span></span>
              </Link>
            </article>
          ))}
        </div>
        <Link className={styles.allWork} href="/work">All work <span aria-hidden="true">↗</span></Link>
      </div>
      <figure className={styles.preview}>
        <div className={`${styles.media} ${current.slug === "subject-to-climate" ? styles.landscape : ""}`}>
          <Link href={`/work/${current.slug}`} aria-label={`Read about ${current.title}`}>
            {projects.map((project, index) => (
              <img key={project.slug} src={sitePath(project.hero)} alt="" aria-hidden="true"
                className={`${styles.picture} ${project.slug === "subject-to-climate" ? styles.presentation : ""} ${index === active ? styles.current : ""}`}
                width={1000} height={1100} loading="lazy" />
            ))}
          </Link>
          {active === 0 && <AsciiPhoto image={sitePath(current.hero)} />}
        </div>
        <figcaption>{current.heroAlt}</figcaption>
      </figure>
    </section>
  );
}
