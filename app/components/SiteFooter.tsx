import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="wordmark wordmark-light" href="/">
          M.A.Y.
        </Link>
        <p>
          Strategic communications, cultural programming and responsible
          technology.
        </p>
      </div>
      <div className="footer-links">
        <a href="mailto:alaminyushau234@gmail.com">Email</a>
        <a href="tel:+2348081249489">Phone</a>
        <a
          href="https://www.linkedin.com/in/muhammad-yusha-u-732a8921b/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <p className="footer-note">
        Abuja, Nigeria
        <br />
        © {new Date().getFullYear()} Muhammad Al-amin Yusha&apos;u
      </p>
    </footer>
  );
}
