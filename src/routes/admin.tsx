import { createFileRoute } from "@tanstack/react-router";
import { FileText, GraduationCap, ImageIcon, Info, LogOut, MessageSquareText, RefreshCw, Save, Share2, ShieldCheck, Upload } from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";

import { createSlug, formatBlogDate, type BlogPost, type BlogStatus } from "@/lib/blogs";
import type { LandingPhoto, LandingPhotoStatus } from "@/lib/landing-photos";
import { getSupabaseClient } from "@/lib/supabase";
import type { Testimonial, TestimonialStatus } from "@/lib/testimonials";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Inquiries | Career Craft Youth" },
      { name: "description", content: "Private inquiry dashboard for Career Craft Youth." },
    ],
  }),
  component: Admin,
});

type Inquiry = {
  id: string;
  full_name: string;
  phone: string;
  grade_interest: string;
  message: string | null;
  created_at: string;
};

type SocialLinks = {
  facebook: string;
  instagram: string;
  linkedin: string;
};

const EMPTY_SOCIAL_LINKS: SocialLinks = {
  facebook: "",
  instagram: "",
  linkedin: "",
};

type BlogForm = {
  id: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  content: string;
  status: BlogStatus;
};

const EMPTY_BLOG_FORM: BlogForm = {
  id: "",
  title: "",
  slug: "",
  meta_title: "",
  meta_description: "",
  excerpt: "",
  content: "",
  status: "draft",
};

type TestimonialForm = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  status: TestimonialStatus;
  display_order: number;
};

const EMPTY_TESTIMONIAL_FORM: TestimonialForm = {
  id: "",
  quote: "",
  name: "",
  role: "",
  rating: 5,
  status: "published",
  display_order: 0,
};

type LandingPhotoForm = {
  alt_text: string;
  status: LandingPhotoStatus;
  display_order: number;
};

const EMPTY_LANDING_PHOTO_FORM: LandingPhotoForm = {
  alt_text: "",
  status: "published",
  display_order: 0,
};

const LANDING_PHOTO_BUCKET = "landing-page-photos";

function FieldHint({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium normal-case tracking-normal text-muted-foreground">
      <Info className="h-3.5 w-3.5 text-gold-deep" />
      {text}
    </span>
  );
}

