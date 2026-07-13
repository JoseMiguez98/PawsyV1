# AGENTS.md — pawsy-mobile

Full project context for AI agents (Claude Code, Cursor, Antigravity, Augment).
Read this entire file before touching any code.

---

## What is Pawsy?

Pawsy is a mobile platform for reporting and finding lost and adoptable animals.
Users can publish reports of lost or found animals, and the system
automatically matches them using visual and textual similarity.

This repository is **only the mobile frontend**. The backend and the matching service
live in separate repositories.

---

## Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React Native + Expo | SDK 52 |
| Navigation | Expo Router | v4 |
| Styling | NativeWind + Tailwind CSS | v4 |
| Global state | Zustand | latest |
| Server state / cache | TanStack Query (React Query) | v5 |
| Forms | React Hook Form + Zod | latest |
| Auth | Clerk (Google + Facebook OAuth) | latest |
| Language | TypeScript | strict mode |

### Platform targets

The app is **hybrid iOS + Android**. All code must work on both platforms.
- Never use platform-specific APIs without an explicit fallback.
- Always mentally test the behavior on both iOS and Android before proposing code.
- Use `Platform.OS` only when absolutely necessary; prefer cross-platform abstractions.
- Camera and gallery images use `expo-image-picker` (no direct native libraries).
- Permissions are handled with `expo-permissions` or the respective Expo module APIs.

---

## Folder structure

```
pawsy-mobile/
├── app/                        # Expo Router — file-based routes (exempt from naming format)
│   ├── (auth)/                 # Group: authentication screens
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (tabs)/                 # Group: main navigation with tabs
│   │   ├── _layout.tsx
│   │   ├── index.tsx           # Home / reports feed
│   │   ├── search.tsx          # Search animals
│   │   ├── report.tsx          # Create new report
│   │   └── profile.tsx         # User profile
│   ├── report/
│   │   └── [id].tsx            # Report detail
│   ├── _layout.tsx             # Root layout (ClerkProvider, QueryProvider)
│   └── +not-found.tsx
│
├── features/                   # Domain features (DDD feature-first architecture)
│   ├── auth/                   # Authentication feature module
│   │   ├── components/         # Auth-specific UI components (e.g. login-card.component.tsx)
│   │   ├── hooks/              # Auth custom hooks
│   │   ├── services/           # Auth services
│   │   ├── lib/                # Auth-specific utilities
│   │   └── types/              # Auth-specific type definitions (e.g. user.type.ts)
│   │
│   ├── reports/                # Reports feature module (lost, found, adoption)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── lib/
│   │   └── types/
│   │
│   ├── matches/                # Matches feature module (visual similarity matches)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── lib/
│   │   └── types/
│   │
│   └── common/                 # Common/shared components, utilities, and assets
│       ├── components/         # Reusable primitives (e.g. button.component.tsx, input.component.tsx)
│       ├── lib/                # Reusable utils and helpers (e.g. utils.lib.ts, constants.lib.ts)
│       ├── hooks/              # Common custom hooks
│       └── services/           # Common base services (e.g. api.service.ts)
│
├── assets/                     # Images, icons, fonts
│
├── tailwind.config.js
├── app.json
├── babel.config.js
├── tsconfig.json
└── AGENTS.md                   # This file
```

---

## Code conventions

### Feature-First DDD Architecture
Each feature inside `features/` must follow this internal structure:
- `/features/<feature-name>`
  - `/components` (React components)
  - `/lib` (feature/shared utilities)
  - `/services` (service layer)
  - `/hooks` (custom hooks that consume the service layer)
  - `/types` (domain type definitions)

### Naming Conventions (Mandatory)
Use `name.domain.format` filenames for all files inside `features/`.

Examples:
- `button.component.tsx`
- `report-card.component.tsx`
- `utils.lib.ts`
- `report.service.ts`
- `use-reports.hook.ts`
- `report.type.ts`

**Exemption**: Expo Router file-based routing files in `app/` (e.g. `_layout.tsx`, `index.tsx`, `[id].tsx`, `+not-found.tsx`) are exempt from this naming format to prevent breaking file-system URL resolution.

### TypeScript
- `strict: true` always. No explicit `any`.
- All domain types live in `features/<feature-name>/types/`. Never define inline types in components if they are reused.
- Use `z.infer<typeof Schema>` to derive types from Zod schemas instead of duplicating them.

### Components
- Functional components with arrow functions. No class components.
- Props typed with `interface`, named `ComponentNameProps`.
- One component per file. The file should be named inside `features/` following the naming convention: `[component-name].component.tsx`.
- Named exports, not default, except in `app/` routes (Expo Router requires default exports).

