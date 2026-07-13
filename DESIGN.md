---
version: alpha
name: Pawsy
description: Design system for Pawsy — a mobile platform for reporting lost pets, adoptions, and community alerts in Latin America.
colors:
  primary: "#E8613A"
  primary-light: "#F4906F"
  primary-pale: "#FDE8E0"
  secondary: "#3D6B2E"
  secondary-light: "#5A8C45"
  secondary-pale: "#E8F3E3"
  surface: "#FFFFFF"
  surface-warm: "#FDF6F3"
  surface-muted: "#F5F5F5"
  on-surface: "#1A1A1A"
  on-surface-secondary: "#5C5C5C"
  on-surface-tertiary: "#9E9E9E"
  border: "#E8E0DC"
  error: "#C0392B"
  warning: "#E8613A"
  success: "#3D6B2E"
  badge-perdido: "#C0392B"
  badge-avistado: "#4A7FC1"
  badge-adoptable: "#3D6B2E"
  badge-urgente: "#E8613A"
  neutral-100: "#1A1A1A"
  neutral-80: "#5C5C5C"
  neutral-60: "#9E9E9E"
  neutral-20: "#E8E0DC"
  neutral-10: "#F5F5F5"
typography:
  display:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.25
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.3
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.06em
  label-caps:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.1em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: 0px
  sm: 6px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  screen-padding: 16px
  card-padding: 16px
  section-gap: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: "14px 24px"
    height: 52px
  button-primary-hover:
    backgroundColor: "{colors.primary-light}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: "14px 24px"
    height: 52px
  button-secondary-dark:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: "14px 24px"
    height: 52px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
  chip-active:
    backgroundColor: "{colors.secondary-pale}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  chip-inactive:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  chip-filter-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  badge-perdido:
    backgroundColor: "{colors.badge-perdido}"
    textColor: "{colors.surface}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
  badge-avistado:
    backgroundColor: "{colors.badge-avistado}"
    textColor: "{colors.surface}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
  badge-adoptable:
    backgroundColor: "{colors.badge-adoptable}"
    textColor: "{colors.surface}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-urgente:
    backgroundColor: "{colors.badge-urgente}"
    textColor: "{colors.surface}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  card-featured:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "0px"
  input:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "14px 16px"
    height: 52px
  input-focus:
    backgroundColor: "{colors.surface}"
  tab-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-tertiary}"
    height: 64px
  tab-bar-active:
    textColor: "{colors.secondary}"
  tab-bar-fab:
    backgroundColor: "{colors.primary}"
    size: 56px
    rounded: "{rounded.full}"
  stat-card:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# PawsyApp Design System

## Overview

PawsyApp is a community-driven mobile platform built around emotional urgency and trust. Every screen communicates warmth, care, and immediacy — the product is used by people who have lost a pet or want to help one find a home.

The visual language is **warm and approachable**, anchored in a salmon-orange primary (`#E8613A`) that conveys urgency without aggression, paired with a earthy forest green (`#3D6B2E`) that signals safety, health, and positive outcomes. Backgrounds are soft off-whites and warm creams, giving the UI an organic, non-clinical feel.

The design targets Latin American markets (Argentina, El Salvador visible in mocks), mobile-first (iOS/Android via React Native/Expo), with a single-column layout optimized for one-handed use. The tone is emotionally resonant — this is not a utility app, it's a community lifeline for pets and their people.

## Colors

The palette is built around two semantic anchors: urgency/action (orange) and resolution/safety (green).

