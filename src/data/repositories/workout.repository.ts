import { createClient } from "@/lib/supabase/server";

type CreateWorkoutRow = {
  date: string;
  distance_km: number;
  duration_sec: number;
  avg_hr: number | null;
};

export async function createWorkout(row: CreateWorkoutRow) {
  const supabase = await createClient();

  const { data, error } = await (supabase as any)
    .from("workouts")
    .insert(row)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Erro ao salvar treino.");
  }

  return data;
}

export async function listWorkouts(userId: string) {
  const supabase = await createClient();

  const { data, error } = await (supabase as any)
    .from("workouts")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message || "Erro ao listar treinos.");
  }

  return data ?? [];
}
