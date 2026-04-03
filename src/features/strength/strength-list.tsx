"use client";

import { useEffect, useState } from "react";

type StrengthSession = {
  id: string;
  date: string;
  total_volume: number;
  strength_exercises: Array<{ id: string; name: string; sets: number; reps: number; load_kg: number | null }>;
};

export function StrengthList() {
  const [data, setData] = useState<StrengthSession[]>([]);

  useEffect(() => {
    fetch("/api/strength").then((res) => res.json()).then((json) => setData(Array.isArray(json) ? json : []));
  }, []);

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-lg font-semibold">Sessões de força</h2>
      {data.map((session) => (
        <div key={session.id} className="rounded-2xl border border-border p-4">
          <p className="font-medium">{session.date}</p>
          <p className="text-sm text-muted-foreground">Volume: {session.total_volume}</p>
          <div className="mt-2 space-y-1 text-sm">
            {session.strength_exercises.map((exercise) => (
              <p key={exercise.id}>
                {exercise.name} · {exercise.sets}x{exercise.reps} · {exercise.load_kg ?? 0} kg
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
