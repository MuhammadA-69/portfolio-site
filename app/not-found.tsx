import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found on this portfolio.",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="not-found page-shell">
          <p className="eyebrow">404</p>
          <h1>
            Page not
            <br />
            <span>found.</span>
          </h1>
          <p>
            The page you followed may have moved or no longer exists. You can
            browse the full archive of projects or return to the homepage.
          </p>
          <div className="not-found-actions">
            <Link className="cta-button" href="/work">
              View selected work <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" href="/">
              Return home
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
