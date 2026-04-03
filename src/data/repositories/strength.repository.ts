import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";

export class StrengthRepository extends SupabaseRepository {
  async createSession(input: { userId: string; date: string; totalVolume: number; notes?: string | null }) {
    const db = await this.db();
    const { data, error } = await db
      .from("strength_sessions")
      .insert({
        user_id: input.userId,
        date: input.date,
        total_volume: input.totalVolume,
        notes: input.notes
      })
      .select("*")
      .single();

    if (error) throw new Error(`Erro ao criar sessão: ${error.message}`);
    return data as { id: string };
  }

  async insertExercises(sessionId: string, exercises: Array<{ name: string; sets: number; reps: number; loadKg?: number | null }>) {
    const db = await this.db();
    const { error } = await db.from("strength_exercises").insert(
      exercises.map((exercise) => ({
        session_id: sessionId,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        load_kg: exercise.loadKg ?? null
      }))
    );
    if (error) throw new Error(`Erro ao salvar exercícios: ${error.message}`);
  }

  async list(userId: string) {
    const db = await this.db();
    const { data, error } = await db
      .from("strength_sessions")
      .select("*, strength_exercises(*)")
      .eq("user_id", userId)
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Array<Record<string, any>>;
  }
}
