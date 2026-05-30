export function formatBookingDate(date: Date): string {
  return new Intl.DateTimeFormat('en-NG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}

export function formatBookingTime(date: Date): string {
  return new Intl.DateTimeFormat('en-NG', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function getDefaultBookingDate(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getDefaultBookingTime(): Date {
  const time = new Date();
  time.setSeconds(0, 0);
  time.setMinutes(0);
  time.setHours(time.getHours() + 1);
  return time;
}

export function getMaximumBookingDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 90);
  date.setHours(23, 59, 59, 999);
  return date;
}
