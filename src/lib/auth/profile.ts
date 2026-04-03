import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/session";

export async function getCurrentAthleteProfile() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("athlete_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as {
    resting_hr?: number | null;
  } | null;
}
