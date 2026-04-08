"use client";

import Image, { type StaticImageData } from "next/image";

import { AnimatePresence, motion } from "motion/react";

type HeroPanelProps = {
  image: StaticImageData;
  label: string;
  rangeLabel: string | null;
  subtitle: string;
};

export function HeroPanel({
  image,
  label,
  rangeLabel,
  subtitle,
}: HeroPanelProps) {
  return (
    <section className="flex h-full flex-col gap-5 ">
      <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-900 shadow-[0_24px_60px_rgba(12,28,28,0.18)]">
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

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
          Month overview
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-800">
          {label}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</p>
        <div className="mt-5 rounded-[1.25rem] bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">
            {rangeLabel ?? "Pick a day to start"}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Select a start date, then an end date to highlight a range. Clicking
            within the selected range clears it.
          </p>
        </div>
      </div>
    </section>
  );
}
