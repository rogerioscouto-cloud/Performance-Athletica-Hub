"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { todayDateInput } from "@/lib/utils";
import { readinessFormSchema, type ReadinessFormValues } from "./readiness.schema";

export function ReadinessForm() {
  const [result, setResult] = useState<{ score?: number; status?: string; error?: string } | null>(null);

  const form = useForm<ReadinessFormValues>({
    resolver: zodResolver(readinessFormSchema),
    defaultValues: {
      date: todayDateInput(),
      restingHeartRate: 56,
      sleepHours: 7,
      fatigueScore: 4,
      sorenessScore: 3
    }
  });

  const onSubmit = async (data: ReadinessFormValues) => {
    const response = await fetch("/api/readiness", {
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
          <Label htmlFor="restingHeartRate">FC de repouso</Label>
          <Input id="restingHeartRate" type="number" {...form.register("restingHeartRate", { valueAsNumber: true })} />
        </div>
        <div>
          <Label htmlFor="sleepHours">Sono (horas)</Label>
          <Input id="sleepHours" type="number" step="0.1" {...form.register("sleepHours", { valueAsNumber: true })} />
        </div>
        <div>
          <Label htmlFor="fatigueScore">Fadiga (1-10)</Label>
          <Input id="fatigueScore" type="number" {...form.register("fatigueScore", { valueAsNumber: true })} />
        </div>
        <div>
          <Label htmlFor="sorenessScore">Dor muscular (1-10)</Label>
          <Input id="sorenessScore" type="number" {...form.register("sorenessScore", { valueAsNumber: true })} />
        </div>
      </div>
      <Button type="submit">Salvar prontidão</Button>

      {result ? (
        <div className="rounded-2xl border border-border p-4 text-sm">
          {"error" in result && result.error ? (
            <p className="text-danger">{result.error}</p>
          ) : (
            <>
              <p>Score: {result.score}</p>
              <p>Status: {result.status}</p>
            </>
          )}
        </div>
      ) : null}
    </form>
  );
}
