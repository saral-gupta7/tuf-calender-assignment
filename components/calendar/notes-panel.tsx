"use client";

import type { CSSProperties } from "react";

type NotesPanelProps = {
  accent: string;
  monthLabel: string;
  monthNote: string;
  rangeLabel: string | null;
  rangeNote: string;
  onMonthNoteChange: (value: string) => void;
  onRangeNoteChange: (value: string) => void;
};

export function NotesPanel({
  accent,
  monthLabel,
  monthNote,
  rangeLabel,
  rangeNote,
  onMonthNoteChange,
  onRangeNoteChange,
}: NotesPanelProps) {
  return (
    <section className="border-t border-slate-200/80 p-4 sm:p-6 lg:p-8 dark:border-slate-800">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Integrated notes
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            Keep the plan attached to the month
          </h3>
        </div>

        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{
            backgroundColor: `${accent}10`,
            color: accent,
          }}
        >
          Saved in local storage
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-lg border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mb-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Monthly memo
            </p>
            <h4 className="mt-2 text-lg font-semibold">{monthLabel} notes</h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Capture reminders, goals, or context that applies to the whole
              month.
            </p>
          </div>

          <textarea
            value={monthNote}
            onChange={(event) => onMonthNoteChange(event.target.value)}
            placeholder={`Write your ${monthLabel.toLowerCase()} memo here...`}
            className="calendar-scrollbar min-h-40 w-full rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-transparent focus:ring-2 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-500"
            style={
              {
                "--tw-ring-color": `${accent}66`,
              } as CSSProperties
            }
          />
        </article>

        <article className="rounded-lg border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mb-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Range note
            </p>
            <h4 className="mt-2 text-lg font-semibold">
              {rangeLabel ?? "Complete a date range"}
            </h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Attach a note to a finished range. Tap the same day twice if you
              want a single-day entry instead.
            </p>
          </div>

          <textarea
            value={rangeNote}
            disabled={!rangeLabel}
            onChange={(event) => onRangeNoteChange(event.target.value)}
            placeholder={
              rangeLabel
                ? "Write a note for the selected range..."
                : "Finish selecting a range to unlock note attachment."
            }
            className="calendar-scrollbar min-h-40 w-full rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:disabled:bg-slate-900 dark:disabled:text-slate-500"
            style={
              {
                "--tw-ring-color": `${accent}66`,
              } as CSSProperties
            }
          />
        </article>
      </div>
    </section>
  );
}
