import { NextResponse } from "next/server";
import { DashboardService } from "@/features/dashboard/dashboard.service";

export async function GET() {
  try {
    const service = new DashboardService();
    return NextResponse.json(await service.getDashboard());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao buscar dashboard.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
