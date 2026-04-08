"use client";

import {
  WEEKDAY_LABELS,
  formatDateKey,
  formatMonthLabel,
  getMonthGrid,
  isDateWithinRange,
  isSameMonth,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";

type CalendarGridProps = {
  accent: string;
  monthDate: Date;
  selectedEnd: string | null;
  selectedStart: string | null;
  selectionLabel: string;
  selectionLength: number;
  visibleRange: { end: string; start: string } | null;
  onNextMonth: () => void;
  onPreviousMonth: () => void;
  onSelectDate: (dateKey: string) => void;
};

export function CalendarGrid({
  accent,
  monthDate,
  selectedEnd,
  selectedStart,
  selectionLabel,
  selectionLength,
  visibleRange,
  onNextMonth,
  onPreviousMonth,
  onSelectDate,
}: CalendarGridProps) {
  return (
    <section className="flex flex-1 flex-col rounded-lg border border-slate-200 bg-white p-4 transition-transform duration-300 hover:-translate-y-0.5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-[3rem_minmax(0,1fr)_3rem] items-center gap-3">
          <button
            type="button"
            onClick={onPreviousMonth}
            aria-label="Show previous month"
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-full justify-self-start text-slate-800 transition hover:bg-slate-100",
            )}
          >
            <ChevronIcon direction="left" />
          </button>

          <h2 className="px-2 text-center text-2xl font-medium tracking-tight text-slate-800 sm:text-3xl">
            {formatMonthLabel(monthDate)}
          </h2>

          <button
            type="button"
            onClick={onNextMonth}
            aria-label="Show next month"
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-full justify-self-end text-slate-800 transition hover:bg-slate-100",
            )}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 xl:flex-row xl:items-center">
          <div>
            <p className="text-sm font-medium text-slate-700">
              {selectionLabel}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {!selectedStart
                ? "Click a day to place a start date"
                : !selectedEnd
                  ? "Pick another day to complete the range, or click the same day again to clear it"
                  : `${selectionLength} ${
                      selectionLength === 1 ? "day" : "days"
                    } highlighted in the current range`}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <MonthPanel
          accent={accent}
          monthDate={monthDate}
          selectedEnd={selectedEnd}
          selectedStart={selectedStart}
          visibleRange={visibleRange}
          onSelectDate={onSelectDate}
        />
      </div>
    </section>
  );
}

function MonthPanel({
  accent,
  monthDate,
  selectedEnd,
  selectedStart,
  visibleRange,
  onSelectDate,
}: {
  accent: string;
  monthDate: Date;
  selectedEnd: string | null;
  selectedStart: string | null;
  visibleRange: { end: string; start: string } | null;
  onSelectDate: (dateKey: string) => void;
}) {
  const days = getMonthGrid(monthDate);
  const todayKey = formatDateKey(new Date());

  return (
    <div>
      <div className="mb-5 grid grid-cols-7 gap-x-1.5 gap-y-2 text-center text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:gap-x-2">
        {WEEKDAY_LABELS.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 sm:gap-y-2.5">
        {days.map((day) => {
          const dateKey = formatDateKey(day);
          const isCurrentMonth = isSameMonth(day, monthDate);
          const isToday = dateKey === todayKey;
          const isStart = dateKey === selectedStart;
          const isEnd = dateKey === selectedEnd;
          const isSingleDay = Boolean(
            visibleRange && visibleRange.start === visibleRange.end,
          );
          const inRange = isDateWithinRange(dateKey, visibleRange);
          const isInsideRange = inRange && !isStart && !isEnd;
          const isRangeStart = Boolean(
            visibleRange &&
            visibleRange.start === dateKey &&
            visibleRange.start !== visibleRange.end,
          );
          const isRangeEnd = Boolean(
            visibleRange &&
            visibleRange.end === dateKey &&
            visibleRange.start !== visibleRange.end,
          );

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(dateKey)}
              className={cn(
                `group relative flex min-h-14 items-center justify-center overflow-hidden rounded-sm text-sm font-medium transition sm:min-h-16 ${
                  !isCurrentMonth ? "text-slate-400" : "text-slate-900"
                }`,
              )}
            >
              {!isInsideRange && !isStart && !isEnd && (
                <span
                  className="pointer-events-none absolute inset-1 rounded-sm opacity-0 transition group-hover:opacity-100"
                  style={{ backgroundColor: `${accent}14` }}
                />
              )}

              {isInsideRange && (
                <span
                  className="absolute inset-y-3 inset-x-0 sm:inset-y-2"
                  style={{ backgroundColor: `${accent}18` }}
                />
              )}

              {isRangeStart && (
                <span
                  className="absolute inset-y-3 left-1/2 right-0 sm:inset-y-2"
                  style={{ backgroundColor: `${accent}18` }}
                />
              )}

              {isRangeEnd && (
                <span
                  className="absolute inset-y-3 left-0 right-1/2 sm:inset-y-2"
                  style={{ backgroundColor: `${accent}18` }}
                />
              )}

              {(isStart || isEnd || (isStart && isSingleDay)) && (
                <span
                  className="absolute h-9 w-9 rounded-full sm:h-12 sm:w-12"
                  style={{ backgroundColor: accent }}
                />
              )}

              <span
                className={`relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
                  isStart || isEnd || (isStart && isSingleDay)
                    ? "text-white"
                    : ""
                }`}
              >
                {day.getDate()}
              </span>

              {isToday && !isStart && !isEnd && (
                <span
                  className="absolute bottom-2 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const rotation = direction === "left" ? "rotate(180 12 12)" : undefined;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform={rotation}>
        <path d="M8 4l8 8-8 8" />
      </g>
    </svg>
  );
}
