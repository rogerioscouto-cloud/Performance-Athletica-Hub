export type StrengthExerciseInput = {
  name: string;
  sets: number;
  reps: number;
  loadKg?: number | null;
};

export type StrengthSessionInput = {
  date: string;
  exercises: StrengthExerciseInput[];
};

export type StrengthMetrics = {
  totalVolume: number;
};
