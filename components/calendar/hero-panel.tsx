"use client";

import Image, { type StaticImageData } from "next/image";

import { AnimatePresence, motion } from "motion/react";

type MonthStats = {
  busiestWeekCount: number;
  busiestWeekLabel: string;
  savedItems: number;
  selectedDays: number;
  weekendDays: number;
};

type HeroPanelProps = {
  image: StaticImageData;
  label: string;
  stats: MonthStats;
  subtitle: string;
};

export function HeroPanel({ image, label, stats, subtitle }: HeroPanelProps) {
  return (
    <section className="flex h-full flex-col gap-4">
      <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-900 shadow-[0_24px_60px_rgba(12,28,28,0.18)] transition-transform duration-300 hover:-translate-y-0.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={label}
            initial={{ opacity: 0.85, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative aspect-3/4"
          >
            <Image
              src={image}
              alt={`${label} seasonal artwork`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {label}
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/80">
                {subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
          Stats
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-800">
          {label}
        </h3>
        <p className="mt-2 text-[13px] leading-5 text-slate-600">{subtitle}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <StatCard
            helper="This month"
            label="Items"
            value={stats.savedItems.toString()}
          />
          <StatCard
            helper="Current range"
            label="Selected"
            value={stats.selectedDays.toString()}
          />
          <StatCard
            helper="This month"
            label="Weekends"
            value={stats.weekendDays.toString()}
          />
          <StatCard
            helper={`${stats.busiestWeekCount} saved item${
              stats.busiestWeekCount === 1 ? "" : "s"
            }`}
            label="Peak week"
            value={stats.busiestWeekLabel}
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  helper,
  label,
  value,
}: {
  helper: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 transition-transform duration-300 hover:-translate-y-0.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold tracking-tight text-slate-800">
        {value}
      </p>
      <p className="mt-1 text-[11px] leading-5 text-slate-500">{helper}</p>
    </div>
  );
}
