import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type SocialLinks = {
  facebook: string;
  instagram: string;
  linkedin: string;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const adminEmail = Deno.env.get("ADMIN_EMAIL")?.toLowerCase();
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey || !adminEmail) {
    return json({ error: "Server is missing required Supabase function secrets." }, 500);
  }

  if (!token) {
    return json({ error: "Missing authorization token." }, 401);
  }

  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userError } = await authClient.auth.getUser(token);

  if (userError || !userData.user?.email) {
    return json({ error: "Invalid admin session." }, 401);
  }

  if (userData.user.email.toLowerCase() !== adminEmail) {
    return json({ error: "This account is not allowed to update social links." }, 403);
  }

  const body = await req.json().catch(() => null) as Partial<SocialLinks> | null;
  const socialLinks = normalizeSocialLinks(body);

  if (!socialLinks) {
    return json({ error: "Please provide valid HTTPS URLs for Facebook, Instagram, and LinkedIn." }, 400);
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const { error } = await adminClient
    .from("site_settings")
    .upsert({
      key: "social_links",
      value: socialLinks,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    return json({ error: error.message }, 500);
  }

  return json({ socialLinks });
});

function normalizeSocialLinks(body: Partial<SocialLinks> | null): SocialLinks | null {
  if (!body) return null;

  const facebook = normalizeUrl(body.facebook);
  const instagram = normalizeUrl(body.instagram);
  const linkedin = normalizeUrl(body.linkedin);

  if (!facebook || !instagram || !linkedin) return null;

  return { facebook, instagram, linkedin };
}

function normalizeUrl(value: unknown) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}
