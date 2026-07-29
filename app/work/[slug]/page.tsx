/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { projects } from "../../portfolio-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.lead,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (projectIndex < 0) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <SiteHeader />
      <main>
        <section className={`case-hero accent-${project.accent}`}>
          <div className="page-shell case-hero-grid">
            <div>
              <Link className="back-link" href="/work">
                ← All work
              </Link>
              <h1>{project.title}</h1>
              <p className="case-lead">{project.lead}</p>
              <div className="case-meta">
                <span>{project.period}</span>
                <span>{project.discipline}</span>
              </div>
            </div>
            <img src={project.hero} alt={project.heroAlt} />
          </div>
        </section>

        <section className="page-shell case-intro section-block">
          <div>
            <h2>The work</h2>
          </div>
          <div>
            <p className="case-summary">{project.summary}</p>
            <ul className="contribution-list">
              {project.contribution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {project.links.length > 0 && (
              <div className="case-links">
                {project.links.map((link) => (
                  <a
                    className="text-link"
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="evidence-band">
          <div className="page-shell case-evidence">
            <h2>Evidence at a glance</h2>
            <div>
              {project.evidence.map((item, index) => (
                <p key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell case-gallery section-block">
          {project.images.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className={image.fit === "contain" ? "gallery-contain" : ""}
            >
              <img src={image.src} alt={image.alt} />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </section>

        <section className="next-project page-shell">
          <p>Next case study</p>
          <Link href={`/work/${nextProject.slug}`}>
            {nextProject.title} <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
