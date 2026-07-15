drop policy if exists "Admin can manage blog posts" on public.blog_posts;
create policy "Admin can manage blog posts"
on public.blog_posts
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Admin can manage testimonials" on public.testimonials;
create policy "Admin can manage testimonials"
on public.testimonials
for all
to authenticated
using (true)
with check (true);
