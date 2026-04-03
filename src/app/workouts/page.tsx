import { WorkoutForm } from "@/features/workouts/workout-form";
import { WorkoutList } from "@/features/workouts/workout-list";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Treinos de corrida</h1>
      <WorkoutForm />
      <WorkoutList />
    </div>
  );
}
