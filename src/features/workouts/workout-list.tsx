import { formatSecondsToDuration } from "@/lib/time";

type Workout = {
  id: string;
  date: string;
  distance_km: number;
  duration_sec: number;
  avg_hr: number | null;
  pace?: string | null;
};

type WorkoutListProps = {
  workouts: Workout[];
};

function formatDate(date: string): string {
  if (!date) return "-";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("pt-BR");
}

function calculatePace(distanceKm: number, durationSec: number): string {
  if (!distanceKm || !durationSec || distanceKm <= 0 || durationSec <= 0) {
    return "-";
  }

  const secPerKm = durationSec / distanceKm;
  const minutes = Math.floor(secPerKm / 60);
  const seconds = Math.round(secPerKm % 60);

  if (seconds === 60) {
    return `${String(minutes + 1).padStart(2, "0")}:00/km`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}/km`;
}

export function WorkoutList({ workouts }: WorkoutListProps) {
  if (!workouts?.length) {
    return (
      <div className="rounded-2xl border border-dashed p-6 text-sm text-gray-600">
        Nenhuma corrida registrada ainda.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => {
        const displayPace =
          workout.pace && workout.pace.trim().length > 0
            ? workout.pace
            : calculatePace(workout.distance_km, workout.duration_sec);

        return (
          <div
            key={workout.id}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Data
                </div>
                <div className="mt-1 font-medium text-gray-900">
                  {formatDate(workout.date)}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Distância
                </div>
                <div className="mt-1 font-medium text-gray-900">
                  {workout.distance_km} km
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Duração
                </div>
                <div className="mt-1 font-medium text-gray-900">
                  {formatSecondsToDuration(workout.duration_sec)}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Pace
                </div>
                <div className="mt-1 font-medium text-gray-900">
                  {displayPace}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  FC média
                </div>
                <div className="mt-1 font-medium text-gray-900">
                  {workout.avg_hr ?? "-"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
