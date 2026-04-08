import type { StaticImageData } from "next/image";

import {
  april,
  august,
  december,
  february,
  january,
  july,
  june,
  march,
  may,
  november,
  october,
  september,
} from "@/public";

type MonthMetadata = {
  accent: string;
  glow: string;
  image: StaticImageData;
  label: string;
  subtitle: string;
};

const MONTH_METADATA: MonthMetadata[] = [
  {
    image: january,
    label: "January",
    subtitle:
      "Cold air, crisp plans, and a bright new spread for the year ahead.",
    accent: "#4F46E5",
    glow: "rgba(79, 70, 229, 0.34)",
  },
  {
    image: february,
    label: "February",
    subtitle:
      "A softer palette for short days, warm light, and thoughtful notes.",
    accent: "#EC4899",
    glow: "rgba(236, 72, 153, 0.32)",
  },
  {
    image: march,
    label: "March",
    subtitle:
      "Fresh greens and longer afternoons bring movement back to the page.",
    accent: "#14B8A6",
    glow: "rgba(20, 184, 166, 0.31)",
  },
  {
    image: april,
    label: "April",
    subtitle: "Rain-washed color and room for all the little shifts of spring.",
    accent: "#0EA5E9",
    glow: "rgba(14, 165, 233, 0.31)",
  },
  {
    image: may,
    label: "May",
    subtitle:
      "Blooming energy, brighter mornings, and a fuller rhythm of plans.",
    accent: "#84CC16",
    glow: "rgba(132, 204, 22, 0.3)",
  },
  {
    image: june,
    label: "June",
    subtitle:
      "Long golden evenings deserve a calendar that feels open and calm.",
    accent: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.31)",
  },
  {
    image: july,
    label: "July",
    subtitle:
      "Sunlit days, strong contrast, and plenty of space for summer plans.",
    accent: "#F97316",
    glow: "rgba(249, 115, 22, 0.31)",
  },
  {
    image: august,
    label: "August",
    subtitle:
      "Late-season warmth, slower sunsets, and bold markers for getaways.",
    accent: "#EAB308",
    glow: "rgba(234, 179, 8, 0.3)",
  },
  {
    image: september,
    label: "September",
    subtitle:
      "A grounded reset for routines, projects, and a sharper weekly cadence.",
    accent: "#22C55E",
    glow: "rgba(34, 197, 94, 0.3)",
  },
  {
    image: october,
    label: "October",
    subtitle: "Warm shadows and rich contrast set up a cozy planning surface.",
    accent: "#F05A28",
    glow: "rgba(240, 90, 40, 0.32)",
  },
  {
    image: november,
    label: "November",
    subtitle:
      "Quiet texture, layered tones, and room to gather the month together.",
    accent: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.32)",
  },
  {
    image: december,
    label: "December",
    subtitle:
      "High contrast, reflective notes, and a final month that still feels celebratory.",
    accent: "#2563EB",
    glow: "rgba(37, 99, 235, 0.32)",
  },
];

export function getMonthMetadata(monthIndex: number) {
  return MONTH_METADATA[monthIndex];
}
