/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { experience, recognition } from "../portfolio-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Muhammad Al-amin Yusha'u, strategic communications lead, cultural programmer and Cyber Security graduate.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="about-hero page-shell">
          <div>
            <h1>Communications is where I ended up because culture needed me there.</h1>
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
              src="/assets/kafart-hands-of-resilience.jpg"
              alt="Muhammad speaking with visitors at an exhibition"
            />
            <figcaption>
              Speaking with visitors during Hands of Resilience, Kaduna, 2023.
            </figcaption>
          </figure>
        </section>

        <section className="page-shell profile-grid section-block">
          <div>
            <h2>Culture, systems and technical depth</h2>
          </div>
          <div className="prose">
            <p>
              Alongside cultural work, I am completing a BSc in Cyber Security
              at the Air Force Institute of Technology with a 4.80/5.00 CGPA.
              My thesis examines gradient-based detection of low-variance data
              poisoning in large-language-model fine-tuning.
            </p>
            <p>
              That training does not replace the cultural practice. It gives
              it another lens. I can ask more useful questions about digital
              access, data protection, verification and the responsibilities
              that arrive when a cultural organisation becomes a data holder.
            </p>
            <p>
              I work in English and Hausa, and speak Baruba as my mother
              tongue. I am based in Abuja, Nigeria.
            </p>
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

        <section className="learning-section">
          <div className="page-shell learning-grid">
            <div>
              <h2>People and communities I have learned beside</h2>
              <p>
                Institutions matter, but so do the people who model a rigorous
                way of working. My practice has been shaped through close work
                and mentorship across literature, curating, climate and
                culture.
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
                <h3>Aisha Aliyu-Bima</h3>
                <p>
                  Curator of Abuja Art Fair and inaugural Koyo Kouoh Fellow. I
                  support her through curatorial research, programme
                  coordination and communications.
                </p>
                <a
                  className="text-link"
                  href="https://www.theartnewspaper.com/2026/06/16/the-basel-legacy-of-the-late-venice-biennale-curator-koyo-kouoh"
                >
                  Read about the fellowship <span aria-hidden="true">↗</span>
                </a>
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
            <h2>Selected recognition</h2>
            <ol>
              {recognition.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <figure>
            <img
              src="/assets/better-futures-fellows.png"
              alt="Better Futures Fellowship cohort page including Muhammad"
            />
            <figcaption>
              The Better Futures Fellowship brought together questions of
              culture, desire, human flourishing and emerging technology.
            </figcaption>
          </figure>
        </section>

        <section className="page-shell about-contact">
          <h2>Open to cultural, communications and research collaborations.</h2>
          <p>
            <a href="mailto:alaminyushau234@gmail.com">
              alaminyushau234@gmail.com
            </a>
            <br />
            <a href="tel:+2348081249489">+234 808 124 9489</a>
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
