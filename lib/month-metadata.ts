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
    subtitle: "Cold air, crisp plans, and a bright new spread for the year ahead.",
    accent: "#5B62F6",
    glow: "rgba(91, 98, 246, 0.35)",
  },
  {
    image: february,
    label: "February",
    subtitle: "A softer palette for short days, warm light, and thoughtful notes.",
    accent: "#EC5A8F",
    glow: "rgba(236, 90, 143, 0.32)",
  },
  {
    image: march,
    label: "March",
    subtitle: "Fresh greens and longer afternoons bring movement back to the page.",
    accent: "#22A06B",
    glow: "rgba(34, 160, 107, 0.3)",
  },
  {
    image: april,
    label: "April",
    subtitle: "Rain-washed color and room for all the little shifts of spring.",
    accent: "#3A86FF",
    glow: "rgba(58, 134, 255, 0.32)",
  },
  {
    image: may,
    label: "May",
    subtitle: "Blooming energy, brighter mornings, and a fuller rhythm of plans.",
    accent: "#CC8A00",
    glow: "rgba(204, 138, 0, 0.28)",
  },
  {
    image: june,
    label: "June",
    subtitle: "Long golden evenings deserve a calendar that feels open and calm.",
    accent: "#00A6A6",
    glow: "rgba(0, 166, 166, 0.3)",
  },
  {
    image: july,
    label: "July",
    subtitle: "Sunlit days, strong contrast, and plenty of space for summer plans.",
    accent: "#F97316",
    glow: "rgba(249, 115, 22, 0.3)",
  },
  {
    image: august,
    label: "August",
    subtitle: "Late-season warmth, slower sunsets, and bold markers for getaways.",
    accent: "#EAB308",
    glow: "rgba(234, 179, 8, 0.3)",
  },
  {
    image: september,
    label: "September",
    subtitle: "A grounded reset for routines, projects, and a sharper weekly cadence.",
    accent: "#0EA5A4",
    glow: "rgba(14, 165, 164, 0.3)",
  },
  {
    image: october,
    label: "October",
    subtitle: "Warm shadows and rich contrast set up a cozy planning surface.",
    accent: "#C2410C",
    glow: "rgba(194, 65, 12, 0.3)",
  },
  {
    image: november,
    label: "November",
    subtitle: "Quiet texture, layered tones, and room to gather the month together.",
    accent: "#7C3AED",
    glow: "rgba(124, 58, 237, 0.3)",
  },
  {
    image: december,
    label: "December",
    subtitle: "High contrast, reflective notes, and a final month that still feels celebratory.",
    accent: "#2563EB",
    glow: "rgba(37, 99, 235, 0.3)",
  },
];

export function getMonthMetadata(monthIndex: number) {
  return MONTH_METADATA[monthIndex];
}
