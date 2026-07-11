-- Optional future setup.
-- Use this only if admin access should be managed by table rows instead of the ADMIN_EMAIL Edge Function secret.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can view inquiries" on public.contact_submissions;
create policy "Admins can view inquiries"
on public.contact_submissions
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);
