create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  grade_interest text not null,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
on public.contact_submissions (created_at desc);
