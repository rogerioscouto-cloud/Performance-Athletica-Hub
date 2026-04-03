"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { strengthSchema, type StrengthFormValues } from "./strength.schema";
import { todayDateInput } from "@/lib/utils";

export function StrengthForm() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const form = useForm<StrengthFormValues>({
    resolver: zodResolver(strengthSchema),
    defaultValues: {
      date: todayDateInput(),
      exercises: [{ name: "Agachamento", sets: 3, reps: 8, loadKg: 80 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises"
  });

  const onSubmit = async (data: StrengthFormValues) => {
    const response = await fetch("/api/strength", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    setFeedback(json.error ? json.error : `Volume total: ${json.totalVolume}`);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-border bg-card p-6">
      <Input type="date" {...form.register("date")} />
      {fields.map((field, index) => (
        <div key={field.id} className="grid gap-2 md:grid-cols-5">
          <Input placeholder="Exercício" {...form.register(`exercises.${index}.name`)} />
          <Input type="number" placeholder="Séries" {...form.register(`exercises.${index}.sets`, { valueAsNumber: true })} />
          <Input type="number" placeholder="Reps" {...form.register(`exercises.${index}.reps`, { valueAsNumber: true })} />
          <Input type="number" placeholder="Carga kg" {...form.register(`exercises.${index}.loadKg`, { valueAsNumber: true })} />
          <Button type="button" variant="outline" onClick={() => remove(index)}>Remover</Button>
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={() => append({ name: "", sets: 3, reps: 10, loadKg: 0 })}>
          Adicionar exercício
        </Button>
        <Button type="submit">Salvar treino de força</Button>
      </div>
      {feedback ? <p className="text-sm text-muted-foreground">{feedback}</p> : null}
    </form>
  );
}
