/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CopyEmail } from "./components/CopyEmail";
import { FieldNotes } from "./components/FieldNotes";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { imageSize } from "./image-meta";
import { affiliations, projects } from "./portfolio-data";
import { sitePath } from "./site-path";

const selected = [
  "kafart",
  "hibaf",
  "editorial-work",
  "northern-creatives-conference",
  "subject-to-climate",
].map((slug) => projects.find((project) => project.slug === slug)!);

const headshotDims = imageSize("/assets/about-headshot.jpg");

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="home-hero page-shell">
          <div className="hero-introduction">
            <p>Muhammad Al-amin Yusha’u</p>
            <p>
              Communications, culture
              <br />
              &amp; responsible technology
            </p>
          </div>
          <h1>
            Culture,
            <br />
            <span>made public.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              I’m a communications lead and cultural storyteller helping ideas
              find their people.
            </p>
            <a className="cta-button" href="#selected-work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <FieldNotes />
        </section>

        <section
          className="affiliations-strip page-shell"
          aria-label="Selected platforms, festivals and fellowships"
        >
          <p className="affiliations-label">Platforms &amp; fellowships</p>
          <ul>
            {affiliations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="selected-section page-shell" id="selected-work">
          <div className="selected-intro">
            <h2>Selected work</h2>
            <p>
              From a festival in Northern Nigeria to a cross-border climate
              conversation. Different settings, a shared interest in people and
              possibility.
            </p>
            <Link className="text-link" href="/work">
              View all {projects.length} projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="selected-projects">
            {selected.map((project, index) => {
              const displaySrc = project.heroThumbnail ?? project.hero;
              const dims = imageSize(displaySrc);
              return (
                <article
                  className={`selected-project selected-${project.slug}`}
                  key={project.slug}
                >
                  <Link
                    className={`selected-image ${
                      project.heroFit === "contain"
                        ? "selected-image-contain"
                        : ""
                    }`}
                    href={`/work/${project.slug}`}
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
                    <span className="image-action" aria-hidden="true">
                      →
                    </span>
                  </Link>
                  <div className="project-caption">
                    <span className="selected-index tabular" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <div>
                      <h3>
                        <Link href={`/work/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h3>
                      <p className="project-period tabular">
                        <span>{project.period}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="selected-discipline">
                          {project.role}
                        </span>
                      </p>
                      <p>{project.lead}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="home-about">
          <div className="page-shell home-about-grid">
            <figure>
              <img
                src={sitePath("/assets/about-headshot.jpg")}
                alt="Muhammad Al-amin Yusha’u wearing traditional dress"
                width={headshotDims.width}
                height={headshotDims.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div>
              <h2>
                People first.
                <br />
                <span>Systems, too.</span>
              </h2>
              <p>
                I’m Al-amin, a communications lead, cultural programmer and
                writer. At KAFART, I help connect artists, institutions and
                audiences through exhibitions, stories and digital archives.
              </p>
              <p>
                My training in Cyber Security brings another lens: how we build
                tools that are useful, accessible and responsible. Rooted in
                Northern Nigeria and based in Abuja, I work in English and
                Hausa.
              </p>
              <p className="study-note tabular">
                BSc Cyber Security · 4.83/5.00 CGPA
              </p>
              <Link className="text-link" href="/about">
                More about my practice <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-contact page-shell">
          <h2>
            Let’s make
            <br />
            <span>a difference.</span>
          </h2>
          <div className="home-contact-actions">
            <a className="contact-email" href="mailto:alaminyushau234@gmail.com">
              Say hello <span aria-hidden="true">→</span>
            </a>
            <CopyEmail />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
