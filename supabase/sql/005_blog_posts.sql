create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  meta_title text,
  meta_description text,
  excerpt text,
  content text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_published_at_idx
on public.blog_posts (status, published_at desc);

create index if not exists blog_posts_slug_idx
on public.blog_posts (slug);

alter table public.blog_posts enable row level security;

drop policy if exists "Allow public published blog reads" on public.blog_posts;
create policy "Allow public published blog reads"
on public.blog_posts
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admin can manage blog posts" on public.blog_posts;
create policy "Admin can manage blog posts"
on public.blog_posts
for all
to authenticated
using (auth.jwt() ->> 'email' = 'counselrupali@gmail.com')
with check (auth.jwt() ->> 'email' = 'counselrupali@gmail.com');
