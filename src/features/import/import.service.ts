import { createWorkout } from "@/features/workouts/workout.service";
import type { ParsedWorkout } from "@/domain/imports/types";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export class ImportService {
  async commit(data: ParsedWorkout[]) {
    const user = await requireUser();
    const db = await createClient();

    const { data: importRecord, error } = await (db as any)
      .from("imports")
      .insert({
        user_id: user.id,
        file_name: "manual_upload.xlsx",
        status: "PENDING",
        rows_count: data.length,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar registro de importação: ${error.message}`);
    }

    try {
      for (const row of data) {
        await createWorkout({
          date: row.date,
          distanceKm: row.distanceKm,
          durationSec: row.durationSec,
          avgHr: row.avgHeartRate ?? null,
        });
      }

      const { error: updateError } = await (db as any)
        .from("imports")
        .update({ status: "PROCESSED" })
        .eq("id", importRecord.id);

      if (updateError) {
        throw new Error(`Erro ao finalizar importação: ${updateError.message}`);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Falha desconhecida na importação.";

      await (db as any)
        .from("imports")
        .update({
          status: "FAILED",
          error: message,
        })
        .eq("id", importRecord.id);

      throw err;
    }
  }
}
