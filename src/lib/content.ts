import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isCaseStudyMeta, type CaseStudyMeta } from "@/content/work/_schema";

const WORK_DIR = path.join(process.cwd(), "src/content/work");

export type LoadedCaseStudy = {
  meta: CaseStudyMeta;
  source: string;
};

let cache: LoadedCaseStudy[] | null = null;

export async function getAllCaseStudies(): Promise<LoadedCaseStudy[]> {
  if (cache) return cache;
  const files = await fs.readdir(WORK_DIR);
  const mdx = files.filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));
  const loaded = await Promise.all(
    mdx.map(async (file) => {
      const raw = await fs.readFile(path.join(WORK_DIR, file), "utf8");
      const parsed = matter(raw);
      const meta = { slug: file.replace(/\.mdx$/, ""), ...parsed.data } as unknown;
      if (!isCaseStudyMeta(meta)) {
        throw new Error(`Invalid case-study frontmatter in ${file}. Required fields missing.`);
      }
      return { meta, source: parsed.content };
    }),
  );
  const visible = loaded.filter((l) => !l.meta.draft);
  const ts = (v: string | Date) => new Date(v).getTime();
  visible.sort((a, b) => ts(b.meta.publishedAt) - ts(a.meta.publishedAt));
  cache = visible;
  return visible;
}

export async function getCaseStudy(slug: string): Promise<LoadedCaseStudy | null> {
  const all = await getAllCaseStudies();
  return all.find((c) => c.meta.slug === slug) ?? null;
}

export async function getAdjacent(slug: string) {
  const all = await getAllCaseStudies();
  const i = all.findIndex((c) => c.meta.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? (all[i - 1]?.meta ?? null) : null,
    next: i < all.length - 1 ? (all[i + 1]?.meta ?? null) : null,
  };
}
