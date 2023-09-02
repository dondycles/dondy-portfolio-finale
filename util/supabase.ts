import { createClient } from "@supabase/supabase-js";

const supabseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabaseAdmin = createClient(
  supabseUrl as string,
  supabaseKey as string
);
