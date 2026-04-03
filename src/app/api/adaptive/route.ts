import { NextResponse } from "next/server";
import { AdaptiveService } from "@/features/adaptive/adaptive.service";

export async function GET() {
  try {
    const service = new AdaptiveService();
    return NextResponse.json(await service.generatePlan());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao gerar plano adaptativo.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
