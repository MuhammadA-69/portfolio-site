import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Muhammad Al-amin Yusha'u, home">
        M.A.Y.
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <a href="/downloads/muhammad-alamin-yushau-cv.pdf">CV</a>
      </nav>
      <a className="header-contact" href="mailto:alaminyushau234@gmail.com">
        Start a conversation
      </a>
    </header>
  );
}
