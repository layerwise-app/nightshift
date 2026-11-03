/** Wall-clock parts of `date` in an IANA time zone. */
export function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    hourCycle: 'h23'
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  return {
    hour: Number(get('hour')),
    minute: Number(get('minute')),
    weekday: get('weekday'),
    month: Number(get('month')),
    year: Number(get('year'))
  };
}

/** `23:41` in the given time zone. */
export function clockText(date: Date, timeZone: string): string {
  const { hour, minute } = zonedParts(date, timeZone);
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

/** The calendar quarter of `date` in the given time zone. */
export function quarterOf(date: Date, timeZone: string) {
  const { month, year } = zonedParts(date, timeZone);
  const quarter = Math.floor((month - 1) / 3) + 1;
  return {
    quarter,
    year,
    /** `Q4·26` */
    short: `Q${quarter}·${String(year).slice(-2)}`,
    /** `Q4 2026` */
    long: `Q${quarter} ${year}`
  };
}

/**
 * Whether the studio is answering messages: weekdays between `from` and `to`
 * (24-hour clock, local time).
 */
export function isOnShift(
  date: Date,
  timeZone: string,
  shift: { from: number; to: number }
): boolean {
  const { hour, weekday } = zonedParts(date, timeZone);
  if (weekday === 'Sat' || weekday === 'Sun') return false;
  return hour >= shift.from && hour < shift.to;
}
