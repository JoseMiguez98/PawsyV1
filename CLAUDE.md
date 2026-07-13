# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Source of truth

This repo already has detailed AI-agent docs — read them before making changes, they are not duplicated here:

- **[AGENTS.md](AGENTS.md)** — full project context: stack, folder structure, naming conventions, component/state/error-handling patterns, Clerk auth, domain model (Animal/Report/Match), and the decision-log process.
- **[DESIGN.md](DESIGN.md)** — design system source of truth (colors, typography, spacing, radii, tone). Read before touching any UI. Token values live in `tokens.ts` / `tokens.config.js`.
- **[memory/MEMORY.md](memory/MEMORY.md)** — running log of real project decisions and trade-offs. Check it before assuming why something is the way it is; append to it per the format in AGENTS.md when you make a non-obvious decision.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`) — the README's `npm` examples are stale, use `pnpm`.

```bash
pnpm install              # install deps
pnpm start                # expo start (Expo Go / dev client)
pnpm ios                  # expo start --ios
pnpm android               # expo start --android
pnpm web                   # expo start --web
pnpm lint                  # expo lint
pnpm tsc --noEmit          # type check (no dedicated test suite exists yet)
```

There is no test runner configured. Don't invent one — verify changes via `tsc --noEmit`, `pnpm lint`, and running the app.

## Architecture essentials

- **Expo Router** (`app/`) for file-based routing — these files are exempt from the `name.domain.format` naming convention used elsewhere.
- **Feature-first DDD** under `features/<feature>/{components,hooks,services,lib,types}`. Current features: `auth`, `reports`, `matches`, `common`. Not every feature has every subfolder yet (e.g. no `services/` files exist yet — `services/api.ts` described in AGENTS.md is aspirational, not yet implemented).
- Styling is **NativeWind/Tailwind only** — no `StyleSheet.create` except in rare exceptions; conditional classes go through `clsx`.
- Server state via **TanStack Query**, global UI state via **Zustand**, forms via **React Hook Form + Zod**. Never `useEffect`/`useState` for data fetching.
- Auth is **Clerk** (Google + Facebook OAuth only), provider wraps the app in `app/_layout.tsx`.
- This repo is **frontend only** — no matching/embeddings logic, no backend business logic, no direct DB access (those live in the sibling `pawsy-api` / `pawsy-matching` repos).
