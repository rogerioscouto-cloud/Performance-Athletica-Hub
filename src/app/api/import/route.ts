import { NextResponse } from "next/server";
import { z } from "zod";
import { ImportService } from "@/features/import/import.service";

const schema = z.object({
  data: z.array(
    z.object({
      date: z.string(),
      distanceKm: z.number(),
      durationSec: z.number(),
      avgHeartRate: z.number().nullable().optional()
    })
  )
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);
    const service = new ImportService();
    return NextResponse.json(await service.commit(parsed.data));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha na importação.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
