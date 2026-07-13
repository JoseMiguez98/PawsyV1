# DESIGN.md — Pawsy Design System

> This document is the source of truth for building UI in Pawsy. Before
> creating or modifying any screen/component, read this file alongside
> `tokens.ts`. If a value isn't here, don't invent it — either derive it
> explicitly following the rules in section 6, or ask.

---

## 1. Guiding principle

Pawsy is an emotional-emergency app disguised as a pet directory: people
open it because they lost someone they love, or because they can help
someone else get their pet back. The visual system has to hold TWO
registers at once:

- **Functional calm** (search, filter, browse shelters) → neutral,
  compact, efficient tone.
- **Human urgency** (reporting a lost pet, seeing a "Lost" status) →
  warmer tone, more breathing room, stronger visual hierarchy.

This distinction is the reason behind the system's single most important
rule: **not every component uses the same radius or the same level of
emphasis.** See section 3.

---

## 2. Color palette

All exact values live in `tokens.ts` (`colors`). Usage summary:

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#e77d67` | Brand color. CTAs, FAB, active chip, logo. **This is the canonical primary** — not `primaryLight`. |
| `primaryLight` | `#e88d67` | Only inside `gradients.primary` or hover/press states. Never as a component's base color. |
| `primaryTint` | `#fdece9` | Icon backgrounds, soft borders, avatars. |
| `bgPrimary` | `#faf9f8` | Screen background. |
| `bgSecondary` | `#ebe9e7` | Inputs, "recessed" surfaces. |
| `bgSurface` | `#ffffff` | Cards. |
| `foreground` | `#1a1c1c` | Primary text. |
| `foregroundSecondary` | `#55433e` | Secondary text / metadata. |
| `dangerBg` / `dangerFg` | `#ffdad6` / `#93000a` | "Lost" status, alerts, urgency. |
| `successBg` / `successFg` | `#dcedc8` / `#1b3411` | "Found/Seen" status, confirmations, safety card. |

**Rules:**
- `danger` is used for anything related to a **lost** pet or an
  irreversible action. `success` is for **good outcomes** (found, up for
  adoption successfully, shelter open). Don't mix the two meanings.
  There's a second green tone (`successBgAlt` = `#cbecbd`) inherited from
  the first screen — reserve it for small badges (e.g. "Open" on a shelter
  card), not for large cards like the safety card.
- `warning` and `info` are derived (they don't come from Figma). Only use
  them if a real use case shows up (e.g. "your report is pending review").
  If added those states in Figma later, the actual values values replace the
  derived ones — update this doc at that point.
- Dark mode exists in the tokens but **isn't validated against any real
  design**. If dark mode gets turned on in the app, treat those values as a
  starting point, not a closed spec.

---

## 3. Radius — a 2-tier system (non-negotiable rule)

This is where consistency breaks most easily, so it's spelled out
explicitly:

```
radius.md   (16px) → DEFAULT. Buttons, inputs, general-purpose cards,
                       any component that repeats N times in a list or
                       grid (e.g. cards in a feed).
radius.lg   (24px) → Large containing cards, featured sections.
radius.pill (48px) → ONLY for 1-2 "hero" elements per screen: the
                       photo-upload input, the main CTA of a
                       high-emotional-impact flow (reporting a lost pet,
                       emergency). NEVER apply it to a list of N items.
radius.full (9999px) → Chips, avatars, FAB, status pills.
```

**Quick test before using `radius.pill`**: does this component repeat more
than once on the screen? If yes, it's `md` or `lg`, not `pill`. The lost
pets feed is the canonical example of "why not use pill everywhere": it's
N repeated cards, so the container uses `lg` and the internal buttons use
`md` — 48px would have felt flat and hierarchy-less.

---

## 4. Gradient — usage rule (non-negotiable)

`gradients.primary` (`#e88d67 → #f2a68d`, 135deg) exists and is part of the
system, but it has a single usage rule:

> **Max 1-2 "hero" CTAs per app use the gradient. Everything else uses
> solid `colors.primary`.**

Correct examples: the "Publish Report" button in the report-a-lost-pet
flow, the central nav FAB. Incorrect example: using it on the "I saw this
pet" button in every card of a feed (that's N repeated gradients = visual
noise, and in RN each instance requires `expo-linear-gradient` — not free
to maintain).

If you're unsure whether a button "deserves" the gradient: it doesn't. The
gradient is for a flow's single most emotionally-loaded moment, not for
every primary action.

---

## 5. Typography

One typeface: **Plus Jakarta Sans**. Hierarchy is built with weight and
size, not by switching typefaces.

