export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const getThemeColorClass = (colorKey: string): string => {
  return `var(--color-${colorKey})`;
};

export const getThemeSpacingClass = (spacingKey: string): string => {
  return `var(--spacing-${spacingKey})`;
};

export const getThemeShadowClass = (shadowKey: string): string => {
  return `var(--shadow-${shadowKey})`;
};

export const generateThemeVariables = (colors: Record<string, string>): string => {
  return Object.entries(colors)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join('\n');
};
