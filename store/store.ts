import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  addMonths,
  formatDateKey,
  formatMonthKey,
  getMonthRange,
  normalizeMonthKey,
  sortDateKeys,
  startOfMonth,
  startOfWeek,
} from "@/lib/calendar";

type CalendarPreset = "today" | "this-week" | "this-month" | "clear";

type CalendarState = {
  viewedMonth: string;
  hoveredDate: string | null;
  selectedStart: string | null;
  selectedEnd: string | null;
  monthNotes: Record<string, string>;
  rangeNotes: Record<string, string>;
  goToAdjacentMonth: (direction: 1 | -1) => void;
  setHoveredDate: (dateKey: string | null) => void;
  setViewedMonth: (dateKey: string) => void;
  selectDate: (dateKey: string) => void;
  applyPreset: (preset: CalendarPreset) => void;
  clearSelection: () => void;
  updateMonthNote: (monthKey: string, note: string) => void;
  updateRangeNote: (rangeKey: string, note: string) => void;
};

const today = new Date();
const initialMonth = formatDateKey(startOfMonth(today));

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      viewedMonth: initialMonth,
      hoveredDate: null,
      selectedStart: formatDateKey(today),
      selectedEnd: formatDateKey(today),
      monthNotes: {},
      rangeNotes: {},
      goToAdjacentMonth: (direction) =>
        set((state) => {
          const nextMonth = addMonths(normalizeMonthKey(state.viewedMonth), direction);

          return {
            viewedMonth: formatDateKey(startOfMonth(nextMonth)),
          };
        }),
      setHoveredDate: (dateKey) => set({ hoveredDate: dateKey }),
      setViewedMonth: (dateKey) =>
        set({
          viewedMonth: formatDateKey(startOfMonth(normalizeMonthKey(dateKey))),
        }),
      selectDate: (dateKey) =>
        set((state) => {
          // Clicking after a completed range starts a fresh selection cycle.
          if (!state.selectedStart || state.selectedEnd) {
            return {
              selectedStart: dateKey,
              selectedEnd: null,
              hoveredDate: null,
              viewedMonth: formatDateKey(startOfMonth(normalizeMonthKey(dateKey))),
            };
          }

          const [start, end] = sortDateKeys(state.selectedStart, dateKey);

          return {
            selectedStart: start,
            selectedEnd: end,
            hoveredDate: null,
            viewedMonth: formatDateKey(startOfMonth(normalizeMonthKey(dateKey))),
          };
        }),
      applyPreset: (preset) =>
        set(() => {
          const now = new Date();
          const todayKey = formatDateKey(now);

          if (preset === "clear") {
            return {
              selectedStart: null,
              selectedEnd: null,
              hoveredDate: null,
              viewedMonth: formatDateKey(startOfMonth(now)),
            };
          }

          if (preset === "today") {
            return {
              selectedStart: todayKey,
              selectedEnd: todayKey,
              hoveredDate: null,
              viewedMonth: formatDateKey(startOfMonth(now)),
            };
          }

          if (preset === "this-week") {
            const weekStart = startOfWeek(now);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);

            return {
              selectedStart: formatDateKey(weekStart),
              selectedEnd: formatDateKey(weekEnd),
              hoveredDate: null,
              viewedMonth: formatDateKey(startOfMonth(now)),
            };
          }

          const { start, end } = getMonthRange(now);

          return {
            selectedStart: formatDateKey(start),
            selectedEnd: formatDateKey(end),
            hoveredDate: null,
            viewedMonth: formatDateKey(startOfMonth(now)),
          };
        }),
      clearSelection: () =>
        set({
          selectedStart: null,
          selectedEnd: null,
          hoveredDate: null,
        }),
      updateMonthNote: (monthKey, note) =>
        set((state) => ({
          monthNotes: {
            ...state.monthNotes,
            [formatMonthKey(normalizeMonthKey(monthKey))]: note,
          },
        })),
      updateRangeNote: (rangeKey, note) =>
        set((state) => ({
          rangeNotes: {
            ...state.rangeNotes,
            [rangeKey]: note,
          },
        })),
    }),
    {
      name: "wall-calendar-planner",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        viewedMonth: state.viewedMonth,
        selectedStart: state.selectedStart,
        selectedEnd: state.selectedEnd,
        monthNotes: state.monthNotes,
        rangeNotes: state.rangeNotes,
      }),
    },
  ),
);

export type { CalendarPreset };
