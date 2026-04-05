"use client";

import { FormEvent, useState } from "react";

type StrengthFormState = {
  date: string;
  durationMinutes: string;
  caloriesBurned: string;
  sessionType: string;
  notes: string;
};

const initialFormState: StrengthFormState = {
  date: "",
  durationMinutes: "",
  caloriesBurned: "",
  sessionType: "",
  notes: "",
};

export function StrengthForm() {
  const [form, setForm] = useState<StrengthFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof StrengthFormState>(
    field: K,
    value: StrengthFormState[K]
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
        throw new Error("Informe a data da sessão.");
      }

      if (!form.durationMinutes.trim()) {
        throw new Error("Informe a duração da sessão.");
      }

      const durationMinutes = Number(form.durationMinutes);

      if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
        throw new Error("A duração deve ser um número válido.");
      }

      let caloriesBurned: number | null = null;

      if (form.caloriesBurned.trim()) {
        const parsedCalories = Number(form.caloriesBurned);

        if (!Number.isFinite(parsedCalories) || parsedCalories < 0) {
          throw new Error("Calorias inválidas.");
        }

        caloriesBurned = parsedCalories;
      }

      const response = await fetch("/api/strength", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: form.date,
          durationMinutes,
          caloriesBurned,
          sessionType: form.sessionType || undefined,
          notes: form.notes || undefined,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message || "Não foi possível salvar a sessão."
        );
      }

      setSuccessMessage("Sessão de força salva com sucesso.");
      setForm(initialFormState);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao salvar a sessão."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border p-5">
      <div>
        <h2 className="text-lg font-semibold">Registrar treino de força</h2>
        <p className="mt-1 text-sm text-gray-600">
          Registre sua sessão de forma simples e rápida.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Data</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duração (min)</label>
          <input
            type="number"
            min="0"
            placeholder="Ex.: 45"
            value={form.durationMinutes}
            onChange={(e) => updateField("durationMinutes", e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Calorias</label>
          <input
            type="number"
            min="0"
            placeholder="Opcional"
            value={form.caloriesBurned}
            onChange={(e) => updateField("caloriesBurned", e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tipo de sessão</label>
          <input
            type="text"
            placeholder="Ex.: membros inferiores"
            value={form.sessionType}
            onChange={(e) => updateField("sessionType", e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Observações</label>
        <textarea
          placeholder="Ex.: treino leve, sem dor, boa execução..."
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          className="w-full rounded-xl border px-3 py-2"
          rows={3}
          disabled={isSubmitting}
        />
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
          className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : "Salvar sessão"}
        </button>
      </div>
    </form>
  );
}
