/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CopyEmail } from "../components/CopyEmail";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { imageSize } from "../image-meta";
import {
  experience,
  recognition,
  selectedWriting,
  skills,
  tools,
} from "../portfolio-data";
import { sitePath } from "../site-path";

const headshotDims = imageSize("/assets/about-headshot.jpg");
const fellowsDims = imageSize("/assets/better-futures-fellows.png");

export const metadata: Metadata = {
  title: "About",
  description:
    "About Muhammad Al-amin Yusha'u, strategic communications lead, cultural programmer and BSc Cyber Security student.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="about-hero page-shell">
          <div>
            <h1>Culture &amp; systems.</h1>
            <p>
              I currently serve as Strategic Communications Lead at KAFART, a
              cultural platform working with artists, designers, researchers,
              public institutions and partners across Northern Nigeria and
              beyond. I joined in 2023 and now lead communications planning
              across festival editions and related programmes.
            </p>
            <p>
              My work sits between programme delivery, research and public
              engagement. I am interested in the structures behind the visible
              work: the archive that keeps an exhibition alive, the database
              that lets a team coordinate, the report that makes learning
              legible and the language that helps a public enter.
            </p>
          </div>
          <figure>
            <img
              src={sitePath("/assets/about-headshot.jpg")}
              alt="Portrait of Muhammad Al-amin Yusha'u"
              width={headshotDims.width}
              height={headshotDims.height}
              fetchPriority="high"
            />
            <figcaption>Muhammad Al-amin Yusha&apos;u.</figcaption>
          </figure>
        </section>

        <section className="page-shell profile-grid section-block">
          <div>
            <h2>A technical lens</h2>
          </div>
          <div className="prose">
            <p>
              Alongside cultural work, I am completing a BSc in Cyber Security
              at the Air Force Institute of Technology with a{" "}
              <span className="tabular">4.83/5.00</span> CGPA. My thesis
              examines gradient-based detection of low-variance data poisoning
              in large-language-model fine-tuning.
            </p>
            <p>
              That training does not replace the cultural practice. It gives it
              another lens. I can ask more useful questions about digital
              access, data protection, verification and the responsibilities
              that arrive when a cultural organisation becomes a data holder.
            </p>
            <p>I work in English and Hausa. I am based in Abuja, Nigeria.</p>
          </div>
        </section>

        <section
          className="page-shell skills-tools-section section-block"
          aria-labelledby="skills-tools-heading"
        >
          <div className="skills-tools-intro">
            <h2 id="skills-tools-heading">Skills and tools</h2>
            <p>
              My work moves between strategy, design, publishing and delivery.
              These are the capabilities and working systems I use to connect
              those parts.
            </p>
          </div>
          <div>
            <div className="skills-grid">
              {skills.map((skill) => (
                <article key={skill.title}>
                  <h3>{skill.title}</h3>
                  <p>{skill.detail}</p>
                </article>
              ))}
            </div>
            <div className="tools-list">
              <h3>Tools and systems</h3>
              <ul>
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="page-shell section-block">
          <div className="section-heading">
            <h2>Experience</h2>
            <p>
              A selected timeline of roles that shaped the practice behind the
              case studies.
            </p>
          </div>
          <div className="timeline timeline-full">
            {experience.map((item) => (
              <article key={`${item.place}-${item.role}`}>
                <span className="tabular">{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p className="timeline-place">{item.place}</p>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="learning-section">
          <div className="page-shell learning-grid">
            <div>
              <h2>Learning together</h2>
              <p>
                Institutions matter, but so do the people who model a rigorous
                way of working. My practice has been shaped through close work
                and mentorship across literature, curating, climate and culture.
              </p>
            </div>
            <div className="learning-list">
              <article>
                <h3>Ganiyat Sani</h3>
                <p>
                  Founder of KAFART. Working closely with her has taught me how
                  a cultural platform can hold heritage, experimentation and
                  institution-building at the same time.
                </p>
              </article>
              <article>
                <h3>TJ Benson</h3>
                <p>
                  Writer and mentor during my two cycles with the Yasmin
                  El-Rufai Foundation. That community gave my early writing a
                  serious editorial home.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-shell section-block credentials-section">
          <div>
            <h2>Recognition</h2>
            <ul>
              {recognition.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <figure>
            <img
              src={sitePath("/assets/better-futures-fellows.png")}
              alt="Better Futures Fellowship cohort page including Muhammad"
              width={fellowsDims.width}
              height={fellowsDims.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              The Better Futures Fellowship brought together questions of
              culture, desire, human flourishing and emerging technology.
            </figcaption>
          </figure>
        </section>

        <section
          className="page-shell section-block writing-section"
          aria-labelledby="writing-heading"
        >
          <div className="section-heading">
            <h2 id="writing-heading">Writing, press &amp; talks</h2>
            <p>
              Published non-fiction, cultural features, press coverage, panel
              moderation and academic research.
            </p>
          </div>
          <ul className="writing-list">
            {selectedWriting.map((item) => (
              <li key={`${item.year}-${item.title}`}>
                <span className="writing-year tabular">{item.year}</span>
                <div className="writing-entry">
                  {item.href ? (
                    item.external ? (
                      <a
                        className="writing-title-link"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.title} <span aria-hidden="true">→</span>
                      </a>
                    ) : (
                      <Link className="writing-title-link" href={item.href}>
                        {item.title} <span aria-hidden="true">→</span>
                      </Link>
                    )
                  ) : (
                    <span className="writing-title">{item.title}</span>
                  )}
                  <span className="writing-context">{item.context}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="page-shell about-contact">
          <h2>Let&apos;s work together.</h2>
          <div className="about-contact-links">
            <a className="text-link" href="mailto:alaminyushau234@gmail.com">
              alaminyushau234@gmail.com
            </a>
            <CopyEmail />
            <a className="text-link tabular" href="tel:+2348081249489">
              +234 808 124 9489
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
