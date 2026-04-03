import { NextResponse } from "next/server";
import { z } from "zod";
import { ReadinessService } from "@/features/readiness/readiness.service";

const schema = z.object({
  date: z.string(),
  restingHeartRate: z.number(),
  sleepHours: z.number(),
  fatigueScore: z.number(),
  sorenessScore: z.number().optional().nullable()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);
    const service = new ReadinessService();
    return NextResponse.json(await service.createDailyReadiness(parsed));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao salvar prontidão.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const service = new ReadinessService();
    return NextResponse.json(await service.list());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao listar prontidão.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
