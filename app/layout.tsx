import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { sitePath } from "./site-path";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Al-amin Yusha'u | Communications, Culture and Technology",
    template: "%s | Muhammad Al-amin Yusha'u",
  },
  description:
    "The portfolio of Muhammad Al-amin Yusha'u, a strategic communications lead working across cultural programming, public engagement and responsible technology.",
  icons: {
    icon: sitePath("/assets/portrait.jpg"),
    shortcut: sitePath("/assets/portrait.jpg"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={archivo.variable}>
        {children}
      </body>
    </html>
  );
}
