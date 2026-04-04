export function parseDurationToSeconds(input: string): number {
  if (!input) {
    throw new Error("Duração não informada.");
  }

  const normalized = input.trim();

  const regex = /^(\d{2}):([0-5]\d):([0-5]\d)$/;
  const match = normalized.match(regex);

  if (!match) {
    throw new Error("Formato inválido. Use HH:MM:SS.");
  }

  const [, hours, minutes, seconds] = match;

  return (
    Number(hours) * 3600 +
    Number(minutes) * 60 +
    Number(seconds)
  );
}

export function formatSecondsToDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00:00";
  }

  const total = Math.floor(seconds);

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = total % 60;

  return [hours, minutes, remainingSeconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}
