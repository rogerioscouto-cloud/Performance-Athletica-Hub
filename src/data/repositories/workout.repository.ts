import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";

export class WorkoutRepository extends SupabaseRepository {
  async create(input: {
    userId: string;
    date: string;
    distanceKm: number;
    durationSec: number;
    avgPace: number;
    avgHr?: number | null;
    trainingLoad: number;
    efficiency: number;
  }) {
    const db = await this.db();

    const { error } = await (db as any).from("workout_logs").insert({
      user_id: input.userId,
      date: input.date,
      type: "RUN",
      distance_km: input.distanceKm,
      duration_sec: input.durationSec,
      avg_pace_sec_per_km: input.avgPace,
      avg_hr: input.avgHr ?? null,
      training_load: input.trainingLoad,
      efficiency: input.efficiency
    });

    if (error) {
      throw new Error(`Erro ao salvar treino: ${error.message}`);
    }
  }

  async list(userId: string) {
    const db = await this.db();

    const { data, error } = await (db as any)
      .from("workout_logs")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      throw new Error(`Erro ao listar treinos: ${error.message}`);
    }

    return data;
  }
}
      .eq("user_id", userId)
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Array<Record<string, any>>;
  }
}