- **Primary `#E8613A`:** The salmon-orange used for all primary CTAs, the FAB, active nav indicators, and urgency states. It reads as warm and caring, not alarming.
- **Primary Light `#F4906F`:** Hover/pressed state for primary elements.
- **Primary Pale `#FDE8E0`:** Tinted surfaces for CTA sections, alert backgrounds, and community prompt cards.
- **Secondary `#3D6B2E`:** Forest green used for positive outcomes — "Adoptable" badges, "Encontrado" states, the "Conocer mascotas" button, active tab highlights. Signals life and resolution.
- **Secondary Pale `#E8F3E3`:** Soft green background for success cards (e.g., "Mina ha vuelto a casa").
- **Surface `#FFFFFF`:** Card backgrounds and modal surfaces.
- **Surface Warm `#FDF6F3`:** Page-level background — a warm near-white that avoids coldness.
- **Surface Muted `#F5F5F5`:** Input field backgrounds and stat chips.
- **On Surface `#1A1A1A`:** Primary text — near-black for maximum legibility.
- **On Surface Secondary `#5C5C5C`:** Secondary text, metadata, descriptions.
- **On Surface Tertiary `#9E9E9E`:** Placeholders, inactive icons, captions.
- **Border `#E8E0DC`:** Warm-tinted dividers and card outlines.
- **Badge Perdido `#C0392B`:** Deep red used exclusively for "PERDIDO" status badges — conveys urgency and loss.
- **Badge Avistado `#4A7FC1`:** Blue used for "AVISTADO" — neutral sighting, not urgent but actionable.

## Typography

All type is set in **Inter** — a humanist sans-serif that balances warmth with legibility at mobile sizes. The type scale is compact and functional, designed for dense information (pet listings, reports, alerts) while remaining scannable.

- **Display (28px/700):** Hero headlines like "Ayúdanos a traerlos de vuelta a casa." — large, bold, emotional.
- **Headline LG (22px/700):** Section titles and screen titles like "Comunidad", "Manchitas".
- **Headline MD (18px/700):** Card titles, pet names in listings.
- **Headline SM (16px/600):** Sub-section headings like "Mascotas Perdidas", "Su Historia".
- **Body LG (15px/400):** Primary body copy — bio text, descriptions.
- **Body MD (14px/400):** Secondary body copy — card descriptions, metadata.
- **Body SM (13px/400):** Tight secondary content, helper text.
- **Label LG (13px/600):** Button text, interactive labels with slight tracking.
- **Label MD (11px/600):** Filter chips, tab labels, form section headers.
- **Label Caps (10px/700):** Status badges (PERDIDO, AVISTADO, ADOPTABLE, URGENTE) — all caps, maximum tracking.
- **Caption (12px/400):** Timestamps, location metadata, fine print.

## Layout

Single-column mobile layout with a consistent `16px` horizontal screen padding. Content is organized in vertical sections with `24px` gaps between them.

The bottom tab bar is fixed with a floating action button (FAB) centered at the paw icon — the primary action shortcut for reporting. Cards use `16px` internal padding with `16px` border radius. Images in cards bleed edge-to-edge within their container.

The layout follows an **8px base grid** — all spacing values are multiples of 4px, with 8px as the practical minimum between related elements.

Key layout zones:
- **Header:** 56px fixed top bar with logo + right-side actions
- **Screen padding:** 16px horizontal on all content
- **Card gap:** 12–16px between cards in a list
- **Section gap:** 24px between content sections
- **Bottom tab bar:** 64px, with FAB extending above it

## Elevation & Depth

Depth is achieved through **tonal layering** rather than heavy shadows. The warm off-white page background (`#FDF6F3`) creates natural contrast with pure white cards. Cards use a subtle shadow (`0 2px 8px rgba(0,0,0,0.06)`) to lift them off the page without drama.

Alert cards with left-border accents (e.g., the red left border on urgent community alerts) use border color rather than shadow to convey priority. The FAB uses a slightly stronger shadow (`0 4px 12px rgba(232,97,58,0.35)`) tinted with the primary color to feel grounded.

## Shapes

Shape language is **soft and friendly** — no sharp corners anywhere in the UI.

- **Full pill (`9999px`):** All CTA buttons, filter chips, status badges, FAB. The dominant shape language — everything interactive is pill-shaped.
- **XL (`24px`):** Hero cards, featured pet cards with images. Generous rounding for large content containers.
- **LG (`16px`):** Standard cards, modals, image containers within cards.
- **MD (`12px`):** Input fields, secondary cards, stat chips.
- **SM (`6px`):** PERDIDO/status badge chips that need to read as labels, not buttons.

