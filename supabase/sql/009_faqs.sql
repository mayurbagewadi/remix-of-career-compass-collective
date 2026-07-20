create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists faqs_status_display_order_idx
on public.faqs (status, display_order asc, created_at asc);

alter table public.faqs enable row level security;

drop policy if exists "Allow public published FAQ reads" on public.faqs;
create policy "Allow public published FAQ reads"
on public.faqs
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admin can manage FAQs" on public.faqs;
create policy "Admin can manage FAQs"
on public.faqs
for all
to authenticated
using (true)
with check (true);

insert into public.faqs (id, question, answer, status, display_order)
values
  (
    '77777777-7777-4777-8777-777777777777',
    'What is the rule update for OCI cards issued after March 4, 2021, regarding IIT admissions?',
    'If your child obtained their OCI card subsequent to March 4, 2021, they are considered Foreign National candidates. They are excluded from competing in the general pool with Indian citizens and are eligible only for the 10% Foreign Supernumerary seats.',
    'published',
    1
  ),
  (
    '88888888-8888-4888-8888-888888888888',
    'Does a post-March 4, 2021 OCI holder need to write JEE Main to get into an IIT?',
    'No. OCI students classified under the Foreign National category can bypass the JEE Main exam entirely and register directly for JEE Advanced.',
    'published',
    2
  ),
  (
    '99999999-9999-4999-8999-999999999999',
    'What if the OCI card was issued before March 4, 2021?',
    'These candidates have a choice during JEE Advanced registration: they can apply either as a Foreign National, competing for the 10% supernumerary pool, or at par with Indian Nationals, competing in the OPEN merit category. This choice is final once submitted.',
    'published',
    3
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'Can OCI/NRI students get into NITs and IIITs without writing JEE Main?',
    'No. Admissions to premium central institutes like NITs, IIITs, and SPAs happen via the DASA (Direct Admission of Students Abroad) scheme, which now strictly requires a JEE Main score. Some pathways may also need SAT scores for eligibility, along with 60% PCM marks in boards.',
    'published',
    4
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'Can an OCI/NRI/CIWG candidate give MHT-CET?',
    'No. Candidates in these categories (NRI, OCI, CIWG) can apply for direct admission to undergraduate engineering (B.E./B.Tech) and other courses in Maharashtra under the 15% supernumerary quota.',
    'published',
    5
  )
on conflict (id) do nothing;
