export type RawRow = Record<string, unknown>;

export type ParsedWorkout = {
  date: string;
  distanceKm: number;
  durationSec: number;
  avgHeartRate?: number | null;
};