Avoid mixing sharp corners with rounded ones in the same view. All inputs are rounded MD. All buttons are pill-shaped.

## Components

### Buttons

Three button variants are used throughout the app:

**Primary** (`#E8613A`, pill): Used for the single most important action per screen — "Reportar Mascota", "Publicar Reporte", "Contactar para Adoptar", "Ver Ubicación". Always full-width or near-full-width at the bottom of a form/detail screen.

**Secondary Dark** (`#3D6B2E`, pill): Used for positive/adoption CTAs — "Conocer mascotas", "Ser Voluntario". Semantically distinct from urgency actions.

**Ghost/Text** (transparent, primary text): Used for secondary navigation links — "Ver todos los reportes", "Explorar refugios", "Cancelar". No background, no border.

**Outline** (white background, primary border): Used for secondary actions alongside a primary button — "Compartir Perfil".

### Filter Chips

Horizontal scrollable chip rows for filtering — "Todos / Mensajes / Alertas Críticas", "Perdidos / Avistados / Refugios". Active state uses filled green (`secondary-pale` bg + `secondary` text) or filled primary depending on context. Inactive chips are outlined or plain text.

### Status Badges

Small pill or rounded-rect labels overlaid on images or inline in cards:
- `PERDIDO` — red, all caps
- `AVISTADO` — blue, all caps  
- `ADOPTABLE` — green, all caps, pill shape
- `URGENTE` — orange, all caps, pill shape
- `BUSCANDO` / `ENCONTRADO` — contextual in profile reports

### Cards

Two card densities:
- **Featured card:** Full-width image (16:9 or taller) with rounded corners, pet info below. Used for "En Adopción" hero and refuge listings.
- **List card:** Horizontal layout with square thumbnail (64×64, rounded LG) + text content. Used in community feed, nearby pets, profile reports.

Community feed cards have a left accent border (4px solid, primary color) for urgent alerts.

### Input Fields

Rounded MD (`12px`), muted surface background (`#F5F5F5`), 52px height for comfortable touch targets. Labels are `label-caps` style above the field. Placeholder text is `on-surface-tertiary`. No visible border in default state — border appears on focus in primary color.

### Bottom Tab Bar

5 tabs: Home, Map, (FAB center), Alertas, Perfil. Active tab text uses `secondary` green. The center FAB is 56px salmon circle with paw icon, slightly elevated above the bar. Tab labels are `label-md`.

### Stat Chips (Profile)

Rounded MD chips showing numeric stats — "12 Reportes Activos", "05 Mascotas Adoptadas", "28 Favoritos". Muted surface background, centered text layout with number in `headline-md` and label in `label-caps` below.

## Do's and Don'ts

- **Do** use `primary` (`#E8613A`) only for the most urgent/primary action on each screen — one per screen maximum.
- **Do** use `secondary` green for all positive resolution states — adoptions, found pets, volunteer actions.
- **Don't** use red (`badge-perdido`) outside of "PERDIDO" status — it has a specific semantic meaning.
- **Do** keep all interactive elements pill-shaped (`rounded.full`). Never use sharp corners on buttons.
- **Don't** use more than two font weights on a single card.
- **Do** use `surface-warm` (`#FDF6F3`) as the page background — never pure white at the screen level.
- **Do** maintain sufficient contrast: primary text on surface is ~15:1, well above WCAG AA.
- **Don't** place two primary (orange) buttons on the same screen.
- **Do** overlay status badges on images rather than stacking them in separate rows — keeps the UI compact.
- **Don't** use the green secondary color for urgent/negative states — it semantically means "resolved" or "positive".
- **Do** use full-bleed images inside cards with clipping via `rounded.lg` or `rounded.xl` on the container.
- **Don't** add heavy drop shadows — use tonal contrast and the warm background to create depth.