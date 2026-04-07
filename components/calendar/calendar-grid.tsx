"use client";

import {
  WEEKDAY_LABELS,
  formatDateKey,
  formatLongDate,
  formatMonthLabel,
  getMonthGrid,
  isDateWithinRange,
  isSameMonth,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";

type VisibleRange = {
  complete: boolean;
  end: string;
  start: string;
};

type CalendarGridProps = {
  accent: string;
  monthDate: Date;
  selectedEnd: string | null;
  selectedStart: string | null;
  visibleRange: VisibleRange | null;
  onHoverDate: (dateKey: string | null) => void;
  onNextMonth: () => void;
  onPreviousMonth: () => void;
  onSelectDate: (dateKey: string) => void;
};

export function CalendarGrid({
  accent,
  monthDate,
  selectedEnd,
  selectedStart,
  visibleRange,
  onHoverDate,
  onNextMonth,
  onPreviousMonth,
  onSelectDate,
}: CalendarGridProps) {
  const days = getMonthGrid(monthDate);
  const todayKey = formatDateKey(new Date());

  return (
    <section className="flex flex-1 flex-col p-4 pt-16 sm:p-6 sm:pt-18 lg:p-8 lg:pt-20">
      <div className="flex flex-col gap-4 border-slate-200/80 pb-6 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-center">
        <div className="mx-auto grid w-full max-w-md grid-cols-[3rem_minmax(0,1fr)_3rem] items-center gap-3 sm:max-w-lg sm:gap-6">
          <button
            type="button"
            onClick={onPreviousMonth}
            aria-label="Show previous month"
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-full justify-self-start",
              "hover:bg-white/5 p-3 transition-all duration-300",
            )}
          >
            <ChevronIcon direction="left" />
          </button>

          <h2 className="px-2 text-center text-2xl font-medium tracking-tight text-[#8E8E8E] sm:text-3xl">
            {formatMonthLabel(monthDate)}
          </h2>

          <button
            type="button"
            onClick={onNextMonth}
            aria-label="Show next month"
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-full justify-self-end",
              "hover:bg-white/5 p-3 transition-all duration-300",
            )}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
        {WEEKDAY_LABELS.map((day) => (
          <div key={day} className="py-3">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-0 ">
        {days.map((day) => {
          const dateKey = formatDateKey(day);
          const isCurrentMonth = isSameMonth(day, monthDate);
          const isToday = dateKey === todayKey;
          const isStart = dateKey === selectedStart;
          const isEnd = dateKey === selectedEnd;
          const inRange = isDateWithinRange(dateKey, visibleRange);
          const isPreviewOnly =
            visibleRange && !visibleRange.complete && !isStart && !isEnd;

          return (
            <button
              key={dateKey}
              type="button"
              aria-label={`Select ${formatLongDate(dateKey)}`}
              aria-pressed={isStart || isEnd}
              onClick={() => onSelectDate(dateKey)}
              onMouseEnter={(e) => {
                onHoverDate(dateKey);
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(1px) scale(1.03)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 8px 20px rgba(0,0,0,0.12)`;
              }}
              onMouseLeave={(e) => {
                onHoverDate(null);
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0) scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
              className={`group relative min-h-20 overflow-hidden border-[0.5px] sm:min-h-24 ${
                inRange
                  ? "border-transparent"
                  : "border-slate-200/70 bg-white/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/10 dark:hover:border-slate-900 dark:hover:bg-white/5"
              } ${!isCurrentMonth ? "text-slate-300 dark:text-slate-600" : ""}`}
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                ...(inRange
                  ? {
                      backgroundColor: isPreviewOnly
                        ? `${accent}14`
                        : `${accent}1F`,
                    }
                  : undefined),
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <span
                  className={`relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold transition ${
                    isStart || isEnd
                      ? "text-white shadow-lg"
                      : isCurrentMonth
                        ? "text-slate-800 dark:text-slate-100"
                        : "text-inherit"
                  }`}
                  style={
                    isStart || isEnd
                      ? {
                          backgroundColor: accent,
                          boxShadow: `0 14px 30px ${accent}4D`,
                        }
                      : undefined
                  }
                >
                  {day.getDate()}
                </span>
                {isToday && (
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
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
