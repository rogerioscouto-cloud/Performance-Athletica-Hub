"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { parseXlsx } from "./parser";
import { mapToWorkouts } from "./mapper";
import { validateWorkouts } from "./validator";

type PreviewRow = {
  date: string;
  distanceKm: number;
  durationSec: number;
  avgHeartRate?: number | null;
};

export function ImportUploader() {
  const [data, setData] = useState<PreviewRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setFeedback(null);
    setErrors([]);

    const raw = await parseXlsx(file);
    const mapped = mapToWorkouts(raw);
    const validation = validateWorkouts(mapped);

    if (!validation.valid) {
      setData([]);
      setErrors(validation.errors);
      return;
    }

    setData(mapped);
  };

  const commit = async () => {
    const response = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });

    const json = await response.json();
    setFeedback(json.error ? json.error : `Importados ${json.count ?? data.length} registros.`);
  };

  return (
    <div className="space-y-4 rounded-3xl border border-border bg-card p-6">
      <input
        type="file"
        accept=".xlsx"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      {errors.length > 0 ? (
        <div className="space-y-1 text-sm text-danger">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}

      {data.length > 0 ? (
        <>
          <Button onClick={commit}>Importar {data.length} registros</Button>
          <div className="space-y-2 text-sm">
            {data.slice(0, 5).map((row, index) => (
              <p key={`${row.date}-${index}`}>
                {row.date} · {row.distanceKm} km · {row.durationSec}s
              </p>
            ))}
          </div>
        </>
      ) : null}

      {feedback ? <p className="text-sm text-muted-foreground">{feedback}</p> : null}
    </div>
  );
}
