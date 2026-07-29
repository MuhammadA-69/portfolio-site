import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { projects } from "../portfolio-data";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Selected strategic communications, cultural programming, editorial and technology projects by Muhammad Al-amin Yusha'u.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="inner-hero page-shell">
          <h1>Selected work</h1>
          <p>
            Work at the intersection of cultural institutions, public
            engagement, editorial practice and technical systems. Every case
            study names the contribution, the evidence and the limits.
          </p>
        </section>
        <section className="page-shell work-index">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} featured={index === 0} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
