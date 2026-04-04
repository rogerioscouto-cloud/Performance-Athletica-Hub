import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";

export class ReadinessRepository extends SupabaseRepository {
  async create(input: {
    userId: string;
    date: string;
    restingHr: number;
    sleepHours: number;
    fatigueScore: number;
    sorenessScore?: number | null;
    readinessScore: number;
    status: "GREEN" | "YELLOW" | "RED";
  }) {
    const db = await this.db();

    const { error } = await (db as any).from("readiness_logs").insert({
      user_id: input.userId,
      date: input.date,
      resting_hr: input.restingHr,
      sleep_hours: input.sleepHours,
      fatigue_score: input.fatigueScore,
      soreness_score: input.sorenessScore,
      readiness_score: input.readinessScore,
      status: input.status
    });

    if (error) {
      throw new Error(`Erro ao salvar readiness: ${error.message}`);
    }
  }

  async getLatest(userId: string) {
    const db = await this.db();

    const { data, error } = await (db as any)
      .from("readiness_logs")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(`Erro ao buscar readiness: ${error.message}`);
    }

    return data;
  }

  async list(userId: string) {
    const db = await this.db();

    const { data, error } = await (db as any)
      .from("readiness_logs")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      throw new Error(`Erro ao listar readiness logs: ${error.message}`);
    }

    return (data ?? []) as Array<Record<string, any>>;
  }
}
