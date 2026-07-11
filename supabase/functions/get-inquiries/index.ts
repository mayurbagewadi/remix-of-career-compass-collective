import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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
    return json({ error: "This account is not allowed to view inquiries." }, 403);
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const { data, error } = await adminClient
    .from("contact_submissions")
    .select("id, full_name, phone, grade_interest, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return json({ error: error.message }, 500);
  }

  return json({ inquiries: data ?? [] });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}
