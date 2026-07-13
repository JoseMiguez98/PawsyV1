// Single source of truth for raw design-token values, shared by:
// - tailwind.config.js (via require, feeds NativeWind's theme.extend)
// - tokens.ts (via import, feeds typed values used outside className strings)
// Do not hand-copy these values elsewhere — edit here only. See DESIGN.md.

const colors = {
  primary: "#e77d67",
  primaryLight: "#e88d67",
  primaryHover: "#d96c54",
  primaryTint: "#fdece9",
  primaryTintStrong: "rgba(231,125,103,0.1)",
  primaryFocusRing: "rgba(231,125,103,0.4)",

  bgPrimary: "#faf9f8",
  bgSecondary: "#ebe9e7",
  bgSurface: "#ffffff",
  bgOverlay: "rgba(255,255,255,0.9)",
  bgOverlaySoft: "rgba(255,255,255,0.85)",

  foreground: "#1a1c1c",
  foregroundSecondary: "#55433e",
  foregroundMuted: "rgba(85,67,62,0.4)",
  foregroundPlaceholder: "#6b7280",
  foregroundOnPrimary: "#ffffff",

  borderNeutral: "#dbc1ba",
  borderPrimary: "#fdece9",

  successBg: "#dcedc8",
  successFg: "#1b3411",
  successBorder: "rgba(74,102,64,0.1)",
  successBgAlt: "#cbecbd",

  dangerBg: "#ffdad6",
  dangerFg: "#93000a",
  dangerBorder: "#f4a89f",

  warningBg: "#fff3cd",
  warningFg: "#8a6100",

  infoBg: "#dbeafe",
  infoFg: "#1e3a8a",

  dark: {
    bgPrimary: "#1c1a19",
    bgSecondary: "#28211f",
    bgSurface: "#2a2220",
    foreground: "#f5f2f0",
    foregroundSecondary: "#d9cdc9",
    foregroundMuted: "rgba(217,205,201,0.4)",
    borderNeutral: "#4a3d38",
    primary: "#e77d67",
    primaryTint: "#3a2b27",
  },
};

const typography = {
  fontFamily: {
    sans: "Plus Jakarta Sans",
  },
  fontWeight: {
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 20,
    xl: 24,
    "2xl": 32,
  },
  lineHeight: {
    tight: 1.0,
    normal: 1.4,
    relaxed: 1.625,
  },
  letterSpacing: {
    tighter: -0.6,
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 0.9,
    widest: 1,
  },
};

const radius = {
  none: 0,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
  pill: 48,
  full: 9999,
};

const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
};

const shadows = {
  card: "0px 10px 30px -5px rgba(231,125,103,0.12), 0px 4px 12px -4px rgba(0,0,0,0.05)",
  button: "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
  cta: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
  ring: "0px 0px 0px 2px rgba(231,125,103,0.1)",
  fab: "0px 12px 12px rgba(231,125,103,0.4)",
  xs: "0px 1px 2px rgba(0,0,0,0.05)",
};

const gradients = {
  primary: "linear-gradient(135deg, #e88d67 0%, #f2a68d 100%)",
  primaryShadow: "0px 12px 16px rgba(232,141,103,0.12)",
  fabShadow:
    "0px 10px 15px -3px rgba(232,141,103,0.3), 0px 4px 6px -4px rgba(232,141,103,0.3)",
};

const blur = {
  sm: 6,
  lg: 12,
};

const opacity = {
  disabled: 0.4,
  overlay: 0.85,
  overlayStrong: 0.9,
};

module.exports = {
  colors,
  typography,
  radius,
  spacing,
  shadows,
  gradients,
  blur,
  opacity,
};
