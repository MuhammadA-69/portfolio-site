/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { sitePath } from "../site-path";
import { EffectsControl } from "./EffectsControl";

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
        <a
          href="mailto:alaminyushau234@gmail.com"
          aria-label="Email Muhammad Al-amin Yusha'u"
          title="Email"
        >
          <img src={sitePath("/assets/mail.png")} alt="" />
        </a>
        <a
          href="tel:+2348081249489"
          aria-label="Call Muhammad Al-amin Yusha'u"
          title="Phone"
        >
          <img src={sitePath("/assets/telephone.png")} alt="" />
        </a>
        <a
          href="https://www.linkedin.com/in/muhammad-yusha-u-732a8921b/"
          target="_blank"
          rel="noreferrer"
          aria-label="Muhammad Al-amin Yusha'u on LinkedIn"
          title="LinkedIn"
        >
          <img src={sitePath("/assets/linkedin-logo.png")} alt="" />
        </a>
        <a
          href="https://www.instagram.com/alameenyushh"
          target="_blank"
          rel="noreferrer"
          aria-label="Muhammad Al-amin Yusha'u on Instagram"
          title="Instagram"
        >
          <img src={sitePath("/assets/instagram-logo.svg")} alt="" />
        </a>
      </div>
      <p className="footer-note">
        <EffectsControl />
        <br />
        Abuja, Nigeria
        <br />
        © {new Date().getFullYear()} Muhammad Al-amin Yusha&apos;u
      </p>
    </footer>
  );
}
