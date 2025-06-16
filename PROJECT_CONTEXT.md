# FinIQ Lite – Project Context

You are helping me build "FinIQ Lite," a Next.js 14 + Tailwind CSS web app for Indian high-school students (grades 10–12) to learn financial literacy. The app is mobile-first, fun, and interactive, with a focus on Indian context (pocket money, college fees, etc.).

## Tech stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Supabase (for data and optional auth)
- All calculators/quizzes run client-side

## App structure
- Each module is its own page/component under `src/app/`
- Top-level navigation bar (in `NavBar.tsx`, a client component) is present on every page, with right-aligned, visually appealing links to all modules and the homepage. The active page is highlighted.

## Modules/pages
- `/` (Home): Colorful landing page with links to all modules.
- `/terms`: Placeholder for a glossary of financial terms.
- `/quizzes`: Placeholder for MCQ quizzes.
- `/flashcards`: Placeholder for flip-style flashcards.
- `/compound-interest`: Fully functional Compound Interest Simulator (inputs, output, SVG line graph, table).
- `/risk-vs-reward`: Drag-and-drop game for sorting scenarios into risk buckets, with feedback and reset.
- `/investments`: Placeholder for investment explainer cards.
- `/savings-goal`: Fully functional Savings Goal Calculator (choose to calculate time to goal or required monthly saving, with chart and table).

## Design guidelines
- Teen-friendly fonts and colors, emojis/icons, mobile-first, Indian context.

## Setup
- Supabase is set up for data (and optionally auth).
- `.env.local` is used for Supabase keys.

## Recent fixes
- Navigation bar is a client component for active link highlighting.
- All `usePathname` imports removed from server components.

## How I want to work
- I want to build and improve each module incrementally. Please always use best practices for Next.js and Tailwind, and keep the UI fun and accessible for teens.

**When I restart, please use this context to continue building or improving any module as requested.** 