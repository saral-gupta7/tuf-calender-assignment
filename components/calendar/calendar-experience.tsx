"use client";

import {
  getMonthWindow,
  getRangeLength,
  getSelectedRange,
  getSelectionLabel,
  normalizeMonthKey,
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

  return (
    <main className="min-h-screen px-3 py-3 text-slate-900 sm:px-5 sm:py-5">
      <div className="min-h-[calc(100vh-1.5rem)] w-full rounded-[2rem] bg-slate-100 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:min-h-[calc(100vh-2.5rem)] sm:rounded-[2.5rem] sm:p-5">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_260px] lg:grid-cols-[280px_minmax(0,1fr)_300px]">
          <div className="hidden lg:block">
            <HeroPanel
              image={monthMetadata.image}
              label={monthMetadata.label}
              rangeLabel={activeRange ? selectionLabel : null}
              subtitle={monthMetadata.subtitle}
            />
          </div>

          <div className="grid gap-5 md:min-w-0">
            <div className="md:block lg:hidden">
              <HeroPanel
                image={monthMetadata.image}
                label={monthMetadata.label}
                rangeLabel={activeRange ? selectionLabel : null}
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
