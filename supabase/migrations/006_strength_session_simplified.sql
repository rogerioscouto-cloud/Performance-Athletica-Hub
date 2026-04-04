alter table public.strength_sessions
add column if not exists duration_minutes integer,
add column if not exists calories_burned integer,
add column if not exists session_type text;
