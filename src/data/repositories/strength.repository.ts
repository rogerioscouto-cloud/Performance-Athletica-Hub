import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";

type StrengthExerciseInsert = {
  name: string;
  sets: number;
  reps: number;
  loadKg?: number | null;
};

export class StrengthRepository extends SupabaseRepository {
  async createSession(input: {
    userId: string;
    date: string;
    totalVolume: number;
    notes?: string | null;
  }) {
    const db = await this.db();

    const { data, error } = await (db as any)
      .from("strength_sessions")
      .insert({
        user_id: input.userId,
        date: input.date,
        total_volume: input.totalVolume,
        notes: input.notes
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar sessão: ${error.message}`);
    }

    return data;
  }

  async insertExercises(sessionId: string, exercises: StrengthExerciseInsert[]) {
    const db = await this.db();

    const payload = exercises.map((exercise) => ({
      session_id: sessionId,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      load_kg: exercise.loadKg ?? null
    }));

    const { error } = await (db as any)
      .from("strength_exercises")
      .insert(payload);

    if (error) {
      throw new Error(`Erro ao salvar exercícios: ${error.message}`);
    }
  }

  async list(userId: string) {
    const db = await this.db();

    const { data, error } = await (db as any)
      .from("strength_sessions")
      .select(
        `
        *,
        strength_exercises (*)
      `
      )
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      throw new Error(`Erro ao listar sessões: ${error.message}`);
    }

    return data;
  }
}
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Array<Record<string, any>>;
  }
}
