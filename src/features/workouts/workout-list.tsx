"use client";

import { useEffect, useState } from "react";
import { formatSecondsToPace } from "@/lib/utils";

type Workout = {
  id: string;
  date: string;
  distance_km: number;
  duration_sec: number;
  avg_pace_sec_per_km: number;
  training_load?: number;
};

export function WorkoutList() {
  const [data, setData] = useState<Workout[]>([]);

  useEffect(() => {
    fetch("/api/workouts").then((res) => res.json()).then((json) => setData(Array.isArray(json) ? json : []));
  }, []);

  return (
    <div className="mt-8 space-y-3">
      <h2 className="text-lg font-semibold">Treinos registrados</h2>
      {data.map((item) => (
        <div key={item.id} className="rounded-2xl border border-border p-4 text-sm">
          <p className="font-medium">{item.date}</p>
          <p>{item.distance_km} km</p>
          <p>{item.duration_sec}s</p>
          <p>{formatSecondsToPace(item.avg_pace_sec_per_km)}</p>
        </div>
      ))}
    </div>
  );
}
