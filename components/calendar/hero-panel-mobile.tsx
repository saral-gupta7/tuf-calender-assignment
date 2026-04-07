"use client";

import Image, { type StaticImageData } from "next/image";

import type { CalendarPreset } from "@/store/store";
import { AnimatePresence, motion } from "motion/react";

type HeroPanelProps = {
  accent: string;
  currentMonthDate: Date;
  image: StaticImageData;
  label: string;
  monthNoteLength: number;
  selectionLabel: string;
  selectionLength: number;
  subtitle: string;
  onApplyPreset: (preset: CalendarPreset) => void;
  onClearSelection: () => void;
};

const presets: { id: CalendarPreset; label: string; description: string }[] = [
  { id: "today", label: "Today", description: "Jump to a one-day plan" },
  {
    id: "this-week",
    label: "This week",
    description: "Select the current week",
  },
  {
    id: "this-month",
    label: "This month",
    description: "Block the full month",
  },
];

export function HeroPanelMobile({
  accent,
  currentMonthDate,
  image,
  label,
  monthNoteLength,
  selectionLabel,
  selectionLength,
  subtitle,
  onApplyPreset,
  onClearSelection,
}: HeroPanelProps) {
  const monthKey = `${currentMonthDate.getFullYear()}-${currentMonthDate.getMonth()}`;

  return (
    <section className="flex h-full flex-col gap-6 p-4 pt-16 sm:p-6 sm:pt-18 lg:p-8 lg:pt-20">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
              Month Spotlight
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {label}
            </h2>
          </div>

          {/* <div
            className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{
              backgroundColor: `${accent}12`,
              color: accent,
            }}
          >
            Auto-saved
          </div> */}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border-white/60 bg-slate-950 shadow-2xl dark:border-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={monthKey}
            initial={{ opacity: 1, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.16, ease: "easeIn" }}
            className="relative aspect-4/5"
          >
            <Image
              src={image}
              alt={`${label} seasonal artwork`}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
              {/* <p className="mt-2 text-2xl font-semibold">{label}</p>

              <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
                {subtitle}
              </p> */}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Active selection
          </p>
          <p className="mt-3 text-lg font-semibold">{selectionLabel}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {selectionLength > 1
              ? `${selectionLength} consecutive days are highlighted.`
              : "Choose the same date twice for a one-day note or extend to build a range."}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Notes footprint
          </p>
          <p className="mt-3 text-lg font-semibold">
            {monthNoteLength} characters saved
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Monthly notes persist locally, so ideas stay attached to each
            calendar view.
          </p>
        </div>
      </div> */}

      {/* <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          Quick ranges
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset.id)}
              className="rounded-[1.25rem] border border-slate-200/70 bg-white/80 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700"
            >
              <span className="block text-sm font-semibold">
                {preset.label}
              </span>
              <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">
                {preset.description}
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={onClearSelection}
            className="rounded-[1.25rem] border border-dashed border-slate-300 bg-transparent px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-950 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
          >
            Clear current selection
          </button>
        </div>
      </div> */}
    </section>
  );
}
