import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/work", "/about", "/now", "/uses", "/stack", "/contact"];
  const works = [
    "/work/flowgpt",
    "/work/emochi",
    "/work/takenote",
    "/work/livesnaps",
    "/work/blinto",
  ];
  return [...routes, ...works].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
