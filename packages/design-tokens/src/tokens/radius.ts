/** Border radii in px, plus soft shadows. */
export const radius = {
  button: 12,
  card: 18,
  full: 9999,
} as const;

export const shadows = {
  sm: "0 1px 2px rgba(31, 36, 33, 0.06)",
  md: "0 4px 12px rgba(31, 36, 33, 0.08)",
  lg: "0 12px 32px rgba(31, 36, 33, 0.12)",
} as const;

export type Radius = typeof radius;
export type Shadows = typeof shadows;
