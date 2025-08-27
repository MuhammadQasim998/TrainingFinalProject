export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  families: {
    primary: 'System',  // You can replace with your custom font
  },
} as const;

export const textStyles = {
  h1: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    fontFamily: typography.families.primary,
  },
  h2: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    fontFamily: typography.families.primary,
  },
  body: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular,
    fontFamily: typography.families.primary,
  },
  caption: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    fontFamily: typography.families.primary,
  },
} as const;
