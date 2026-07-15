# Supabase Edge Functions

## get-inquiries

Private admin endpoint used by `/admin` to read `contact_submissions`.

## update-social-links

Private admin endpoint used by `/admin` to update landing-page social links.

Required secrets:

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Deploy:

```bash
supabase functions deploy get-inquiries --project-ref eszwpxmmddvgsrhhkqfq
supabase functions deploy update-social-links --project-ref eszwpxmmddvgsrhhkqfq
```
