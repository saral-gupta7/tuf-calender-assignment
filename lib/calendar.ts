const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function startOfWeek(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  const weekdayOffset = (next.getDay() + 6) % 7;
  next.setDate(next.getDate() - weekdayOffset);
  return next;
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function normalizeMonthKey(dateKey: string) {
  const [yearValue, monthValue, dayValue] = dateKey.split("-");
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = dayValue ? Number(dayValue) : 1;

  return new Date(year, month - 1, day);
}

export function formatMonthLabel(date: Date) {
  return monthFormatter.format(date);
}

export function formatLongDate(dateKey: string) {
  return longDateFormatter.format(normalizeMonthKey(dateKey));
}

export function formatShortDate(dateKey: string) {
  return shortDateFormatter.format(normalizeMonthKey(dateKey));
}

export function getMonthGrid(monthDate: Date) {
  const firstDay = startOfMonth(monthDate);
  const gridStart = startOfWeek(firstDay);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
}

export function isSameMonth(date: Date, monthDate: Date) {
  return (
    date.getFullYear() === monthDate.getFullYear() &&
    date.getMonth() === monthDate.getMonth()
  );
}

export function sortDateKeys(first: string, second: string) {
  return first <= second ? [first, second] : [second, first];
}

export function getSelectedRange(
  start: string | null,
  end: string | null,
): { end: string; start: string } | null {
  if (!start) {
    return null;
  }

  if (!end) {
    return {
      start,
      end: start,
    };
  }

  const [rangeStart, rangeEnd] = sortDateKeys(start, end);

  return {
    start: rangeStart,
    end: rangeEnd,
  };
}

export function isDateWithinRange(
  dateKey: string,
  range: { start: string; end: string } | null,
) {
  if (!range) {
    return false;
  }

  return dateKey >= range.start && dateKey <= range.end;
}

export function getRangeLength(range: { start: string; end: string } | null) {
  if (!range) {
    return 0;
  }

  const start = normalizeMonthKey(range.start);
  const end = normalizeMonthKey(range.end);
  const diff = end.getTime() - start.getTime();

  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

export function getSelectionLabel(range: { start: string; end: string } | null) {
  if (!range) {
    return "Pick a day to start";
  }

  if (range.start === range.end) {
    return formatLongDate(range.start);
  }

  return `${formatShortDate(range.start)} - ${formatLongDate(range.end)}`;
}

export function getMonthWindow(monthDate: Date) {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);

  return {
    start: formatDateKey(start),
    end: formatDateKey(end),
  };
}
