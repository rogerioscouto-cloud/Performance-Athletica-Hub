"use client";

import { FormEvent, useState } from "react";
import { parseDurationToSeconds } from "@/lib/time";

type WorkoutFormState = {
  date: string;
  distanceKm: string;
  duration: string;
  avgHr: string;
};

const initialFormState: WorkoutFormState = {
  date: "",
  distanceKm: "",
  duration: "",
  avgHr: "",
};

export function WorkoutForm() {
  const [form, setForm] = useState<WorkoutFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof WorkoutFormState>(
    field: K,
    value: WorkoutFormState[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      setIsSubmitting(true);

      if (!form.date.trim()) {
        throw new Error("Informe a data do treino.");
      }

      if (!form.distanceKm.trim()) {
        throw new Error("Informe a distância em km.");
      }

      const distanceKm = Number(form.distanceKm);

      if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
        throw new Error("Informe uma distância válida em km.");
      }

      const durationSec = parseDurationToSeconds(form.duration);

      let avgHr: number | null = null;

      if (form.avgHr.trim()) {
        const parsedAvgHr = Number(form.avgHr);

        if (!Number.isFinite(parsedAvgHr) || parsedAvgHr <= 0) {
          throw new Error("A FC média deve ser um número válido.");
        }

        avgHr = parsedAvgHr;
      }

      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: form.date,
          distanceKm,
          durationSec,
          avgHr,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message || "Não foi possível salvar o treino."
        );
      }

      setSuccessMessage("Treino salvo com sucesso.");
      setForm(initialFormState);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao salvar o treino."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border p-5">
      <div>
        <h2 className="text-lg font-semibold">Registrar corrida</h2>
        <p className="mt-1 text-sm text-gray-600">
          Informe os dados do treino realizado.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="workout-date" className="text-sm font-medium">
            Data
          </label>
          <input
            id="workout-date"
            type="date"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="workout-distance" className="text-sm font-medium">
            Distância (km)
          </label>
          <input
            id="workout-distance"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex.: 8"
            value={form.distanceKm}
            onChange={(e) => updateField("distanceKm", e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="workout-duration" className="text-sm font-medium">
            Duração
          </label>
          <input
            id="workout-duration"
            type="text"
            inputMode="numeric"
            placeholder="Ex.: 00:42:30"
            value={form.duration}
            onChange={(e) => updateField("duration", e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            disabled={isSubmitting}
            required
          />
          <p className="text-xs text-gray-500">Use o formato HH:MM:SS</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="workout-avg-hr" className="text-sm font-medium">
            FC média
          </label>
          <input
            id="workout-avg-hr"
            type="number"
            min="0"
            placeholder="Opcional"
            value={form.avgHr}
            onChange={(e) => updateField("avgHr", e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {successMessage ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-black px-4 py-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : "Salvar treino"}
        </button>
      </div>
    </form>
  );
}
