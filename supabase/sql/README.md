# Supabase SQL

Run these files in Supabase SQL Editor when setting up a new project.

Recommended order:

1. `001_contact_submissions.sql`
2. `002_contact_submission_policies.sql`
3. `004_site_settings.sql`
4. `005_blog_posts.sql`
5. `006_testimonials.sql`

Current admin setup uses Supabase Auth email check inside the `get-inquiries` Edge Function:

- Allowed email: `counselrupali@gmail.com`
- Required function secret: `ADMIN_EMAIL`
- Required function secret: `SUPABASE_SERVICE_ROLE_KEY`

`003_admin_users_optional.sql` is only for a future table-based admin model. It is not required for the current admin email setup.
