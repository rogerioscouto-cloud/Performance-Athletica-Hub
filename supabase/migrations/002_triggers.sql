create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_athlete_profiles_updated on athlete_profiles;
create trigger trg_athlete_profiles_updated
before update on athlete_profiles
for each row execute procedure set_updated_at();
