"use client";

import { useEffect, useState } from "react";

type AdaptedDay = {
  date: string;
  plannedDistanceKm: number;
  plannedIntensity: string;
  adjustedDistanceKm: number;
  adjustedIntensity: string;
  reason: string;
};

export function AdaptivePlan() {
  const [data, setData] = useState<AdaptedDay[]>([]);

  useEffect(() => {
    fetch("/api/adaptive").then((res) => res.json()).then((json) => setData(Array.isArray(json) ? json : []));
  }, []);

  return (
    <div className="space-y-4">
      {data.map((day, index) => (
        <div key={`${day.date}-${index}`} className="rounded-2xl border border-border p-4">
          <p className="font-medium">{day.date}</p>
          <p>{day.plannedDistanceKm} km → <strong>{day.adjustedDistanceKm} km</strong></p>
          <p>{day.plannedIntensity} → <strong>{day.adjustedIntensity}</strong></p>
          <p className="text-sm text-muted-foreground">{day.reason}</p>
        </div>
      ))}
    </div>
  );
}
