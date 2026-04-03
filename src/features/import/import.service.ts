import type { ParsedWorkout } from "@/domain/imports/types";
import { WorkoutService } from "@/features/workouts/workout.service";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export class ImportService {
  private workoutService = new WorkoutService();

  async commit(data: ParsedWorkout[]) {
    const user = await requireUser();
    const db = await createClient();

    const { data: importRecord, error } = await db
      .from("imports")
      .insert({
        user_id: user.id,
        file_name: "manual_upload.xlsx",
        status: "PENDING",
        rows_count: data.length
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    try {
      for (const row of data) {
        await this.workoutService.createRun(row);
      }

      await db.from("imports").update({ status: "PROCESSED" }).eq("id", importRecord.id);
      return { ok: true, count: data.length };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha na importação";
      await db.from("imports").update({ status: "FAILED", error: message }).eq("id", importRecord.id);
      throw error;
    }
  }
}
