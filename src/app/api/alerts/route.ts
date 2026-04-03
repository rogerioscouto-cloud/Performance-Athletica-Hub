import { NextResponse } from "next/server";
import { z } from "zod";
import { AlertsService } from "@/features/alerts/alerts.service";

const schema = z.object({
  date: z.string()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);
    const service = new AlertsService();
    return NextResponse.json(await service.processToday(parsed.date));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao gerar alertas.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
