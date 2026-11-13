import { colors, radius, shadows } from "@roomsync/design-tokens";

/**
 * Builds the :root CSS custom properties from @roomsync/design-tokens, the
 * single source of truth for the palette. Rendered once in the root layout.
 */
export function buildThemeCss(): string {
  const vars: Record<string, string> = {
    "--color-brand-primary": colors.brand.primary,
    "--color-brand-secondary": colors.brand.secondary,
    "--color-warm-grey": colors.neutral.warmGrey,
    "--color-background": colors.neutral.background,
    "--color-surface": colors.neutral.surface,
    "--color-surface-raised": colors.neutral.white,
    "--color-border": colors.border.default,
    "--color-border-strong": colors.border.strong,
    "--color-text-primary": colors.text.primary,
    "--color-text-secondary": colors.text.secondary,
    "--color-text-on-primary": colors.text.onPrimary,
    "--color-success": colors.state.success,
    "--color-warning": colors.state.warning,
    "--color-error": colors.state.error,
    "--radius-card": `${radius.card}px`,
    "--radius-button": `${radius.button}px`,
    "--shadow-soft": shadows.sm,
    "--shadow-card": shadows.md,
    "--shadow-lift": shadows.lg,
  };
  const body = Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join("");
  return `:root{${body}}`;
}
