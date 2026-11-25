import type { MetadataRoute } from "next";
import { projects } from "./portfolio-data";

export const dynamic = "force-static";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const route = (path: string) => `${siteUrl}${basePath}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: route("/"), changeFrequency: "monthly", priority: 1 },
    { url: route("/work/"), changeFrequency: "monthly", priority: 0.9 },
    { url: route("/about/"), changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: route(`/work/${project.slug}/`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
