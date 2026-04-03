"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { workoutSchema, type WorkoutFormValues } from "./workout.schema";
import { todayDateInput, formatSecondsToPace } from "@/lib/utils";

export function WorkoutForm() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      date: todayDateInput(),
      distanceKm: 8,
      durationSec: 2880,
      avgHeartRate: 145
    }
  });

  const onSubmit = async (data: WorkoutFormValues) => {
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    setResult(json);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-4 rounded-3xl border border-border bg-card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="date">Data</Label>
          <Input id="date" type="date" {...form.register("date")} />
        </div>
        <div>
          <Label htmlFor="distanceKm">Distância (km)</Label>
          <Input id="distanceKm" type="number" step="0.1" {...form.register("distanceKm", { valueAsNumber: true })} />
        </div>
        <div>
          <Label htmlFor="durationSec">Duração (segundos)</Label>
          <Input id="durationSec" type="number" {...form.register("durationSec", { valueAsNumber: true })} />
        </div>
        <div>
          <Label htmlFor="avgHeartRate">FC média</Label>
          <Input id="avgHeartRate" type="number" {...form.register("avgHeartRate", { valueAsNumber: true })} />
        </div>
      </div>
      <Button type="submit">Salvar treino</Button>

      {result && !("error" in result) ? (
        <div className="rounded-2xl border border-border p-4 text-sm">
          <p>Pace: {formatSecondsToPace(Number(result.paceSecPerKm))}</p>
          <p>Carga: {String(result.trainingLoad)}</p>
          <p>Eficiência: {String(result.efficiency)}</p>
        </div>
      ) : null}
    </form>
  );
}
