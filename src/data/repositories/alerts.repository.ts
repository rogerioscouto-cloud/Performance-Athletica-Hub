import { SupabaseRepository } from "@/data/repositories/base/supabase-repository";
import type { Alert } from "@/domain/alerts/types";

export class AlertsRepository extends SupabaseRepository {
  async insertAlerts(userId: string, date: string, alerts: Alert[]) {
    const db = await this.db();

    const payload = alerts.map((alert) => ({
      user_id: userId,
      date,
      type: alert.type,
      severity: alert.severity,
      message: alert.message
    }));

    const { error } = await (db as any).from("alerts").insert(payload);

    if (error) {
      throw new Error(`Erro ao salvar alerts: ${error.message}`);
    }
  }
}
