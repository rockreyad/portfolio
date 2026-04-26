export type CaseStudyMeta = {
  slug: string;
  title: string;
  company: string;
  url?: string;
  role: string;
  team?: string;
  dates: string;
  oneLiner: string;
  outcome: string;
  stack: string[];
  metrics?: { label: string; value: string; sub?: string }[];
  cover: string;
  ogAccent: "ember" | "cobalt" | "plum";
  publishedAt: string | Date;
  updatedAt?: string | Date;
  draft?: boolean;
};

export function isCaseStudyMeta(v: unknown): v is CaseStudyMeta {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  const isDateLike = (v: unknown) => typeof v === "string" || v instanceof Date;
  return (
    typeof o.slug === "string" &&
    typeof o.title === "string" &&
    typeof o.company === "string" &&
    typeof o.role === "string" &&
    typeof o.dates === "string" &&
    typeof o.oneLiner === "string" &&
    typeof o.outcome === "string" &&
    Array.isArray(o.stack) &&
    typeof o.cover === "string" &&
    typeof o.ogAccent === "string" &&
    isDateLike(o.publishedAt)
  );
}
