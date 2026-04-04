import { NextResponse } from "next/server";
import { z } from "zod";
import { createWorkout } from "@/features/workouts/workout.service";

const schema = z.object({
  date: z.string().min(1, "Informe a data."),
  distanceKm: z.number().positive("Informe uma distância válida."),
  durationSec: z.number().int().positive("Informe uma duração válida."),
  avgHr: z.number().positive().nullable().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        {
          ok: false,
          message: firstIssue?.message || "Dados inválidos.",
        },
        { status: 400 }
      );
    }

    const result = await createWorkout({
      date: parsed.data.date,
      distanceKm: parsed.data.distanceKm,
      durationSec: parsed.data.durationSec,
      avgHr: parsed.data.avgHr ?? null,
    });

    return NextResponse.json({
      ok: true,
      message: "Treino salvo com sucesso.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro interno ao salvar treino.",
      },
      { status: 500 }
    );
  }
}
