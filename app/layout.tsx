import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: {
      default: "Muhammad Al-amin Yusha'u | Communications, Culture and Technology",
      template: "%s | Muhammad Al-amin Yusha'u",
    },
    description:
      "The portfolio of Muhammad Al-amin Yusha'u, a strategic communications lead working across cultural programming, public engagement and responsible technology.",
    icons: {
      icon: "/assets/portrait.jpg",
      shortcut: "/assets/portrait.jpg",
    },
    openGraph: {
      title: "Muhammad Al-amin Yusha'u",
      description:
        "Strategic communications, cultural programming and responsible technology.",
      type: "website",
      images: [
        {
          url: new URL("/og.png", base).toString(),
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
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
