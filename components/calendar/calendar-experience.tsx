"use client";

import {
  addDays,
  endOfMonth,
  getMonthWindow,
  getRangeLength,
  getSelectedRange,
  getSelectionLabel,
  normalizeMonthKey,
  startOfMonth,
  startOfWeek,
} from "@/lib/calendar";
import { getMonthMetadata } from "@/lib/month-metadata";
import { useCalendarStore } from "@/store/store";

import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { HeroPanel } from "@/components/calendar/hero-panel";
import { NotesPanel } from "@/components/calendar/notes-panel";

export function CalendarExperience() {
  const viewedMonth = useCalendarStore((state) => state.viewedMonth);
  const selectedStart = useCalendarStore((state) => state.selectedStart);
  const selectedEnd = useCalendarStore((state) => state.selectedEnd);
  const draftKind = useCalendarStore((state) => state.draftKind);
  const draftTitle = useCalendarStore((state) => state.draftTitle);
  const draftDescription = useCalendarStore((state) => state.draftDescription);
  const entries = useCalendarStore((state) => state.entries);
  const deleteEntry = useCalendarStore((state) => state.deleteEntry);
  const goToAdjacentMonth = useCalendarStore(
    (state) => state.goToAdjacentMonth,
  );
  const selectDate = useCalendarStore((state) => state.selectDate);
  const setDraftKind = useCalendarStore((state) => state.setDraftKind);
  const setDraftTitle = useCalendarStore((state) => state.setDraftTitle);
  const setDraftDescription = useCalendarStore(
    (state) => state.setDraftDescription,
  );
  const saveEntry = useCalendarStore((state) => state.saveEntry);

  const monthDate = normalizeMonthKey(viewedMonth);
  const monthMetadata = getMonthMetadata(monthDate.getMonth());
  const activeRange = getSelectedRange(selectedStart, selectedEnd);
  const selectionLabel = getSelectionLabel(activeRange);
  const selectionLength = getRangeLength(activeRange);
  const visibleWindow = getMonthWindow(monthDate);
  const visibleEntries = entries.filter(
    (entry) => entry.start <= visibleWindow.end && entry.end >= visibleWindow.start,
  );
  const accent = monthMetadata.accent;
  const monthStats = getMonthStats({
    entries: visibleEntries,
    monthDate,
    selectedDays: selectionLength,
  });

  return (
    <main className="min-h-screen px-3 py-3 text-slate-900 sm:px-5 sm:py-5">
      <div className="min-h-[calc(100vh-1.5rem)] w-full rounded-[2rem] bg-slate-100 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:min-h-[calc(100vh-2.5rem)] sm:rounded-[2.5rem] sm:p-5">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_260px] lg:grid-cols-[280px_minmax(0,1fr)_300px]">
          <div className="hidden lg:block">
            <HeroPanel
              image={monthMetadata.image}
              label={monthMetadata.label}
              stats={monthStats}
              subtitle={monthMetadata.subtitle}
            />
          </div>

          <div className="grid gap-5 md:min-w-0">
            <div className="md:block lg:hidden">
              <HeroPanel
                image={monthMetadata.image}
                label={monthMetadata.label}
                stats={monthStats}
                subtitle={monthMetadata.subtitle}
              />
            </div>

            <CalendarGrid
              accent={accent}
              monthDate={monthDate}
              selectedEnd={selectedEnd}
              selectedStart={selectedStart}
              selectionLabel={selectionLabel}
              selectionLength={selectionLength}
              visibleRange={activeRange}
              onNextMonth={() => goToAdjacentMonth(1)}
              onPreviousMonth={() => goToAdjacentMonth(-1)}
              onSelectDate={selectDate}
            />
          </div>

          <div className="md:min-w-0">
            <NotesPanel
              accent={accent}
              description={draftDescription}
              entries={visibleEntries}
              kind={draftKind}
              selectionLabel={activeRange ? selectionLabel : null}
              title={draftTitle}
              onDeleteEntry={deleteEntry}
              onDescriptionChange={setDraftDescription}
              onKindChange={setDraftKind}
              onSave={saveEntry}
              onTitleChange={setDraftTitle}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function getMonthStats({
  entries,
  monthDate,
  selectedDays,
}: {
  entries: Array<{ end: string; start: string }>;
  monthDate: Date;
  selectedDays: number;
}) {
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const gridStart = startOfWeek(monthStart);
  const weekendDays = countWeekendDays(monthStart, monthEnd);
  const weekCounts = new Map<number, number>();

  for (const entry of entries) {
    const entryStart = normalizeMonthKey(entry.start);
    const entryEnd = normalizeMonthKey(entry.end);
    const clippedStart = entryStart < monthStart ? monthStart : entryStart;
    const clippedEnd = entryEnd > monthEnd ? monthEnd : entryEnd;
    const visitedWeeks = new Set<number>();

    for (
      let cursor = new Date(clippedStart);
      cursor <= clippedEnd;
      cursor = addDays(cursor, 1)
    ) {
      const diffInDays = Math.floor(
        (cursor.getTime() - gridStart.getTime()) / (1000 * 60 * 60 * 24),
      );
      const weekIndex = Math.floor(diffInDays / 7);

      if (!visitedWeeks.has(weekIndex)) {
        weekCounts.set(weekIndex, (weekCounts.get(weekIndex) ?? 0) + 1);
        visitedWeeks.add(weekIndex);
      }
    }
  }

  let busiestWeekIndex = 0;
  let busiestWeekCount = 0;

  for (const [weekIndex, count] of weekCounts.entries()) {
    if (count > busiestWeekCount) {
      busiestWeekIndex = weekIndex;
      busiestWeekCount = count;
    }
  }

  return {
    busiestWeekCount,
    busiestWeekLabel: `Week ${busiestWeekIndex + 1}`,
    savedItems: entries.length,
    selectedDays,
    weekendDays,
  };
}

function countWeekendDays(monthStart: Date, monthEnd: Date) {
  let total = 0;

  for (
    let cursor = new Date(monthStart);
    cursor <= monthEnd;
    cursor = addDays(cursor, 1)
  ) {
    const day = cursor.getDay();

    if (day === 0 || day === 6) {
      total += 1;
    }
  }

  return total;
}
