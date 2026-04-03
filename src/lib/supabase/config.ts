import { z } from "zod";

const publicSchema = z.object({
  url: z.string().url(),
  anonKey: z.string().min(1)
});

export function getSupabasePublicEnv() {
  return publicSchema.parse({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });
}
