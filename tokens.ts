// Typed wrapper around tokens.config.js — the actual values live there and
// are shared with tailwind.config.js. Edit values in tokens.config.js, not here.
import tokensConfig from "./tokens.config";

export const colors = tokensConfig.colors as typeof tokensConfig.colors;
export const typography = tokensConfig.typography as typeof tokensConfig.typography;
export const radius = tokensConfig.radius as typeof tokensConfig.radius;
export const spacing = tokensConfig.spacing as typeof tokensConfig.spacing;
export const shadows = tokensConfig.shadows as typeof tokensConfig.shadows;
export const gradients = tokensConfig.gradients as typeof tokensConfig.gradients;
export const blur = tokensConfig.blur as typeof tokensConfig.blur;
export const opacity = tokensConfig.opacity as typeof tokensConfig.opacity;

export const theme = {
  bgPrimary: colors.bgPrimary,
  bgSecondary: colors.bgSecondary,
  bgSurface: colors.bgSurface,
  foregroundColor: colors.foreground,
  foregroundSecondary: colors.foregroundSecondary,
  foregroundMuted: colors.foregroundMuted,
  brand: colors.primary,
  brandTint: colors.primaryTint,
  border: colors.borderNeutral,
  radius: radius.md,
  radiusLg: radius.lg,
  fonts: typography.fontFamily,
} as const;

export type ColorToken = keyof typeof colors;
export type RadiusToken = keyof typeof radius;
export type SpacingToken = keyof typeof spacing;