| Use | Size | Weight |
|---|---|---|
| Section heading | 24px | Extra Bold |
| Card title / heading 1 | 20px | Extra Bold |
| Main CTA | 16px | Bold |
| Body / secondary buttons | 14px | Semi Bold / Bold |
| Metadata (location, distance, time) | 12px | Medium (Bold if urgent/highlighted) |
| Eyebrow / uppercase labels | 10px | Extra Bold, `letterSpacing: wide/widest` |

Tracking rule: large sizes (20-24px) get **negative** letter-spacing
(`-0.5` to `-0.6`) to read tighter and more editorial; small uppercase
labels (10-12px) get **positive** tracking (`0.5` to `1`) for legibility.
Don't use neutral tracking in either case.

---

## 6. How to derive a token that doesn't exist yet

This will come up often: a new design will need something that isn't in
`tokens.ts` (a color, a size, a state). Derivation rule:

1. **First check if something semantically equivalent already exists.**
   Before inventing `colors.info2`, check whether `colors.info` already
   covers the case.
2. **Derive from the logic already present, not from a generic palette.**
   Real example: Pawsy's shadows use a `primary` tint instead of pure black
   (`rgba(231,125,103,0.12)` instead of `rgba(0,0,0,0.12)`) — any new
   shadow should follow that same pattern, not add a generic gray.
3. **Mark the origin in the comment.** Every new token in `tokens.ts` gets
   `// [figma]` (comes literally from a design), `// [figma-pN]` (comes
   from a specific screen — useful when screens conflict), or
   `// [derived]` (inferred). This is what lets you audit later what's real
   design vs. filler.
4. **If two screens bring different values for the same thing (drift)**,
   don't average them or just keep whichever you saw last. Document the
   conflict explicitly and resolve it with an objective criterion
   (contrast, legibility, hierarchy) — see `DESIGN_TOKENS.md` for the real
   precedent of how `primary` (#e77d67 vs #e88d67) and the success green
   were resolved.

---

## 7. Components — established patterns

### Card (e.g. shelter card, pet alert card)
- `bgSurface` (white), `radius.lg` (24px), `shadows.card`.
- Photo/image spans the full width, radius only on the top corners
  (`topLeftRadius`/`topRightRadius`), not all 4.
- Status badge overlaid on the bottom-left of the photo, `radius.full`,
  semantic colors from section 2.
- Favorite button (♡) overlaid top-right of the photo, white circle at 85%
  opacity.
- Content with 24px padding, full-width CTA at the end.

### Primary button
- Solid `colors.primary`, `radius.md` (16px) if repeated/list-context,
  `radius.pill` only if it's the screen's hero CTA (see section 3).
- White text, Bold, 14-16px.
- Shadow: `shadows.button` (subtle elevation) or `shadows.cta` (hero CTA).

### Chip / filter
- Active: solid `colors.primary`, white Bold text.
- Inactive: white `bgSurface`, `borderNeutral` border,
  `foregroundSecondary` Semi Bold text.
- Always `radius.full`.

### Input
- `bgSecondary` background, `radius.md` (16px) — or `radius.pill` only if
  the whole form is "hero" type (see section 3).
- Placeholder in `foregroundPlaceholder`.

### Urgency badge
- Combines a dot (`dot`, 6px, semantic color) + uppercase Extra Bold
  10-11px text. The dot is information (indicates recency <24h), not
  decoration — don't add it to non-urgent states.

---

## 8. Anti-patterns (things already tried and discarded)

- ❌ 48px radius on every input in a dense screen (tried in "Reportar
  Mascota", decided to reserve it for the hero input only).
- ❌ Gradient on repeated buttons in a list (see section 4).
- ❌ Two shades of the same semantic color coexisting unresolved
  (happened with `primary` and with `success` between the 2 original
  screens — always resolve to a winner, don't leave it ambiguous).
- ❌ Pure-black shadow (`rgba(0,0,0,x)`) instead of a `primary` tint —
  breaks the system's visual signature.

---

## 9. Checklist before calling a new screen done

- [ ] Did I use colors from `tokens.ts`, or invent a new hex? (if the
      latter, document it with `[derived]` and justify why nothing
      existing covered it)
- [ ] Does each component's radius follow the section 3 rule (md/lg
      default, pill only for hero)?
- [ ] Is the gradient used on more than 1-2 elements on the screen? If so,
      remove it.
- [ ] Do danger/success states match the real meaning (lost vs. found),
      not just "whichever color looked nice"?
- [ ] Does the typography only use Plus Jakarta Sans with the section 5
      scale?
- [ ] If I added new tokens to `tokens.ts`, are they marked with
      `[figma]`, `[figma-pN]`, or `[derived]`?

---

## 10. Related files

- `tokens.config.js` — exact values (colors, typography, radius, spacing,
  shadows, gradients, blur, opacity).
