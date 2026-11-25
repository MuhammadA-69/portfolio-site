import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { sitePath } from "./site-path";
import "./globals.css";
import "./interactions.css";
import "./components/CaseGallery.css";

const serif = localFont({
  src: "./fonts/GeistSerif-Regular.woff2",
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({
  src: "./fonts/Geist-Regular.woff2",
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const viewport: Viewport = {
  themeColor: "#f1f2ee",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Al-amin Yusha'u | Communications, Culture and Technology",
    template: "%s | Muhammad Al-amin Yusha'u",
  },
  description:
    "The portfolio of Muhammad Al-amin Yusha'u, a strategic communications lead working across cultural programming, public engagement and responsible technology.",
  icons: {
    icon: [{ url: sitePath("/favicon.svg"), type: "image/svg+xml" }],
    apple: sitePath("/apple-touch-icon.png"),
  },
  openGraph: {
    title: "Muhammad Al-amin Yusha'u",
    description:
      "Strategic communications, cultural programming and responsible technology.",
    type: "website",
    images: [
      {
        url: sitePath("/og.png"),
        width: 1200,
        height: 630,
        alt: "Muhammad Al-amin Yusha'u portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Al-amin Yusha'u",
    description:
      "Strategic communications, cultural programming and responsible technology.",
    images: [sitePath("/og.png")],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Al-amin Yusha'u",
  jobTitle: "Strategic Communications Lead",
  url: `${siteUrl}${basePath}/`,
  email: "mailto:alaminyushau234@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  sameAs: [
    "https://www.linkedin.com/in/muhammad-yusha-u-732a8921b/",
    "https://www.instagram.com/alameenyushh",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
