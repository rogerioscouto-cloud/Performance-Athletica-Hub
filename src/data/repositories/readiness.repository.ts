import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";
import type { ReadinessStatus } from "@/types";

export class ReadinessRepository extends SupabaseRepository {
  async create(input: {
    userId: string;
    date: string;
    restingHr: number;
    sleepHours: number;
    fatigueScore: number;
    sorenessScore?: number | null;
    readinessScore: number;
    status: ReadinessStatus;
  }) {
    const db = await this.db();
    const { error } = await db.from("readiness_logs").insert({
      user_id: input.userId,
      date: input.date,
      resting_hr: input.restingHr,
      sleep_hours: input.sleepHours,
      fatigue_score: input.fatigueScore,
      soreness_score: input.sorenessScore,
      readiness_score: input.readinessScore,
      status: input.status
    });
    if (error) throw new Error(`Erro ao salvar readiness: ${error.message}`);
  }

  async list(userId: string) {
    const db = await this.db();
    const { data, error } = await db
      .from("readiness_logs")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Array<Record<string, unknown>>;
  }
}
