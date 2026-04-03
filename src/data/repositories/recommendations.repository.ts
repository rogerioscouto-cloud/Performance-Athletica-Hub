import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";
import type { Recommendation } from "@/domain/alerts/types";

export class RecommendationsRepository extends SupabaseRepository {
  async insert(userId: string, date: string, recommendations: Recommendation[]) {
    if (recommendations.length === 0) return;
    const db = await this.db();
    const { error } = await db.from("recommendations").insert(
      recommendations.map((recommendation) => ({
        user_id: userId,
        date,
        message: recommendation.message
      }))
    );
    if (error) throw new Error(error.message);
  }
}
