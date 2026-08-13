/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ProjectCard } from "./components/ProjectCard";
import { SignalField } from "./components/SignalField";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { experience, projects, recognition } from "./portfolio-data";
import { sitePath } from "./site-path";

const evidence = [
  {
    value: "3",
    label: "languages on KAFART's public website",
  },
  {
    value: "100+",
    label: "stakeholders tracked for NCC 2025",
  },
  {
    value: "4",
    label: "countries represented in the first youth committee",
  },
  {
    value: "4.83",
    label: "CGPA out of 5.00 in Cyber Security",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero page-shell">
          <div className="hero-copy">
            <h1>
              <span>Muhammad</span>
              <span>Al-amin Yusha&apos;u</span>
            </h1>
            <p className="hero-statement">
              I build the systems and stories that move cultural work into
              public life.
            </p>
            <p className="hero-intro">
              I am a strategic communications lead working across cultural
              programming, research, public engagement and responsible
              technology. My practice is rooted in Northern Nigeria and built
              for audiences far beyond it.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/work">
                Explore selected work
              </Link>
              <a className="button button-line" href="mailto:alaminyushau234@gmail.com">
                Email me
              </a>
            </div>
            <div className="hero-facts">
              <span>Abuja, Nigeria</span>
              <span>Strategic Communications Lead, KAFART</span>
              <span>BSc Cyber Security, 4.83/5.00</span>
            </div>
          </div>
          <figure className="hero-portrait">
            <img
              src={sitePath("/assets/portrait.jpg")}
              alt="Portrait of Muhammad Al-amin Yusha'u"
            />
            <figcaption>
              Communications strategist
              <br />
              Arts, culture and technology
            </figcaption>
          </figure>
        </section>

        <section className="practice-section">
          <div className="page-shell practice-grid">
            <div className="practice-copy">
              <h2>A practice shaped by connection</h2>
              <p>
                A programme needs a public language. Research needs a form
                people can enter. Technology needs context and care. My work
                connects those parts before they become separate problems.
              </p>
              <div className="practice-list">
                <span>Communication systems</span>
                <span>Cultural research</span>
                <span>Public engagement</span>
                <span>Responsible technology</span>
              </div>
            </div>
            <div className="signal-wrap">
              <SignalField />
              <p>
                Two signals move through interference, find a shared rhythm and
                resolve into one clear line.
              </p>
            </div>
          </div>
        </section>

        <section className="page-shell section-block">
          <div className="section-heading">
            <h2>Selected work</h2>
            <p>
              Projects that show how I think, coordinate and communicate.
            </p>
            <Link className="text-link" href="/work">
              View all work <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="featured-grid">
            <ProjectCard project={projects[0]} featured />
            <ProjectCard project={projects[1]} />
            <ProjectCard project={projects[2]} />
          </div>
        </section>

        <section
          className="evidence-band evidence-marquee"
          aria-label="Selected portfolio statistics"
        >
          <div className="evidence-track">
            {[0, 1].map((setIndex) => (
              <div
                className="evidence-set"
                key={setIndex}
                aria-hidden={setIndex === 1 ? "true" : undefined}
              >
                {evidence.map((item) => (
                  <div key={`${setIndex}-${item.value}`}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="page-shell section-block revue-section">
          <div className="section-heading">
            <h2>Pages that became an archive</h2>
            <p>
              The Revue gave volunteer research, cultural reporting and
              original writing a durable editorial form.
            </p>
            <Link className="text-link" href="/work/editorial-work">
              Open the editorial case study <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="revue-shelf">
            <figure className="page-preview page-preview-small">
              <img
                src={sitePath("/assets/revue-2022-cover.png")}
                alt="The Revue 2022 cover"
              />
              <figcaption>2022 cover</figcaption>
            </figure>
            <figure className="page-preview page-preview-tall">
              <img
                src={sitePath("/assets/revue-2022-credits.png")}
                alt="The Revue 2022 credits page"
              />
              <figcaption>Associate Articles Editor</figcaption>
            </figure>
            <figure className="page-preview page-preview-small">
              <img
                src={sitePath("/assets/revue-2023-cover.png")}
                alt="The Revue 2023 cover"
              />
              <figcaption>2023 cover</figcaption>
            </figure>
            <figure className="page-preview page-preview-tall">
              <img
                src={sitePath("/assets/revue-2023-feature-1.png")}
                alt="A Revue 2023 feature on Tuareg material culture"
              />
              <figcaption>Research translated for readers</figcaption>
            </figure>
          </div>
        </section>

        <section className="page-shell section-block timeline-section">
          <div className="section-heading">
            <h2>Current and recent roles</h2>
            <p>
              Communications is where I began. Coordination, research and
              infrastructure are what the work required next.
            </p>
            <Link className="text-link" href="/about">
              Read my full profile <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="timeline">
            {experience.slice(0, 4).map((item) => (
              <article key={`${item.place}-${item.role}`}>
                <span>{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p className="timeline-place">{item.place}</p>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="recognition-section">
          <div className="page-shell recognition-grid">
            <div>
              <h2>Selected recognition and learning communities</h2>
              <p>
                The fellowships and communities that have sharpened how I think
                about culture, technology, leadership and public work.
              </p>
            </div>
            <ol>
              {recognition.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
            <figure className="fellowship-proof">
              <img
                src={sitePath("/assets/better-futures-fellows.png")}
                alt="Better Futures Fellowship names and faces page including Muhammad Al-amin Yusha'u"
              />
              <figcaption>
                Better Futures Fellowship, 2026. Eight weeks on culture, desire
                and emerging technologies.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="contact-section page-shell">
          <p>Have a programme, institution or idea that needs a clearer public life?</p>
          <h2>Let&apos;s make the work legible, useful and lasting.</h2>
          <div className="contact-actions">
            <a className="button button-light" href="mailto:alaminyushau234@gmail.com">
              alaminyushau234@gmail.com
            </a>
            <a className="button button-ghost-light" href="tel:+2348081249489">
              +234 808 124 9489
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
