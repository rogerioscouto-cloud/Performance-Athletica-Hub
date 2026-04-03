alter table athlete_profiles enable row level security;
alter table readiness_logs enable row level security;
alter table workout_logs enable row level security;
alter table strength_sessions enable row level security;
alter table strength_exercises enable row level security;
alter table weekly_summaries enable row level security;
alter table prediction_tests enable row level security;
alter table alerts enable row level security;
alter table recommendations enable row level security;
alter table imports enable row level security;

create policy "user owns profile" on athlete_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns readiness" on readiness_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns workouts" on workout_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns strength sessions" on strength_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns weekly summaries" on weekly_summaries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns prediction tests" on prediction_tests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns alerts" on alerts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns recommendations" on recommendations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns imports" on imports for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "user owns strength exercises"
on strength_exercises
for all
using (
  exists (
    select 1 from strength_sessions s
    where s.id = session_id and s.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from strength_sessions s
    where s.id = session_id and s.user_id = auth.uid()
  )
);
