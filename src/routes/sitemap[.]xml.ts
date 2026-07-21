import { createFileRoute } from "@tanstack/react-router";

import { getSupabaseClient } from "@/lib/supabase";

const SITE_URL = "https://careercraftyouth.in";

type BlogSitemapRow = {
  slug: string;
  published_at: string | null;
  updated_at: string | null;
  created_at: string;
};

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq: "weekly" | "monthly";
  priority: string;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = await getSitemapEntries();

        return new Response(buildSitemapXml(entries), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});

async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [
    {
      loc: `${SITE_URL}/`,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/blogs`,
      changefreq: "weekly",
      priority: "0.8",
    },
  ];

  try {
    const { data, error } = await getSupabaseClient()
      .from("blog_posts")
      .select("slug, published_at, updated_at, created_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) throw error;

    const seen = new Set<string>();
    let latestBlogDate: string | undefined;
    for (const post of (data ?? []) as BlogSitemapRow[]) {
      const slug = post.slug.trim();
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);

      const lastmod = formatSitemapDate(post.updated_at ?? post.published_at ?? post.created_at);
      if (lastmod && (!latestBlogDate || lastmod > latestBlogDate)) {
        latestBlogDate = lastmod;
      }

      entries.push({
        loc: `${SITE_URL}/blogs/${encodeURIComponent(slug)}`,
        lastmod,
        changefreq: "monthly",
        priority: "0.7",
      });
    }

    entries[1].lastmod = latestBlogDate;
  } catch (error) {
    console.error("Unable to load blog posts for sitemap.", error);
  }

  return entries;
}

function formatSitemapDate(value: string | null | undefined) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

function buildSitemapXml(entries: SitemapEntry[]) {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";

      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
