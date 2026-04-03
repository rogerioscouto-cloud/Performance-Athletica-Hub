import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";
import type { Recommendation } from "@/domain/alerts/types";

export class RecommendationsRepository extends SupabaseRepository {
  async insert(userId: string, date: string, recs: Recommendation[]) {
    const db = await this.db();

    const payload = recs.map((rec) => ({
      user_id: userId,
      date,
      message: rec.message
    }));

    const { error } = await (db as any).from("recommendations").insert(payload);

    if (error) {
      throw new Error(`Erro ao salvar recomendações: ${error.message}`);
    }
  }
}
