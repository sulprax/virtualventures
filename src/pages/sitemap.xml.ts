import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const staticPages = [
  "/",
  "/about/",
  "/blog/",
  "/gallery/",
  "/shop/",
  "/contact/",
  "/faq/",
  "/crochet/",
  "/laser/",
  "/3d-printing/",
  "/patterns/",
  "/privacy/",
  "/terms/",
  "/copyright/",
  "/pattern-policy/",
  "/authenticity/",
  "/cookies/",
  "/verify/",
  "/report-stolen-pattern/",
  "/search/",
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL("https://virtualventures.blog");
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const urls = new Set([
    ...staticPages,
    ...posts.map((post) => `/blog/${post.id}/`),
  ]);

  const entries = [...urls]
    .sort((a, b) => a.localeCompare(b))
    .map((path) => {
      const url = new URL(path, baseUrl).href;

      return `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
