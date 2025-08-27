export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const padding = {
  screen: spacing.lg,
  container: spacing.md,
  card: spacing.sm,
} as const;

export const margin = {
  screen: spacing.lg,
  container: spacing.md,
  card: spacing.sm,
} as const;
