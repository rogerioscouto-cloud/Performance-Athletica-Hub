import { createClient } from "@/lib/supabase/server";

type CreateStrengthSessionRow = {
  user_id: string;
  date: string;
  duration_minutes: number;
  calories_burned: number | null;
  session_type: string | null;
  notes: string | null;
};

export async function createStrengthSession(row: CreateStrengthSessionRow) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("strength_sessions")
    .insert(row)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Erro ao salvar sessão de força.");
  }

  return data;
}

export async function listStrengthSessions(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("strength_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message || "Erro ao listar sessões de força.");
  }

  return data ?? [];
}
