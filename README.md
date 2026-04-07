# TUF Frontend Challenge

An interactive wall-calendar experience built for the frontend engineering assignment. The app combines month-specific imagery, date-range selection, and integrated notes in a single responsive layout.

## Feature Highlights

- Physical wall-calendar inspired layout with a large monthly hero image.
- Month-specific artwork that changes as the user navigates the calendar.
- Date-range selection with clear start, end, and in-between states.
- Integrated monthly notes plus notes attached to completed date ranges.
- Local persistence with Zustand so the selection and notes survive refreshes.
- Responsive layout tuned for both desktop and mobile use.
- Light and dark presentation modes.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand
- Motion

## Architecture Notes

- `app/page.tsx` keeps the route as a server component and mounts the interactive client experience.
- `components/calendar/*` splits the UI into focused pieces: hero, grid, and notes.
- `store/store.ts` owns the calendar interactions and persistence logic to avoid prop drilling.
- `lib/calendar.ts` contains pure date helpers, keeping selection logic separate from rendering.
- `lib/month-metadata.ts` maps each month to its image and visual styling.

## Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run lint` runs ESLint.

## Submission Checklist

- Add your deployed URL to this README if you publish the project.
- Add your screen-recording link showing desktop, mobile, range selection, and notes behavior.
