import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Crawler policy.
 *
 * Allowed by default for all bots (this is a public portfolio — we want
 * search engines to index it). The disallow list trims paths that aren't
 * useful in SERPs and just consume crawl budget:
 *
 *   /api/       — internal route handlers, no human-readable content.
 *   /og         — dynamic OG image generator, served as <meta> previews.
 *   /_next/     — Next.js build assets; some bots try to crawl chunk URLs.
 *   /work/-/    — fallback OG endpoint for missing slugs; never canonical.
 *
 * The deprecated `host` field was removed — Google ignores it and Yandex's
 * usage of it has been retired since 2018, so it added noise without value.
 *
 * Note: this intentionally does NOT block AI crawlers (GPTBot, ClaudeBot,
 * Google-Extended, CCBot, etc.). For a public portfolio whose goal is
 * reach, being indexable by AI assistants is upside, not risk. Flip the
 * `BLOCK_AI_BOTS` flag if that policy changes.
 */
const BLOCK_AI_BOTS = false;

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "CCBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/og", "/_next/", "/work/-/"],
    },
  ];

  if (BLOCK_AI_BOTS) {
    rules.push({ userAgent: AI_BOTS, disallow: "/" });
  }

  return {
    rules,
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
