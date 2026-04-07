"use client";

import type { CSSProperties } from "react";

import {
  formatMonthKey,
  getRangeLength,
  getRangeNoteKey,
  getSelectionLabel,
  getVisibleRange,
  normalizeMonthKey,
} from "@/lib/calendar";
import { getMonthMetadata } from "@/lib/month-metadata";
import { useCalendarStore } from "@/store/store";
import { useTheme } from "next-themes";

import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { HeroPanelMobile } from "@/components/calendar/hero-panel-mobile";
import { NotesPanel } from "@/components/calendar/notes-panel";

export function CalendarExperienceMobile() {
  const viewedMonth = useCalendarStore((state) => state.viewedMonth);
  const selectedStart = useCalendarStore((state) => state.selectedStart);
  const selectedEnd = useCalendarStore((state) => state.selectedEnd);
  const hoveredDate = useCalendarStore((state) => state.hoveredDate);
  const monthNotes = useCalendarStore((state) => state.monthNotes);
  const rangeNotes = useCalendarStore((state) => state.rangeNotes);
  const goToAdjacentMonth = useCalendarStore(
    (state) => state.goToAdjacentMonth,
  );
  const setHoveredDate = useCalendarStore((state) => state.setHoveredDate);
  const selectDate = useCalendarStore((state) => state.selectDate);
  const applyPreset = useCalendarStore((state) => state.applyPreset);
  const clearSelection = useCalendarStore((state) => state.clearSelection);
  const updateMonthNote = useCalendarStore((state) => state.updateMonthNote);
  const updateRangeNote = useCalendarStore((state) => state.updateRangeNote);
  const { resolvedTheme, setTheme } = useTheme();

  const monthDate = normalizeMonthKey(viewedMonth);
  const monthKey = formatMonthKey(monthDate);
  const monthMetadata = getMonthMetadata(monthDate.getMonth());
  const visibleRange = getVisibleRange(selectedStart, selectedEnd, hoveredDate);
  const completeRangeKey =
    selectedStart && selectedEnd
      ? getRangeNoteKey(selectedStart, selectedEnd)
      : null;
  const selectionLabel = getSelectionLabel(visibleRange);
  const selectionLength = getRangeLength(visibleRange);
  const monthNote = monthNotes[monthKey] ?? "";
  const rangeNote = completeRangeKey
    ? (rangeNotes[completeRangeKey] ?? "")
    : "";

  return (
    <main
      className="min-h-screen px-4 py-5 text-slate-900 transition-colors sm:px-6 lg:px-8 dark:text-slate-100"
      style={
        {
          "--calendar-accent": monthMetadata.accent,
          "--calendar-glow": monthMetadata.glow,
        } as CSSProperties
      }
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        {/* <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Interactive wall calendar planner
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-500"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: monthMetadata.accent }}
            />
            {resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"}
          </button>
        </div> */}

        <div className="relative overflow-hidden rounded-4xl border border-white/70 bg-white/85 shadow-(--paper-shadow) backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/78">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_72%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_72%)]" />
          {/* <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center gap-6 pt-4 sm:gap-10">
            {[0, 1, 2].map((ring) => (
              <span
                key={ring}
                className="h-6 w-14 rounded-full border border-slate-300/70 bg-slate-100/90 shadow-inner dark:border-slate-700 dark:bg-slate-900/90"
              />
            ))}
          </div> */}

          <div className="grid lg:grid-cols-[minmax(340px,0.92fr)_minmax(0,1.3fr)]">
            {/* <div className="border-b border-slate-200/80 lg:border-r lg:border-b-0 dark:border-slate-800"> */}

            <div className="flex flex-col">
              <HeroPanelMobile
                accent={monthMetadata.accent}
                currentMonthDate={monthDate}
                image={monthMetadata.image}
                label={monthMetadata.label}
                monthNoteLength={monthNote.trim().length}
                selectionLabel={selectionLabel}
                selectionLength={selectionLength}
                subtitle={monthMetadata.subtitle}
                onApplyPreset={applyPreset}
                onClearSelection={clearSelection}
              />
              {/* </div> */}

              <div className="-mt-60 z-10">
                <CalendarGrid
                  accent={monthMetadata.accent}
                  monthDate={monthDate}
                  selectedEnd={selectedEnd}
                  selectedStart={selectedStart}
                  visibleRange={visibleRange}
                  onHoverDate={setHoveredDate}
                  onNextMonth={() => goToAdjacentMonth(1)}
                  onPreviousMonth={() => goToAdjacentMonth(-1)}
                  onSelectDate={selectDate}
                />
              </div>
              <NotesPanel
                accent={monthMetadata.accent}
                monthLabel={monthMetadata.label}
                monthNote={monthNote}
                rangeLabel={
                  selectedStart && selectedEnd ? selectionLabel : null
                }
                rangeNote={rangeNote}
                onMonthNoteChange={(note) => updateMonthNote(monthKey, note)}
                onRangeNoteChange={(note) => {
                  if (completeRangeKey) {
                    updateRangeNote(completeRangeKey, note);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
