create extension if not exists "uuid-ossp";

create type readiness_status as enum ('GREEN', 'YELLOW', 'RED');

create table if not exists athlete_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  full_name text,
  birth_date date,
  sex text check (sex in ('MALE','FEMALE','OTHER')),
  height_cm numeric,
  weight_kg numeric,
  resting_hr integer,
  max_hr integer,
  threshold_pace_sec_per_km integer,
  easy_pace_sec_per_km integer,
  weekly_goal_km numeric,
  training_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists readiness_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  date date not null,
  resting_hr integer not null,
  sleep_hours numeric not null,
  fatigue_score integer not null,
  soreness_score integer,
  readiness_score numeric not null,
  status readiness_status not null,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_readiness_unique_day on readiness_logs(user_id, date);

create table if not exists workout_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  date date not null,
  type text not null check (type in ('RUN')),
  distance_km numeric,
  duration_sec integer,
  avg_pace_sec_per_km integer,
  avg_hr integer,
  training_load numeric,
  efficiency numeric,
  cardiac_drift numeric,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists strength_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  date date not null,
  total_volume numeric,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists strength_exercises (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references strength_sessions(id) on delete cascade,
  name text not null,
  sets integer not null,
  reps integer not null,
  load_kg numeric,
  created_at timestamptz not null default now()
);

create table if not exists weekly_summaries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  week_start date not null,
  total_distance_km numeric,
  total_load numeric,
  adherence numeric,
  efficiency numeric,
  created_at timestamptz not null default now()
);

create table if not exists prediction_tests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  date date not null,
  distance_km numeric not null,
  time_sec integer not null,
  predicted_10k_sec integer,
  predicted_half_sec integer,
  predicted_marathon_sec integer,
  created_at timestamptz not null default now()
);

create table if not exists alerts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  date date not null,
  type text not null,
  severity text not null check (severity in ('LOW','MEDIUM','HIGH')),
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists recommendations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  date date not null,
  message text not null,
  applied boolean default false,
  created_at timestamptz not null default now()
);

create table if not exists imports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  file_name text not null,
  status text not null check (status in ('PENDING','PROCESSED','FAILED')),
  rows_count integer,
  error text,
  created_at timestamptz not null default now()
);
