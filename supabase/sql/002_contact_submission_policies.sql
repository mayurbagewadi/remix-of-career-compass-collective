alter table public.contact_submissions enable row level security;

drop policy if exists "Allow public contact submissions" on public.contact_submissions;
create policy "Allow public contact submissions"
on public.contact_submissions
for insert
to anon
with check (true);

-- No public select policy is added.
-- Admin reads are handled by the get-inquiries Edge Function using service role access.
