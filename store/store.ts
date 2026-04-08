import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  addMonths,
  formatDateKey,
  getSelectedRange,
  normalizeMonthKey,
  startOfMonth,
} from "@/lib/calendar";

type PlannerKind = "task" | "event";

type PlannerEntry = {
  createdAt: string;
  description: string;
  end: string;
  id: string;
  kind: PlannerKind;
  start: string;
  title: string;
};

type CalendarState = {
  deleteEntry: (entryId: string) => void;
  draftDescription: string;
  draftKind: PlannerKind;
  draftTitle: string;
  entries: PlannerEntry[];
  selectedEnd: string | null;
  selectedStart: string | null;
  viewedMonth: string;
  goToAdjacentMonth: (direction: 1 | -1) => void;
  saveEntry: () => void;
  selectDate: (dateKey: string) => void;
  setDraftDescription: (value: string) => void;
  setDraftKind: (kind: PlannerKind) => void;
  setDraftTitle: (value: string) => void;
  setViewedMonth: (dateKey: string) => void;
};

const today = new Date();
const initialMonth = formatDateKey(startOfMonth(today));

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      deleteEntry: (entryId) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== entryId),
        })),
      draftDescription: "",
      draftKind: "task",
      draftTitle: "",
      entries: [],
      selectedEnd: null,
      selectedStart: null,
      viewedMonth: initialMonth,
      goToAdjacentMonth: (direction) =>
        set((state) => {
          const nextMonth = addMonths(normalizeMonthKey(state.viewedMonth), direction);

          return {
            viewedMonth: formatDateKey(startOfMonth(nextMonth)),
          };
        }),
      saveEntry: () =>
        set((state) => {
          const range = getSelectedRange(state.selectedStart, state.selectedEnd);

          if (!range || !state.draftTitle.trim()) {
            return state;
          }

          return {
            draftDescription: "",
            draftKind: "task",
            draftTitle: "",
            entries: [
              {
                createdAt: new Date().toISOString(),
                description: state.draftDescription.trim(),
                end: range.end,
                id: `${range.start}:${range.end}:${Date.now()}`,
                kind: state.draftKind,
                start: range.start,
                title: state.draftTitle.trim(),
              },
              ...state.entries,
            ],
          };
        }),
      selectDate: (dateKey) =>
        set((state) => {
          const activeRange = getSelectedRange(state.selectedStart, state.selectedEnd);

          if (state.selectedStart && !state.selectedEnd && state.selectedStart === dateKey) {
            return {
              draftDescription: "",
              draftKind: "task",
              draftTitle: "",
              selectedEnd: null,
              selectedStart: null,
            };
          }

          if (activeRange && dateKey >= activeRange.start && dateKey <= activeRange.end) {
            return {
              draftDescription: "",
              draftKind: "task",
              draftTitle: "",
              selectedEnd: null,
              selectedStart: null,
            };
          }

          if (state.selectedStart && !state.selectedEnd) {
            return {
              selectedEnd: dateKey,
              viewedMonth: formatDateKey(startOfMonth(normalizeMonthKey(dateKey))),
            };
          }

          return {
            draftDescription: "",
            draftKind: "task",
            draftTitle: "",
            selectedEnd: null,
            selectedStart: dateKey,
            viewedMonth: formatDateKey(startOfMonth(normalizeMonthKey(dateKey))),
          };
        }),
      setDraftDescription: (value) => set({ draftDescription: value }),
      setDraftKind: (kind) => set({ draftKind: kind }),
      setDraftTitle: (value) => set({ draftTitle: value }),
      setViewedMonth: (dateKey) =>
        set({
          viewedMonth: formatDateKey(startOfMonth(normalizeMonthKey(dateKey))),
        }),
    }),
    {
      name: "wall-calendar-planner",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        entries: state.entries,
        selectedEnd: state.selectedEnd,
        selectedStart: state.selectedStart,
        viewedMonth: state.viewedMonth,
      }),
    },
  ),
);

export type { PlannerEntry, PlannerKind };
