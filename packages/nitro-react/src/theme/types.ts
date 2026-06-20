export interface ThemeColors {
  // Backgrounds
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;

  // Primary colors
  primary: string;
  primaryForeground: string;

  // Secondary colors
  secondary: string;
  secondaryForeground: string;

  // Accents
  accent: string;
  accentForeground: string;

  // Buttons
  buttonPrimary: string;
  buttonPrimaryHover: string;
  buttonPrimaryActive: string;
  buttonSecondary: string;
  buttonSecondaryHover: string;
  buttonSecondaryActive: string;

  // Destructive
  destructive: string;
  destructiveForeground: string;

  // UI Elements
  border: string;
  input: string;
  ring: string;

  // Habbo specific
  windowBg: string;
  windowBorder: string;
  windowHeader: string;
  windowHeaderGradient: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  [key: string]: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  window: string;
  [key: string]: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  shadows: ThemeShadows;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  fontFamily: {
    base: string;
    mono: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}

export interface DraggableWindowPosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
  zIndex?: number;
}

export interface DraggableWindowState {
  [windowId: string]: DraggableWindowPosition;
}
