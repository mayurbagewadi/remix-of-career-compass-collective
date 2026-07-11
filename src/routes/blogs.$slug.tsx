import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

import { formatBlogDate, type BlogPost } from "@/lib/blogs";
import { getSupabaseClient } from "@/lib/supabase";

export const Route = createFileRoute("/blogs/$slug")({
  head: () => ({
    meta: [
      { title: "Blog | Career Craft Youth" },
      { name: "description", content: "Career guidance article from Career Craft Youth." },
    ],
  }),
  component: BlogDetail,
});

function BlogDetail() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getSupabaseClient()
      .from("blog_posts")
      .select("id, title, slug, meta_title, meta_description, excerpt, content, status, published_at, created_at, updated_at")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        if (!mounted) return;
        setPost((data as BlogPost | null) ?? null);
        setLoading(false);
        if (data?.title) {
          document.title = `${data.meta_title || data.title} | Career Craft Youth`;
        }
      })
      .catch(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-deep">
          <ArrowLeft className="h-4 w-4" />
          Blogs
        </Link>

        {loading ? (
          <div className="mt-8 rounded-lg border border-border bg-card p-8 text-center text-muted-foreground shadow-card">Loading blog...</div>
        ) : !post ? (
          <div className="mt-8 rounded-lg border border-border bg-card p-8 text-center text-muted-foreground shadow-card">Blog not found.</div>
        ) : (
          <>
            <header className="mt-8 border-b border-border pb-8">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-gold-deep" />
                {formatBlogDate(post.published_at)}
              </div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-primary md:text-5xl">{post.title}</h1>
              {(post.excerpt || post.meta_description) && (
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt || post.meta_description}</p>
              )}
            </header>

            <div className="prose prose-slate mt-8 max-w-none">
              {post.content.split(/\n{2,}/).map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-foreground/85">
                  {paragraph}
                </p>
              ))}
            </div>
          </>
        )}
      </article>
    </main>
  );
}
