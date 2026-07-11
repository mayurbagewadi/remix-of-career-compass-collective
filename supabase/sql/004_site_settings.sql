create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "Allow public social link reads" on public.site_settings;
create policy "Allow public social link reads"
on public.site_settings
for select
to anon, authenticated
using (key = 'social_links');

-- Updates are intentionally not allowed through RLS.
-- Admin updates are handled by the update-social-links Edge Function.
