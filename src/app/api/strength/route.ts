import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { strengthSchema } from "@/features/strength/strength.schema";
import { createStrengthSessionService } from "@/features/strength/strength.service";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          ok: false,
          message: "Usuário não autenticado.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const parsed = strengthSchema.safeParse(body);

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

    const result = await createStrengthSessionService({
      userId: user.id,
      date: parsed.data.date,
      durationMinutes: parsed.data.durationMinutes,
      caloriesBurned: parsed.data.caloriesBurned ?? null,
      sessionType: parsed.data.sessionType,
      notes: parsed.data.notes,
    });

    return NextResponse.json({
      ok: true,
      message: "Sessão de força salva com sucesso.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro interno ao salvar sessão.",
      },
      { status: 500 }
    );
  }
}
