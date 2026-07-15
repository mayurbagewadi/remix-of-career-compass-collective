create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  status text not null default 'draft' check (status in ('draft', 'published')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonials_status_display_order_idx
on public.testimonials (status, display_order asc, created_at asc);

alter table public.testimonials enable row level security;

drop policy if exists "Allow public published testimonial reads" on public.testimonials;
create policy "Allow public published testimonial reads"
on public.testimonials
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admin can manage testimonials" on public.testimonials;
create policy "Admin can manage testimonials"
on public.testimonials
for all
to authenticated
using (true)
with check (true);

insert into public.testimonials (id, quote, name, role, rating, status, display_order)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'Career Craft Youth completely transformed how we approached our daughter''s college applications. The psychometric test revealed strengths we never knew she had, and the admission strategy was spot-on.',
    'Ananya Sharma',
    'Parent of Grade 12 Student',
    5,
    'published',
    1
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'I was confused between engineering and design. The stream discovery session gave me crystal-clear clarity. Today I''m studying at my dream design school - all thanks to Rupali ma''am.',
    'Rohan Mehta',
    'Student, Class 11',
    5,
    'published',
    2
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'As an NRI parent, finding trustworthy guidance for Indian university admissions was stressful. The Global Indian Desk made the entire process seamless and transparent.',
    'Priya Nair',
    'Parent of OCI Student',
    5,
    'published',
    3
  ),
  (
    '44444444-4444-4444-8444-444444444444',
    'The internship placement support helped me land a research role at a top lab. My college application stood out because I had real published work - not just grades.',
    'Aditya Kapoor',
    'Student, Class 12',
    5,
    'published',
    4
  ),
  (
    '55555555-5555-4555-8555-555555555555',
    'What impressed me most was the personalized attention. They didn''t just hand us a list of colleges - they built a complete roadmap tailored to my son''s personality and goals.',
    'Vikram Reddy',
    'Parent of Grade 10 Student',
    5,
    'published',
    5
  ),
  (
    '66666666-6666-4666-8666-666666666666',
    'The scholarship guidance alone saved us lakhs in tuition. They walked us through every form, every deadline, and every eligibility check. Truly life-changing support.',
    'Sunita Patel',
    'Parent of Grade 11 Student',
    5,
    'published',
    6
  )
on conflict (id) do nothing;
