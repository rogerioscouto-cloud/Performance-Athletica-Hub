import { NextResponse } from "next/server";
import { z } from "zod";
import { StrengthService } from "@/features/strength/strength.service";

const exerciseSchema = z.object({
  name: z.string(),
  sets: z.number(),
  reps: z.number(),
  loadKg: z.number().optional().nullable()
});

const schema = z.object({
  date: z.string(),
  exercises: z.array(exerciseSchema).min(1)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);
    const service = new StrengthService();
    return NextResponse.json(await service.createSession(parsed));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao salvar treino de força.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const service = new StrengthService();
    return NextResponse.json(await service.list());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao listar treinos de força.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