function Admin() {
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [activeMenu, setActiveMenu] = useState<"students" | "social" | "blogs" | "photos" | "reviews">("students");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(EMPTY_SOCIAL_LINKS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogForm, setBlogForm] = useState<BlogForm>(EMPTY_BLOG_FORM);
  const [landingPhotos, setLandingPhotos] = useState<LandingPhoto[]>([]);
  const [landingPhotoForm, setLandingPhotoForm] = useState<LandingPhotoForm>(EMPTY_LANDING_PHOTO_FORM);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialForm, setTestimonialForm] = useState<TestimonialForm>(EMPTY_TESTIMONIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialSaving, setSocialSaving] = useState(false);
  const [socialStatus, setSocialStatus] = useState("");
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogStatus, setBlogStatus] = useState("");
  const [photosLoading, setPhotosLoading] = useState(false);
  const [photosSaving, setPhotosSaving] = useState(false);
  const [photoStatus, setPhotoStatus] = useState("");
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [testimonialSaving, setTestimonialSaving] = useState(false);
  const [testimonialStatus, setTestimonialStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadInquiries = async () => {
    setLoading(true);
    setError("");

    const { data, error: functionError } = await supabase.functions.invoke("get-inquiries");

    if (functionError) {
      setError(functionError.message);
      setLoading(false);
      return;
    }

    setInquiries(data?.inquiries ?? []);
    setLoading(false);
  };

  const loadSocialLinks = async () => {
    setSocialLoading(true);
    setSocialStatus("");
    setError("");

    const { data, error: settingsError } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "social_links")
      .maybeSingle();

    if (settingsError) {
      setError(settingsError.message);
      setSocialLoading(false);
      return;
    }

    if (data?.value && typeof data.value === "object") {
      const value = data.value as Partial<SocialLinks>;
      setSocialLinks({
        facebook: value.facebook || "",
        instagram: value.instagram || "",
        linkedin: value.linkedin || "",
      });
    }

    setSocialLoading(false);
  };

  const loadBlogs = async () => {
    setBlogsLoading(true);
    setBlogStatus("");
    setError("");

    const { data, error: blogsError } = await supabase
      .from("blog_posts")
      .select("id, title, slug, meta_title, meta_description, excerpt, content, status, published_at, created_at, updated_at")
      .order("updated_at", { ascending: false });

    if (blogsError) {
      setError(blogsError.message);
      setBlogsLoading(false);
      return;
    }

    setBlogPosts((data ?? []) as BlogPost[]);
    setBlogsLoading(false);
  };

  const loadTestimonials = async () => {
    setTestimonialsLoading(true);
    setTestimonialStatus("");
    setError("");

    const { data, error: testimonialsError } = await supabase
      .from("testimonials")
      .select("id, quote, name, role, rating, status, display_order, created_at, updated_at")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (testimonialsError) {
      setError(testimonialsError.message);
      setTestimonialsLoading(false);
      return;
    }

    setTestimonials((data ?? []) as Testimonial[]);
    setTestimonialsLoading(false);
  };

  const loadLandingPhotos = async () => {
    setPhotosLoading(true);
    setPhotoStatus("");
    setError("");

    const { data, error: photosError } = await supabase
      .from("landing_page_photos")
      .select("id, image_url, storage_path, alt_text, status, display_order, created_at, updated_at")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (photosError) {
      setError(photosError.message);
      setPhotosLoading(false);
      return;
    }

    setLandingPhotos((data ?? []) as LandingPhoto[]);
    setPhotosLoading(false);
  };

  const handleSocialSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSocialSaving(true);
    setSocialStatus("");
    setError("");

    const { error: functionError } = await supabase.functions.invoke("update-social-links", {
      body: socialLinks,
    });

    if (functionError) {
      setError(functionError.message);
      setSocialSaving(false);
      return;
    }

    setSocialStatus("Social links saved.");
    setSocialSaving(false);
  };

  const handleBlogSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBlogSaving(true);
    setBlogStatus("");
    setError("");

    const slug = blogForm.slug || createSlug(blogForm.title);
    const payload = {
      title: blogForm.title.trim(),
      slug,
      meta_title: blogForm.meta_title.trim() || null,
      meta_description: blogForm.meta_description.trim() || null,
      excerpt: blogForm.excerpt.trim() || null,
      content: blogForm.content.trim(),
      status: blogForm.status,
      published_at: blogForm.status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    const query = blogForm.id
      ? supabase.from("blog_posts").update(payload).eq("id", blogForm.id)
      : supabase.from("blog_posts").insert(payload);

    const { error: saveError } = await query;

    if (saveError) {
      setError(saveError.message);
      setBlogSaving(false);
      return;
    }

    setBlogForm(EMPTY_BLOG_FORM);
    setBlogStatus("Blog saved.");
    setBlogSaving(false);
    await loadBlogs();
  };

  const editBlog = (post: BlogPost) => {
    setBlogForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      meta_title: post.meta_title ?? "",
      meta_description: post.meta_description ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content,
      status: post.status,
    });
    setBlogStatus("");
  };

  const deleteBlog = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    setError("");
    const { error: deleteError } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    if (blogForm.id === post.id) setBlogForm(EMPTY_BLOG_FORM);
    await loadBlogs();
  };

  const handleTestimonialSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTestimonialSaving(true);
    setTestimonialStatus("");
    setError("");

    const payload = {
      quote: testimonialForm.quote.trim(),
      name: testimonialForm.name.trim(),
      role: testimonialForm.role.trim(),
      rating: testimonialForm.rating,
      status: testimonialForm.status,
      display_order: testimonialForm.display_order,
      updated_at: new Date().toISOString(),
    };

    const query = testimonialForm.id
      ? supabase.from("testimonials").update(payload).eq("id", testimonialForm.id)
      : supabase.from("testimonials").insert(payload);

    const { error: saveError } = await query;

    if (saveError) {
      setError(saveError.message);
      setTestimonialSaving(false);
      return;
    }

    setTestimonialForm(EMPTY_TESTIMONIAL_FORM);
    setTestimonialStatus("Review saved.");
    setTestimonialSaving(false);
    await loadTestimonials();
  };

  const editTestimonial = (testimonial: Testimonial) => {
    setTestimonialForm({
      id: testimonial.id,
      quote: testimonial.quote,
      name: testimonial.name,
      role: testimonial.role,
      rating: testimonial.rating,
      status: testimonial.status,
      display_order: testimonial.display_order,
    });
    setTestimonialStatus("");
  };

  const deleteTestimonial = async (testimonial: Testimonial) => {
    if (!window.confirm(`Delete review from "${testimonial.name}"?`)) return;
    setError("");
    const { error: deleteError } = await supabase.from("testimonials").delete().eq("id", testimonial.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    if (testimonialForm.id === testimonial.id) setTestimonialForm(EMPTY_TESTIMONIAL_FORM);
    await loadTestimonials();
  };

  const handlePhotoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoFiles(Array.from(e.currentTarget.files ?? []));
  };

  const handleLandingPhotoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (photoFiles.length === 0) {
      setError("Choose at least one photo to upload.");
      return;
    }

    setPhotosSaving(true);
    setPhotoStatus("");
    setError("");

    const uploadedPhotos = [];

    for (const [index, file] of photoFiles.entries()) {
      if (!file.type.startsWith("image/")) {
        setError(`${file.name} is not an image file.`);
        setPhotosSaving(false);
        return;
      }

      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
      const storagePath = `landing/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from(LANDING_PHOTO_BUCKET)
        .upload(storagePath, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        setError(uploadError.message);
        setPhotosSaving(false);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from(LANDING_PHOTO_BUCKET)
        .getPublicUrl(storagePath);

      uploadedPhotos.push({
        image_url: publicUrl.publicUrl,
        storage_path: storagePath,
        alt_text: landingPhotoForm.alt_text.trim() || null,
        status: landingPhotoForm.status,
        display_order: landingPhotoForm.display_order + index,
        updated_at: new Date().toISOString(),
      });
    }

    const { error: insertError } = await supabase.from("landing_page_photos").insert(uploadedPhotos);

    if (insertError) {
      setError(insertError.message);
      setPhotosSaving(false);
      return;
    }

    setLandingPhotoForm(EMPTY_LANDING_PHOTO_FORM);
    setPhotoFiles([]);
    setPhotoStatus("Photos uploaded.");
    setPhotosSaving(false);
    e.currentTarget.reset();
    await loadLandingPhotos();
  };

  const updateLandingPhoto = async (photo: LandingPhoto, payload: Pick<LandingPhoto, "status" | "display_order">) => {
    setError("");
    const { error: updateError } = await supabase
      .from("landing_page_photos")
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", photo.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await loadLandingPhotos();
  };

  const deleteLandingPhoto = async (photo: LandingPhoto) => {
    if (!window.confirm("Delete this landing page photo?")) return;
    setError("");

    const { error: storageError } = await supabase.storage
      .from(LANDING_PHOTO_BUCKET)
      .remove([photo.storage_path]);

    if (storageError) {
      setError(storageError.message);
      return;
    }

    const { error: deleteError } = await supabase.from("landing_page_photos").delete().eq("id", photo.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    await loadLandingPhotos();
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (session) {
      void loadInquiries();
    } else {
      setInquiries([]);
    }
  }, [session]);

  useEffect(() => {
    if (session && activeMenu === "social") {
      void loadSocialLinks();
    }
  }, [session, activeMenu]);

  useEffect(() => {
    if (session && activeMenu === "blogs") {
      void loadBlogs();
    }
  }, [session, activeMenu]);

  useEffect(() => {
    if (session && activeMenu === "reviews") {
      void loadTestimonials();
    }
  }, [session, activeMenu]);

  useEffect(() => {
    if (session && activeMenu === "photos") {
      void loadLandingPhotos();
    }
  }, [session, activeMenu]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
    }

    setSubmitting(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setPassword("");
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-surface px-4 py-10 text-foreground">
        <section className="mx-auto max-w-md rounded-lg border border-border bg-card p-6 text-center shadow-card">
          <div className="mx-auto grid h-11 w-11 place-items-center rounded-md bg-primary text-gold">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-primary">Loading admin...</h1>
          <p className="mt-2 text-sm text-muted-foreground">Checking your session.</p>
        </section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-surface px-4 py-10 text-foreground">
        <section className="mx-auto max-w-md rounded-lg border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-primary text-gold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-primary">Admin Login</h1>
              <p className="text-sm text-muted-foreground">View Career Craft Youth inquiries.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Email</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col md:flex-row">
        <aside className="border-b border-border bg-card px-4 py-5 md:w-64 md:shrink-0 md:border-b-0 md:border-r md:px-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gold-deep">Career Craft Youth</div>
            <h1 className="mt-2 text-xl font-semibold text-primary">Admin Panel</h1>
            <p className="mt-1 truncate text-xs text-muted-foreground">{session.user.email}</p>
          </div>

          <nav className="mt-6 grid gap-2">
            {[
              { id: "students", label: "Students", icon: GraduationCap },
              { id: "social", label: "Social Media", icon: Share2 },
              { id: "blogs", label: "Blogs", icon: FileText },
              { id: "photos", label: "Photos", icon: ImageIcon },
              { id: "reviews", label: "Reviews", icon: MessageSquareText },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveMenu(item.id as typeof activeMenu)}
                className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-left text-sm font-semibold transition ${
                  activeMenu === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/75 hover:bg-secondary hover:text-primary"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-gold-deep">Admin</div>
              <h2 className="mt-2 text-3xl font-semibold text-primary">
                {activeMenu === "students" ? "Students" : activeMenu === "social" ? "Social Media" : activeMenu === "blogs" ? "Blogs" : activeMenu === "photos" ? "Photos" : "Reviews"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeMenu === "students"
                  ? "View submitted inquiries from the contact form."
                  : activeMenu === "social"
                    ? "Update public social profile links."
                    : activeMenu === "blogs"
                      ? "Create and manage website blog posts."
                      : activeMenu === "photos"
                        ? "Upload and manage landing page photos."
                        : "Create and manage homepage reviews."}
              </p>
            </div>
            {activeMenu === "students" && (
              <button
                type="button"
                onClick={loadInquiries}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            )}
          </div>

          {error && <p className="mt-5 rounded-md border border-destructive/30 bg-white p-3 text-sm font-medium text-destructive">{error}</p>}

          {activeMenu === "students" ? (
            <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                  <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Submitted</th>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Phone</th>
                      <th className="px-4 py-3 font-semibold">Grade / Interest</th>
                      <th className="px-4 py-3 font-semibold">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td className="px-4 py-8 text-center text-muted-foreground" colSpan={5}>Loading inquiries...</td>
                      </tr>
                    ) : inquiries.length === 0 ? (
                      <tr>
                        <td className="px-4 py-8 text-center text-muted-foreground" colSpan={5}>No inquiries found.</td>
                      </tr>
                    ) : (
                      inquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="border-t border-border align-top">
                          <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                            {new Date(inquiry.created_at).toLocaleString()}
                          </td>
                          <td className="px-4 py-4 font-medium text-primary">{inquiry.full_name}</td>
                          <td className="whitespace-nowrap px-4 py-4">{inquiry.phone}</td>
                          <td className="px-4 py-4">{inquiry.grade_interest}</td>
                          <td className="max-w-md px-4 py-4 text-foreground/80">{inquiry.message || "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeMenu === "social" ? (
            <form onSubmit={handleSocialSubmit} className="mt-6 max-w-3xl rounded-lg border border-border bg-card p-5 shadow-card">
              <div className="grid gap-4">
                <div>
                  <label htmlFor="facebook-url" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Facebook URL</label>
                  <input
                    id="facebook-url"
                    type="url"
                    value={socialLinks.facebook}
                    onChange={(e) => setSocialLinks((prev) => ({ ...prev, facebook: e.target.value }))}
                    placeholder="https://www.facebook.com/your-page"
                    required
                    disabled={socialLoading || socialSaving}
                    className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="instagram-url" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Instagram URL</label>
                  <input
                    id="instagram-url"
                    type="url"
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks((prev) => ({ ...prev, instagram: e.target.value }))}
                    placeholder="https://www.instagram.com/your-profile"
                    required
                    disabled={socialLoading || socialSaving}
                    className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="linkedin-url" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">LinkedIn URL</label>
                  <input
                    id="linkedin-url"
                    type="url"
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks((prev) => ({ ...prev, linkedin: e.target.value }))}
                    placeholder="https://www.linkedin.com/in/your-profile"
                    required
                    disabled={socialLoading || socialSaving}
                    className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                  />
                </div>
              </div>

              {socialStatus && <p className="mt-4 text-sm font-medium text-primary">{socialStatus}</p>}

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={socialLoading || socialSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {socialSaving ? "Saving..." : "Save Links"}
                </button>
                <button
                  type="button"
                  onClick={loadSocialLinks}
                  disabled={socialLoading || socialSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw className="h-4 w-4" />
                  {socialLoading ? "Loading..." : "Reload"}
                </button>
              </div>
            </form>
          ) : activeMenu === "blogs" ? (
            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <section className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
                <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Blog Posts</h3>
                    <p className="text-sm text-muted-foreground">Draft and published SEO articles.</p>
                  </div>
                  <button
                    type="button"
                    onClick={loadBlogs}
                    disabled={blogsLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {blogsLoading ? "Loading..." : "Reload"}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Title</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Published</th>
                        <th className="px-4 py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogsLoading ? (
                        <tr>
                          <td className="px-4 py-8 text-center text-muted-foreground" colSpan={4}>Loading blogs...</td>
                        </tr>
                      ) : blogPosts.length === 0 ? (
                        <tr>
                          <td className="px-4 py-8 text-center text-muted-foreground" colSpan={4}>No blog posts yet.</td>
                        </tr>
                      ) : (
                        blogPosts.map((post) => (
                          <tr key={post.id} className="border-t border-border align-top">
                            <td className="px-4 py-4">
                              <div className="font-medium text-primary">{post.title}</div>
                              <div className="mt-1 text-xs text-muted-foreground">/blogs/{post.slug}</div>
                            </td>
                            <td className="px-4 py-4 capitalize">{post.status}</td>
                            <td className="px-4 py-4 text-muted-foreground">{formatBlogDate(post.published_at)}</td>
                            <td className="px-4 py-4">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => editBlog(post)}
                                  className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-accent"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => void deleteBlog(post)}
                                  className="rounded-md border border-destructive/30 bg-background px-3 py-1.5 text-xs font-semibold text-destructive transition hover:bg-destructive/10"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <form onSubmit={handleBlogSubmit} className="rounded-lg border border-border bg-card p-5 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{blogForm.id ? "Edit Blog" : "New Blog"}</h3>
                    <p className="text-sm text-muted-foreground">Create SEO-friendly published articles.</p>
                  </div>
                  {blogForm.id && (
                    <button
                      type="button"
                      onClick={() => setBlogForm(EMPTY_BLOG_FORM)}
                      className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-primary hover:bg-accent"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="mt-5 grid gap-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="blog-title" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Title</label>
                      <FieldHint text="Main blog heading shown to readers." />
                    </div>
                    <input
                      id="blog-title"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value, slug: prev.slug || createSlug(e.target.value) }))}
                      required
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="blog-slug" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Slug</label>
                      <FieldHint text="URL name. Use lowercase words with hyphens." />
                    </div>
                    <input
                      id="blog-slug"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, slug: createSlug(e.target.value) }))}
                      placeholder="career-guidance-after-10th"
                      required
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="blog-meta-title" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Meta Title</label>
                      <FieldHint text="SEO browser title. Keep it short." />
                    </div>
                    <input
                      id="blog-meta-title"
                      value={blogForm.meta_title}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, meta_title: e.target.value }))}
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="blog-meta-description" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Meta Description</label>
                      <FieldHint text="SEO summary shown in search results." />
                    </div>
                    <textarea
                      id="blog-meta-description"
                      rows={3}
                      value={blogForm.meta_description}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, meta_description: e.target.value }))}
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="blog-excerpt" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Excerpt</label>
                      <FieldHint text="Short preview shown on the blogs page." />
                    </div>
                    <textarea
                      id="blog-excerpt"
                      rows={3}
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="blog-content" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Content</label>
                      <FieldHint text="Full article text. Use blank lines between paragraphs." />
                    </div>
                    <textarea
                      id="blog-content"
                      rows={10}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, content: e.target.value }))}
                      required
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="blog-status" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Status</label>
                      <FieldHint text="Draft is hidden. Published is visible on website." />
                    </div>
                    <select
                      id="blog-status"
                      value={blogForm.status}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, status: e.target.value as BlogStatus }))}
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                {blogStatus && <p className="mt-4 text-sm font-medium text-primary">{blogStatus}</p>}

                <button
                  type="submit"
                  disabled={blogSaving}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {blogSaving ? "Saving..." : "Save Blog"}
                </button>
              </form>
            </div>
          ) : activeMenu === "photos" ? (
            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <section className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
                <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Landing Page Photos</h3>
                    <p className="text-sm text-muted-foreground">Published photos appear in the homepage photo section.</p>
                  </div>
                  <button
                    type="button"
                    onClick={loadLandingPhotos}
                    disabled={photosLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {photosLoading ? "Loading..." : "Reload"}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                    <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Photo</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Order</th>
                        <th className="px-4 py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {photosLoading ? (
                        <tr>
                          <td className="px-4 py-8 text-center text-muted-foreground" colSpan={4}>Loading photos...</td>
                        </tr>
                      ) : landingPhotos.length === 0 ? (
                        <tr>
                          <td className="px-4 py-8 text-center text-muted-foreground" colSpan={4}>No photos uploaded yet.</td>
                        </tr>
                      ) : (
                        landingPhotos.map((photo) => (
                          <tr key={photo.id} className="border-t border-border align-top">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={photo.image_url}
                                  alt={photo.alt_text ?? "Landing page photo"}
                                  className="h-16 w-24 rounded-md object-cover"
                                  loading="lazy"
                                />
                                <div>
                                  <div className="font-medium text-primary">{photo.alt_text || "Landing page photo"}</div>
                                  <div className="mt-1 max-w-xs truncate text-xs text-muted-foreground">{photo.storage_path}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <select
                                value={photo.status}
                                onChange={(e) => void updateLandingPhoto(photo, { status: e.target.value as LandingPhotoStatus, display_order: photo.display_order })}
                                className="rounded-md border border-input bg-white px-3 py-2 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-primary/30"
                              >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                              </select>
                            </td>
                            <td className="px-4 py-4">
                              <input
                                type="number"
                                value={photo.display_order}
                                onChange={(e) => void updateLandingPhoto(photo, { status: photo.status, display_order: Number(e.target.value) })}
                                className="w-24 rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                              />
                            </td>
                            <td className="px-4 py-4">
                              <button
                                type="button"
                                onClick={() => void deleteLandingPhoto(photo)}
                                className="rounded-md border border-destructive/30 bg-background px-3 py-1.5 text-xs font-semibold text-destructive transition hover:bg-destructive/10"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <form onSubmit={handleLandingPhotoSubmit} className="rounded-lg border border-border bg-card p-5 shadow-card">
                <div>
                  <h3 className="text-xl font-semibold text-primary">Upload Photos</h3>
                  <p className="text-sm text-muted-foreground">Select one or more image files for the landing page.</p>
                </div>

                <div className="mt-5 grid gap-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="landing-photo-files" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Photos</label>
                      <FieldHint text="You can select multiple files." />
                    </div>
                    <input
                      id="landing-photo-files"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoFileChange}
                      required
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    {photoFiles.length > 0 && (
                      <p className="mt-2 text-xs font-medium text-muted-foreground">{photoFiles.length} file{photoFiles.length === 1 ? "" : "s"} selected.</p>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="landing-photo-alt" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Alt Text</label>
                      <FieldHint text="Optional description for accessibility." />
                    </div>
                    <input
                      id="landing-photo-alt"
                      value={landingPhotoForm.alt_text}
                      onChange={(e) => setLandingPhotoForm((prev) => ({ ...prev, alt_text: e.target.value }))}
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="landing-photo-status" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Status</label>
                      <select
                        id="landing-photo-status"
                        value={landingPhotoForm.status}
                        onChange={(e) => setLandingPhotoForm((prev) => ({ ...prev, status: e.target.value as LandingPhotoStatus }))}
                        className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="landing-photo-order" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Starting Order</label>
                      <input
                        id="landing-photo-order"
                        type="number"
                        value={landingPhotoForm.display_order}
                        onChange={(e) => setLandingPhotoForm((prev) => ({ ...prev, display_order: Number(e.target.value) }))}
                        required
                        className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                </div>

                {photoStatus && <p className="mt-4 text-sm font-medium text-primary">{photoStatus}</p>}

                <button
                  type="submit"
                  disabled={photosSaving}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Upload className="h-4 w-4" />
                  {photosSaving ? "Uploading..." : "Upload Photos"}
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <section className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
                <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Reviews</h3>
                    <p className="text-sm text-muted-foreground">Published reviews appear on the homepage testimonials section.</p>
                  </div>
                  <button
                    type="button"
                    onClick={loadTestimonials}
                    disabled={testimonialsLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {testimonialsLoading ? "Loading..." : "Reload"}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                    <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Review</th>
                        <th className="px-4 py-3 font-semibold">Rating</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Order</th>
                        <th className="px-4 py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonialsLoading ? (
                        <tr>
                          <td className="px-4 py-8 text-center text-muted-foreground" colSpan={5}>Loading reviews...</td>
                        </tr>
                      ) : testimonials.length === 0 ? (
                        <tr>
                          <td className="px-4 py-8 text-center text-muted-foreground" colSpan={5}>No reviews yet.</td>
                        </tr>
                      ) : (
                        testimonials.map((testimonial) => (
                          <tr key={testimonial.id} className="border-t border-border align-top">
                            <td className="px-4 py-4">
                              <div className="font-medium text-primary">{testimonial.name}</div>
                              <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                              <div className="mt-2 max-w-md text-foreground/80">{testimonial.quote}</div>
                            </td>
                            <td className="px-4 py-4">{testimonial.rating}</td>
                            <td className="px-4 py-4 capitalize">{testimonial.status}</td>
                            <td className="px-4 py-4">{testimonial.display_order}</td>
                            <td className="px-4 py-4">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => editTestimonial(testimonial)}
                                  className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-accent"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => void deleteTestimonial(testimonial)}
                                  className="rounded-md border border-destructive/30 bg-background px-3 py-1.5 text-xs font-semibold text-destructive transition hover:bg-destructive/10"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <form onSubmit={handleTestimonialSubmit} className="rounded-lg border border-border bg-card p-5 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{testimonialForm.id ? "Edit Review" : "New Review"}</h3>
                    <p className="text-sm text-muted-foreground">Write the review exactly as it should appear.</p>
                  </div>
                  {testimonialForm.id && (
                    <button
                      type="button"
                      onClick={() => setTestimonialForm(EMPTY_TESTIMONIAL_FORM)}
                      className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-primary hover:bg-accent"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="mt-5 grid gap-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="review-name" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Name</label>
                      <FieldHint text="Person shown below the review." />
                    </div>
                    <input
                      id="review-name"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="review-role" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Role</label>
                      <FieldHint text="Example: Parent of Grade 12 Student." />
                    </div>
                    <input
                      id="review-role"
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm((prev) => ({ ...prev, role: e.target.value }))}
                      required
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="review-quote" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Review</label>
                      <FieldHint text="Main testimonial text." />
                    </div>
                    <textarea
                      id="review-quote"
                      rows={6}
                      value={testimonialForm.quote}
                      onChange={(e) => setTestimonialForm((prev) => ({ ...prev, quote: e.target.value }))}
                      required
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="review-rating" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Rating</label>
                      <input
                        id="review-rating"
                        type="number"
                        min={1}
                        max={5}
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                        required
                        className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="review-order" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Order</label>
                      <input
                        id="review-order"
                        type="number"
                        value={testimonialForm.display_order}
                        onChange={(e) => setTestimonialForm((prev) => ({ ...prev, display_order: Number(e.target.value) }))}
                        required
                        className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="review-status" className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Status</label>
                      <FieldHint text="Draft is hidden. Published is visible on homepage." />
                    </div>
                    <select
                      id="review-status"
                      value={testimonialForm.status}
                      onChange={(e) => setTestimonialForm((prev) => ({ ...prev, status: e.target.value as TestimonialStatus }))}
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                {testimonialStatus && <p className="mt-4 text-sm font-medium text-primary">{testimonialStatus}</p>}

                <button
                  type="submit"
                  disabled={testimonialSaving}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {testimonialSaving ? "Saving..." : "Save Review"}
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
