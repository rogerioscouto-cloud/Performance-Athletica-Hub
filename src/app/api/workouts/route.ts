import { NextResponse } from "next/server";
import { z } from "zod";
import { WorkoutService } from "@/features/workouts/workout.service";

const schema = z.object({
  date: z.string(),
  distanceKm: z.number(),
  durationSec: z.number(),
  avgHeartRate: z.number().optional().nullable()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);
    const service = new WorkoutService();
    return NextResponse.json(await service.createRun(parsed));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao salvar treino.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const service = new WorkoutService();
    return NextResponse.json(await service.list());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao listar treinos.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
