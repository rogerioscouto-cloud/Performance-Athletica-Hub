import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";
import type { Alert } from "@/domain/alerts/types";

export class AlertsRepository extends SupabaseRepository {
  async insertAlerts(userId: string, date: string, alerts: Alert[]) {
    if (alerts.length === 0) return;
    const db = await this.db();
    const { error } = await db.from("alerts").insert(
      alerts.map((alert) => ({
        user_id: userId,
        date,
        type: alert.type,
        severity: alert.severity,
        message: alert.message
      }))
    );
    if (error) throw new Error(error.message);
  }
}