```tsx
// ✅ Correct
interface AnimalCardProps {
  animal: Animal;
  onPress: (id: string) => void;
}

export const AnimalCard = ({ animal, onPress }: AnimalCardProps) => {
  return (...)
}

// ❌ Incorrect
export default function AnimalCard(props: any) { ... }
```

### Styling with NativeWind
- **MANDATORY**: Refer to [DESIGN.md](file:///Users/dmitry/Desktop/workspace/pawsy/pawsy-ui/DESIGN.md) for all design decisions, color tokens, typography styles, spacing, shapes, and component layouts.
- Use Tailwind classes directly in `className`. No `StyleSheet.create` except in exceptional cases.
- The main design token of the app is in `tailwind.config.js` under `theme.extend`, derived from the guidelines in [DESIGN.md](file:///Users/dmitry/Desktop/workspace/pawsy/pawsy-ui/DESIGN.md).
- For conditional styles use `clsx` or template literals, never manual string concatenation.

```tsx
// ✅ Correct
<View className={clsx("rounded-xl p-4", isActive && "bg-primary-500")} />

// ❌ Incorrect
<View className={"rounded-xl p-4" + (isActive ? " bg-primary-500" : "")} />
```

### State
- **Server state** (API data): always TanStack Query. Never `useEffect` + `useState` for fetching.
- **Global UI state** (theme, user, config): Zustand.
- **Local form state**: React Hook Form.
- **Ephemeral component state**: Local `useState` is fine.

### Services / API calls
- Every fetch passes through `services/api.ts` which automatically appends the Clerk token.
- TanStack Query query keys follow the convention `['entity', 'action', params]`.

```ts
// ✅ Correct
useQuery({ queryKey: ['reports', 'list', { page, filters }], queryFn: ... })
useQuery({ queryKey: ['reports', 'detail', id], queryFn: ... })
```

### Error handling
- Network/API errors are handled at the TanStack Query level (onError, error boundary).
- Validation errors are handled with Zod + React Hook Form.
- Never swallow errors with an empty `catch(() => {})`.

---

## Auth with Clerk

- `ClerkProvider` wraps the entire app in `app/_layout.tsx`.
- To access the user: `useUser()` or `useAuth()` from `@clerk/clerk-expo`.
- Protected routes redirect to `/(auth)/sign-in` if there is no session.
- The Clerk token is automatically attached in `services/api.ts` via `getToken()`.
- Configured providers: **Google OAuth** and **Facebook OAuth** only.

---

## Communication with the backend (pawsy-api)

- Base URL in environment variable: `EXPO_PUBLIC_API_URL`
- All calls pass through `services/api.ts`
- The backend uses REST + JSON
- For image uploads, `multipart/form-data` is used

```ts
// services/api.ts — base pattern
export const apiClient = async (path: string, options?: RequestInit) => {
  const token = await getToken(); // Clerk
  return fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
};
```

---

## Domain — main entities

### Animal
Represents a specific animal (can be associated with multiple reports).
- `species`: `dog | cat | other`
- `breed`: optional string
- `color`: string
- `size`: `small | medium | large`
- `photos`: string[] (URLs in Cloudflare R2)

### Report
A lost or found animal report.
- `type`: `lost | found | adoption`
- `status`: `active | resolved | expired`
- `location`: `{ lat: number, lng: number, address: string }`
- `animal`: Animal
- `reportedBy`: User

### Match
A potential match between two reports.
- `score`: number (0-1, calculated by pawsy-matching)
- `reportA`: Report
- `reportB`: Report
- `status`: `pending | confirmed | rejected`

---

## What this repo does NOT do

- ❌ Does not contain matching/embeddings logic (that is `pawsy-matching`)
- ❌ Does not contain backend business logic (that is `pawsy-api`)
- ❌ No direct database access
- ❌ Does not handle social media scraping

---

## Useful commands

```bash
# Install dependencies
pnpm install

# Dev in iOS simulator
pnpm expo start --ios

# Dev in Android simulator
pnpm expo start --android

# Dev on physical device (Expo Go)
pnpm expo start

# Production build
eas build --platform all

# Type check
pnpm tsc --noEmit

# Lint
pnpm lint
```

---

## Environment variables

```env
EXPO_PUBLIC_API_URL=https://api.pawsy.app       # Backend URL
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...        # Clerk publishable key
```

Never hardcode URLs or keys in the code. Always use `process.env.EXPO_PUBLIC_*`.

---

## Related repos

| Repo | Description |
|---|---|
| `pawsy-api` | NestJS backend — REST API, auth, DB |
| `pawsy-matching` | Python microservice — embeddings and similarity |