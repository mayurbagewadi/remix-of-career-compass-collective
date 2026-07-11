import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

import { formatBlogDate, type BlogPost } from "@/lib/blogs";
import { getSupabaseClient } from "@/lib/supabase";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs | Career Craft Youth" },
      { name: "description", content: "Career guidance, admissions strategy, scholarships, internships, and study abroad insights from Career Craft Youth." },
    ],
  }),
  component: Blogs,
});

function Blogs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname !== "/blogs") return;
    let mounted = true;

    getSupabaseClient()
      .from("blog_posts")
      .select("id, title, slug, meta_title, meta_description, excerpt, content, status, published_at, created_at, updated_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        if (!mounted) return;
        setPosts((data ?? []) as BlogPost[]);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [pathname]);

  if (pathname !== "/blogs") {
    return <Outlet />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-deep">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <div className="mt-8 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-wider text-gold-deep">Blogs</div>
            <h1 className="mt-3 text-4xl font-semibold text-primary md:text-5xl">Career guidance insights.</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Practical guidance on stream selection, admissions, scholarships, internships, and study abroad planning.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        {loading ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground shadow-card">Loading blogs...</div>
        ) : posts.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground shadow-card">No blogs published yet.</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="rounded-lg border border-border bg-card p-5 shadow-card transition hover:shadow-elegant">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <CalendarDays className="h-4 w-4 text-gold-deep" />
                  {formatBlogDate(post.published_at)}
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-primary">{post.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt || post.meta_description || post.content}
                </p>
                <Link to="/blogs/$slug" params={{ slug: post.slug }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-deep">
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
