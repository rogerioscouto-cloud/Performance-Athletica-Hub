"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicEnv } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/types";

let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function createClient() {
  if (client) return client;
  const { url, anonKey } = getSupabasePublicEnv();
  client = createBrowserClient<Database>(url, anonKey);
  return client;
}
