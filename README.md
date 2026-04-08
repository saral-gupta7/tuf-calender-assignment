# TUF Calendar Assignment

A polished calendar planning experience built for the TUF frontend assignment. The app combines month-specific imagery, date-range selection, task and event planning, and responsive UI patterns in a layout designed to feel premium on both desktop and mobile.

## Links

- Live Demo: [calendar.srlgpta.xyz](https://calendar.srlgpta.xyz/)
- GitHub Repository: [saral-gupta7/tuf-calender-assignment](https://github.com/saral-gupta7/tuf-calender-assignment)

## What It Includes

- Month-aware visual design with dedicated artwork and accent colors for each month.
- Single-month calendar with range selection, hover states, and mobile-friendly interaction sizing.
- Task and event creation for a selected day or date range.
- Local persistence using Zustand so saved entries remain available after refresh.
- Compact month stats panel for a quick overview of saved items, selected days, weekends, and busiest week.
- A single polished theme in the current implementation. A manual light/dark toggle is not available yet.
- Responsive 3-column desktop layout that collapses cleanly for tablet and mobile screens.

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand
- Motion for React

## Project Structure

- `app/page.tsx` renders the main calendar experience.
- `components/calendar/*` contains the hero panel, calendar grid, and planner sidebar.
- `store/store.ts` manages selection state, entries, and persistence.
- `lib/calendar.ts` contains date utilities and range helpers.
- `lib/month-metadata.ts` maps each month to its artwork, copy, and accent color.

## Core Interactions

1. Click a day to set the start date.
2. Click another day to complete the range.
3. Add a task or event with a title and description.
4. Save the entry to store it in local browser storage.
5. Reopen the app later and continue from the saved state.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed locally

### Install dependencies

```bash
bun install
```

### Start the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
bun run build
bun run start
```

### Lint the project

```bash
bun run lint
```

## Available Scripts

- `bun run dev` starts the local development server.
- `bun run build` creates the production build.
- `bun run start` runs the built app in production mode.
- `bun run lint` runs ESLint with `--fix`.

## Notes

- Saved tasks and events are stored in the browser with Zustand persistence.
- The current codebase ships a single polished visual theme.
