"use client";

import type { CSSProperties } from "react";

import { formatLongDate } from "@/lib/calendar";
import type { PlannerEntry, PlannerKind } from "@/store/store";

type NotesPanelProps = {
  accent: string;
  description: string;
  entries: PlannerEntry[];
  kind: PlannerKind;
  selectionLabel: string | null;
  title: string;
  onDeleteEntry: (entryId: string) => void;
  onDescriptionChange: (value: string) => void;
  onKindChange: (value: PlannerKind) => void;
  onSave: () => void;
  onTitleChange: (value: string) => void;
};

export function NotesPanel({
  accent,
  description,
  entries,
  kind,
  selectionLabel,
  title,
  onDeleteEntry,
  onDescriptionChange,
  onKindChange,
  onSave,
  onTitleChange,
}: NotesPanelProps) {
  return (
    <section className="flex h-full flex-col rounded-lg border border-slate-200 bg-slate-50 p-4 transition-transform duration-300 hover:-translate-y-0.5 md:sticky md:top-5 md:max-h-[calc(100vh-2.5rem)] md:overflow-y-auto sm:p-5 lg:p-6">
      <div className="mb-4 flex flex-col gap-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
            Add note
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-800">
            {selectionLabel ?? "Select a date range"}
          </h3>
          <p className="mt-2 text-[13px] leading-5 text-slate-600">
            {selectionLabel
              ? `New items will be saved for ${selectionLabel}.`
              : "Choose a start and end date, then save a task or event for that range."}
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => onKindChange("task")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              kind === "task"
                ? "bg-white text-slate-900 shadow-sm"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            Task
          </button>
          <button
            type="button"
            onClick={() => onKindChange("event")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              kind === "event"
                ? "bg-white text-slate-900 shadow-sm"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            Event
          </button>
        </div>

        <label className="grid gap-2 text-sm font-medium text-slate-800">
          Title
          <input
            value={title}
            disabled={!selectionLabel}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Add a title"
            className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
            style={{ "--tw-ring-color": `${accent}55` } as CSSProperties}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-800">
          Description
          <textarea
            value={description}
            disabled={!selectionLabel}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Describe the task, note, or event details"
            className="calendar-scrollbar min-h-32 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
            style={{ "--tw-ring-color": `${accent}55` } as CSSProperties}
          />
        </label>

        <button
          type="button"
          disabled={!selectionLabel || !title.trim()}
          onClick={onSave}
          className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          style={{
            backgroundColor:
              selectionLabel && title.trim() ? accent : undefined,
          }}
        >
          Save {kind}
        </button>
      </div>

      <div className="mt-7 border-t border-slate-200 pt-5">
        <div className="mb-4 flex flex-col gap-2">
          <h4 className="text-lg font-semibold tracking-tight text-slate-800">
            Tasks and events
          </h4>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 transition-colors duration-300 hover:bg-slate-50">
            No tasks or events scheduled for this month yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-lg border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div
                      className="inline-flex rounded-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{
                        backgroundColor: `${accent}14`,
                        color: accent,
                      }}
                    >
                      {entry.kind}
                    </div>
                    <h4 className="mt-3 text-lg font-semibold text-slate-800">
                      {entry.title}
                    </h4>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                      {entry.start === entry.end
                        ? formatLongDate(entry.start)
                        : `${formatLongDate(entry.start)} - ${formatLongDate(entry.end)}`}
                    </p>
                    <button
                      type="button"
                      onClick={() => onDeleteEntry(entry.id)}
                      aria-label={`Delete ${entry.title}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-500 transition duration-300 hover:scale-105 hover:bg-red-100 hover:text-red-600"
                    >
                      <span className="-mt-0.5 text-base leading-none">-</span>
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {entry.description || "No extra description added."}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
