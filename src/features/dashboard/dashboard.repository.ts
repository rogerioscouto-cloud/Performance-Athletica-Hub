import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";

export class DashboardRepository extends SupabaseRepository {
  async getWorkoutSummary(userId: string) {
    const db = await this.db();
    const { data, error } = await db
      .from("workout_logs")
      .select("date, distance_km, training_load, efficiency")
      .eq("user_id", userId)
      .order("date", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as Array<Record<string, any>>;
  }

  async getReadinessSummary(userId: string) {
    const db = await this.db();
    const { data, error } = await db
      .from("readiness_logs")
      .select("date, readiness_score, status")
      .eq("user_id", userId)
      .order("date", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as Array<Record<string, any>>;
  }
}
