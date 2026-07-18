insert into storage.buckets (id, name, public)
values ('landing-page-photos', 'landing-page-photos', true)
on conflict (id) do update set public = true;

create table if not exists public.landing_page_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  storage_path text not null,
  alt_text text,
  status text not null default 'published' check (status in ('draft', 'published')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists landing_page_photos_status_display_order_idx
on public.landing_page_photos (status, display_order asc, created_at asc);

alter table public.landing_page_photos enable row level security;

drop policy if exists "Allow public published landing photo reads" on public.landing_page_photos;
create policy "Allow public published landing photo reads"
on public.landing_page_photos
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admin can manage landing photos" on public.landing_page_photos;
create policy "Admin can manage landing photos"
on public.landing_page_photos
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Allow public landing photo file reads" on storage.objects;
create policy "Allow public landing photo file reads"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'landing-page-photos');

drop policy if exists "Admin can upload landing photo files" on storage.objects;
create policy "Admin can upload landing photo files"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'landing-page-photos');

drop policy if exists "Admin can update landing photo files" on storage.objects;
create policy "Admin can update landing photo files"
on storage.objects
for update
to authenticated
using (bucket_id = 'landing-page-photos')
with check (bucket_id = 'landing-page-photos');

drop policy if exists "Admin can delete landing photo files" on storage.objects;
create policy "Admin can delete landing photo files"
on storage.objects
for delete
to authenticated
using (bucket_id = 'landing-page-photos');
