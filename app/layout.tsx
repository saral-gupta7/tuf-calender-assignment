import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wall Calendar Planner",
  description:
    "An interactive wall calendar with month-specific photography, range selection, and persisted notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
