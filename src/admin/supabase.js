import { createClient } from "@supabase/supabase-js";

/**
 * Kadra's production Supabase project (same one the app and kadra.cam use). The anon key is
 * public by design — it is exactly as privileged as any stranger with the URL; every admin_*
 * RPC this dashboard calls re-checks is_kadra_admin() (email + Google provider) server-side,
 * so the ONLY account that gets anything back is mehmet.a.nadi@gmail.com signed in through
 * Google. No service key exists anywhere in this repo (ANILAR spec 33 §3/§5).
 *
 * PKCE + detectSessionInUrl handles the OAuth return: Google bounces through Supabase back to
 * /secretadmindashboard?code=…, and supabase-js exchanges the code for a session on load.
 */
const SUPABASE_URL = "https://kuqmrklguqbrxsyvorut.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1cW1ya2xndXFicnhzeXZvcnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NjcyNTQsImV4cCI6MjEwMDM0MzI1NH0._PwbRZgNOoG57VRcw_lh527gb--kF62mlBfG17gSES8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    flowType: "pkce",
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const ALLOWED_EMAIL = "mehmet.a.nadi@gmail.com";
