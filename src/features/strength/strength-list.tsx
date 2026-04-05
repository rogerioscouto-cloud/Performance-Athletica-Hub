type StrengthSession = {
  id: string;
  date: string;
  duration_minutes: number;
  calories_burned: number | null;
  session_type: string | null;
  notes: string | null;
};

type StrengthListProps = {
  sessions?: StrengthSession[];
};

function formatDate(date: string): string {
  if (!date) return "-";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("pt-BR");
}

export function StrengthList({ sessions = [] }: StrengthListProps) {
  if (!sessions.length) {
    return (
      <div className="rounded-2xl border border-dashed p-6 text-sm text-gray-600">
        Nenhuma sessão de força registrada ainda.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="rounded-2xl border bg-white p-4 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Data
              </div>
              <div className="mt-1 font-medium text-gray-900">
                {formatDate(session.date)}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Duração
              </div>
              <div className="mt-1 font-medium text-gray-900">
                {session.duration_minutes} min
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Calorias
              </div>
              <div className="mt-1 font-medium text-gray-900">
                {session.calories_burned ?? "-"}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Tipo
              </div>
              <div className="mt-1 font-medium text-gray-900">
                {session.session_type ?? "-"}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Observações
              </div>
              <div className="mt-1 font-medium text-gray-900">
                {session.notes ?? "-"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
