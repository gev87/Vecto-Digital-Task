export function formatDuration(seconds: number): string {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const hourStr = hours > 0 ? `${hours}h ` : "";
  const minuteStr = `${minutes}m`;

  return `${hourStr}${minuteStr}`;
}

