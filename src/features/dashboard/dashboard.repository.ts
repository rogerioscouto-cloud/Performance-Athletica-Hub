import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";

export class DashboardRepository extends SupabaseRepository {
  async getWorkoutSummary(userId: string) {
    const db = await this.db();

    const { data, error } = await (db as any)
      .from("workout_logs")
      .select("date, distance_km, training_load, efficiency")
      .eq("user_id", userId);

    if (error) {
      throw new Error(`Erro ao buscar workouts: ${error.message}`);
    }

    return data ?? [];
  }

  async getReadinessSummary(userId: string) {
    const db = await this.db();

    const { data, error } = await (db as any)
      .from("readiness_logs")
      .select("date, readiness_score, status")
      .eq("user_id", userId);

    if (error) {
      throw new Error(`Erro ao buscar readiness: ${error.message}`);
    }

    return data ?? [];
  }
}
