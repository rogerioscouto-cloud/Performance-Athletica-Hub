import type { ParsedWorkout, RawRow } from "@/domain/imports/types";

export function mapToWorkouts(rows: RawRow[]): ParsedWorkout[] {
  return rows.map((row) => ({
    date: String(row["date"] ?? row["Date"] ?? ""),
    distanceKm: Number(row["distance"] ?? row["Distance"] ?? row["distance_km"] ?? 0),
    durationSec: Number(row["duration_sec"] ?? row["Duration"] ?? row["duration"] ?? 0),
    avgHeartRate:
      row["hr"] !== undefined || row["avg_hr"] !== undefined
        ? Number(row["hr"] ?? row["avg_hr"])
        : null
  }));
}
