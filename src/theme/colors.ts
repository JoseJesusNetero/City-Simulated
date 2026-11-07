/**
 * Cidade Viva design tokens — cyberpunk dark palette.
 * All screens import colours from here; never hardcode hex values in components.
 */
export const colors = {
  background: '#0a1220',
  surface: '#101b2e',
  surfaceAlt: '#16243b',
  border: '#1f3350',
  text: '#e6f4ff',
  textMuted: '#7f94b3',
  neonBlue: '#00c8ff',
  neonPink: '#ff006e',
  neonGreen: '#00d974',
  neonRed: '#ff4466',
  neonYellow: '#ffd23f',
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
} as const;
