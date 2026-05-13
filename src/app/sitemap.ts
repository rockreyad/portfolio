import type { MetadataRoute } from "next";
import { stat } from "node:fs/promises";
import path from "node:path";
import { getAllCaseStudies } from "@/lib/content";
import { SITE } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: Entry["changeFrequency"];
  priority: Entry["priority"];
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/work", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/cv", changeFrequency: "monthly", priority: 0.9 },
  { path: "/now", changeFrequency: "weekly", priority: 0.6 },
  { path: "/stack", changeFrequency: "monthly", priority: 0.5 },
  { path: "/uses", changeFrequency: "monthly", priority: 0.5 },
  { path: "/archive", changeFrequency: "yearly", priority: 0.4 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
];

// CV mtime feeds the `/cv` sitemap entry. Each candidate path is built with
// fully static literals so Turbopack's NFT tracer can scope the file trace
// to the two real files instead of pessimistically tracing the whole project
// (which happened when this used `path.join(cwd, rel)` with a loop variable).
async function getCvLastModified(): Promise<Date> {
  const cwd = process.cwd();
  try {
    const s = await stat(path.join(cwd, "public", "mahamud-hasan-cv.pdf"));
    return s.mtime;
  } catch {
    // fall through to the LaTeX source as a backup
  }
  try {
    const s = await stat(path.join(cwd, "cv", "main.tex"));
    return s.mtime;
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [caseStudies, cvUpdatedAt] = await Promise.all([
    getAllCaseStudies(),
    getCvLastModified(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path: p, changeFrequency, priority }) => ({
      url: `${SITE.url}${p}`,
      lastModified: p === "/cv" ? cvUpdatedAt : now,
      changeFrequency,
      priority,
    }),
  );

  const workEntries: MetadataRoute.Sitemap = caseStudies.map(({ meta }) => ({
    url: `${SITE.url}/work/${meta.slug}`,
    lastModified: new Date(meta.updatedAt ?? meta.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...workEntries];
}
