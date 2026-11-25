/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseGallery } from "../../components/CaseGallery";
import { KafartArchive } from "../../components/KafartArchive";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { VideoEdits } from "../../components/VideoEdits";
import collection from "../../creative-collection.json";
import { imageSize } from "../../image-meta";
import graphics from "../../kafart-graphics.json";
import type { ProjectImage } from "../../portfolio-data";
import { projects } from "../../portfolio-data";
import { sitePath } from "../../site-path";

export const dynamicParams = false;

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

  const ogImage = sitePath(project.heroThumbnail ?? project.hero);

  return {
    title: project.title,
    description: project.lead,
    openGraph: {
      title: `${project.title} | Muhammad Al-amin Yusha'u`,
      description: project.lead,
      type: "article",
      images: [{ url: ogImage, alt: project.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Muhammad Al-amin Yusha'u`,
      description: project.lead,
      images: [ogImage],
    },
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
  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const heroDims = imageSize(project.hero);

  const kafartArchiveSections =
    project.slug === "kafart"
      ? [
          {
            id: "kafart-graphics",
            label: "Graphics",
            title: "Campaign graphics & tickets",
            subtitle: `${(graphics as ProjectImage[]).length} posters, announcements & tickets`,
            images: graphics as ProjectImage[],
          },
          {
            id: "arewa-symbols",
            label: "Arewa symbols",
            title: "Arewa symbol studies",
            subtitle: `${(collection.symbols as ProjectImage[]).length} motif sheets`,
            images: collection.symbols as ProjectImage[],
          },
          {
            id: "merchandise-design",
            label: "Merchandise",
            title: "Merchandise design",
            subtitle: `${(collection.merch as ProjectImage[]).length} apparel & tote concepts`,
            images: collection.merch as ProjectImage[],
          },
          {
            id: "hands-of-resilience",
            label: "Exhibition guide",
            title: "Hands of Resilience",
            subtitle: "2 printed exhibition guide spreads",
            images: collection.trifold as ProjectImage[],
          },
          {
            id: "kemi-visit",
            label: "Kemi’s visit",
            title: "Kemi Ilesanmi’s visit",
            subtitle: `${(collection.kemi as ProjectImage[]).length} fieldwork photographs`,
            images: collection.kemi as ProjectImage[],
          },
        ]
      : [];

  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section
          className={`case-hero accent-${project.accent} case-hero-${project.slug}`}
        >
          <div className="page-shell case-hero-grid">
            <div>
              <Link className="back-link" href="/work">
                ← All work
              </Link>
              <h1>{project.title}</h1>
              <p className="case-lead">{project.lead}</p>
              <div className="case-meta">
                <span className="tabular">{project.period}</span>
                <span>{project.discipline}</span>
              </div>
              {project.slug === "kafart" && (
                <nav className="case-contents" aria-label="Jump to KAFART work">
                  <a href="#project-gallery">Cards and fieldwork</a>
                  <a href="#case-videos-heading">Videos</a>
                  <a href="#kafart-graphics">Graphics</a>
                  <a href="#arewa-symbols">Arewa symbols</a>
                  <a href="#merchandise-design">Merchandise</a>
                  <a href="#hands-of-resilience">Exhibition guide</a>
                  <a href="#kemi-visit">Kemi’s visit</a>
                </nav>
              )}
            </div>
            <img
              src={sitePath(project.hero)}
              alt={project.heroAlt}
              width={heroDims.width}
              height={heroDims.height}
              fetchPriority="high"
              style={
                project.heroPosition
                  ? { objectPosition: project.heroPosition }
                  : undefined
              }
            />
          </div>
          <div className="page-shell">
            <dl className="case-ledger" aria-label="Project details">
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Organisation</dt>
                <dd>{project.organisation}</dd>
              </div>
              <div>
                <dt>Setting</dt>
                <dd>{project.location}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd className="tabular">{project.period}</dd>
              </div>
            </dl>
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
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className={`evidence-band accent-${project.accent}`}>
          <div className="page-shell case-evidence">
            <h2>Evidence at a glance</h2>
            <div>
              {project.evidence.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </section>

        <CaseGallery
          images={project.images}
          title={project.slug === "kafart" ? "Cards and fieldwork" : undefined}
          subtitle={
            project.slug === "kafart"
              ? `${project.images.length} selected highlights`
              : undefined
          }
        />

        {project.slug === "kafart" && (
          <>
            <VideoEdits />
            <KafartArchive sections={kafartArchiveSections} />
          </>
        )}

        <nav
          className="case-pagination page-shell"
          aria-label="Adjacent case studies"
        >
          <Link
            className="case-pagination-prev"
            href={`/work/${prevProject.slug}`}
          >
            <span className="case-pagination-label">← Previous case study</span>
            <span className="case-pagination-title">{prevProject.title}</span>
            <span className="case-pagination-meta">{prevProject.discipline}</span>
          </Link>
          <Link
            className="case-pagination-next"
            href={`/work/${nextProject.slug}`}
          >
            <span className="case-pagination-label">Next case study →</span>
            <span className="case-pagination-title">{nextProject.title}</span>
            <span className="case-pagination-meta">{nextProject.discipline}</span>
          </Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
