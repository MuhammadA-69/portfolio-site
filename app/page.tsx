/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AsciiPlanet } from "./components/AsciiPlanet";
import { ShaderBackdrop } from "./components/ShaderBackdrop";
import { WorkShowcase } from "./components/WorkShowcase";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { experience, projects, recognition } from "./portfolio-data";
import { sitePath } from "./site-path";
import styles from "./HomePage.module.css";

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
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>
              <span>Muhammad</span>{" "}
              <span>Al-amin Yusha&apos;u</span>
            </h1>
            <p className={styles.statement}>
              I build the systems and stories that move cultural work into
              public life.
            </p>
            <p className={styles.intro}>
              I am a strategic communications lead working across cultural
              programming, research, public engagement and responsible
              technology. My practice is rooted in Northern Nigeria and built
              for audiences far beyond it.
            </p>
            <div className={styles.actions}>
              <Link className={`${styles.primaryAction} diagonal-fill diagonal-fill-light`} href="/work">
                Explore selected work
                <span aria-hidden="true">↗</span>
              </Link>
              <a className={styles.emailAction} href="mailto:alaminyushau234@gmail.com">
                Email me
              </a>
            </div>
            <div className={styles.identity}>
              <Link href="/about" aria-label="About Muhammad Al-amin Yusha'u">
                <img src={sitePath("/assets/portrait.jpg")} width={80} height={80}
                  alt="Portrait of Muhammad Al-amin Yusha'u" />
              </Link>
              <p>Rooted in Northern Nigeria.<br />Working across culture and technology.</p>
            </div>
            <p className={styles.facts}>Abuja, Nigeria <span>BSc Cyber Security, 4.83/5.00</span></p>
          </div>
          <div className={styles.heroWorld}><AsciiPlanet /></div>
        </section>

        <section className="practice-section">
          <div className="page-shell practice-grid">
            <div className="practice-copy">
              <h2>Connection, in practice</h2>
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
          </div>
        </section>

        <WorkShowcase projects={projects.slice(0, 3).map(({ slug, title, period, lead, hero, heroAlt }) =>
          ({ slug, title, period, lead, hero, heroAlt }))} />

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
            <h2>Pages into an archive</h2>
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
            <h2>Where I work</h2>
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
              <h2>Learning communities</h2>
              <p>
                The fellowships and communities that have sharpened how I think
                about culture, technology, leadership and public work.
              </p>
            </div>
            <ul>
              {recognition.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
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
          <ShaderBackdrop variant={0.85} />
          <p>Have a programme, institution or idea that needs a clearer public life?</p>
          <h2>Let&apos;s make it public.</h2>
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
