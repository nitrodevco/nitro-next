import { ThemeConfig } from '../types';

export const habitatTheme: ThemeConfig = {
  name: 'habitat',
  colors: {
    // Light backgrounds
    background: '#f5f5f5',
    foreground: '#1a1a1a',
    muted: '#e0e0e0',
    mutedForeground: '#666666',

    // Primary - Habbo gold/yellow
    primary: '#ffd700',
    primaryForeground: '#1a1a1a',

    // Secondary
    secondary: '#4a4a4a',
    secondaryForeground: '#ffffff',

    // Accent
    accent: '#ff6b6b',
    accentForeground: '#ffffff',

    // Buttons - Habbo classic gradients
    buttonPrimary: '#ffec8e',
    buttonPrimaryHover: '#ffe082',
    buttonPrimaryActive: '#fdd835',
    buttonSecondary: '#d4d4d4',
    buttonSecondaryHover: '#cacaca',
    buttonSecondaryActive: '#b0b0b0',

    // Destructive
    destructive: '#ff6b6b',
    destructiveForeground: '#ffffff',

    // UI Elements
    border: '#cccccc',
    input: '#ffffff',
    ring: '#ffd700',

    // Habbo window styling
    windowBg: '#e8e8e8',
    windowBorder: '#999999',
    windowHeader: '#6ba3d0',
    windowHeaderGradient: 'linear-gradient(to bottom, #7bb4e0, #5a92bf)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.15)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
    window: '0 8px 16px rgba(0, 0, 0, 0.25)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  fontFamily: {
    base: '"Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", monospace',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const darkHabitatTheme: ThemeConfig = {
  name: 'habitat-dark',
  colors: {
    // Dark backgrounds
    background: '#1a1a1a',
    foreground: '#f5f5f5',
    muted: '#333333',
    mutedForeground: '#999999',

    // Primary - Habbo gold/yellow
    primary: '#ffd700',
    primaryForeground: '#1a1a1a',

    // Secondary
    secondary: '#b0b0b0',
    secondaryForeground: '#1a1a1a',

    // Accent
    accent: '#ff6b6b',
    accentForeground: '#ffffff',

    // Buttons
    buttonPrimary: '#ffec8e',
    buttonPrimaryHover: '#ffe082',
    buttonPrimaryActive: '#fdd835',
    buttonSecondary: '#4a4a4a',
    buttonSecondaryHover: '#555555',
    buttonSecondaryActive: '#6a6a6a',

    // Destructive
    destructive: '#ff6b6b',
    destructiveForeground: '#ffffff',

    // UI Elements
    border: '#333333',
    input: '#2a2a2a',
    ring: '#ffd700',

    // Habbo window styling
    windowBg: '#2a2a2a',
    windowBorder: '#4a4a4a',
    windowHeader: '#4a6a90',
    windowHeaderGradient: 'linear-gradient(to bottom, #5a7aaa, #3a5a80)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
    window: '0 8px 16px rgba(0, 0, 0, 0.6)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  fontFamily: {
    base: '"Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", monospace',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const classicHabitatTheme: ThemeConfig = {
  name: 'habitat-classic',
  colors: {
    // Classic Habbo era colors
    background: '#d0d0d0',
    foreground: '#000000',
    muted: '#b8b8b8',
    mutedForeground: '#555555',

    // Primary - Habbo classic gold
    primary: '#ffcc00',
    primaryForeground: '#000000',

    // Secondary
    secondary: '#999999',
    secondaryForeground: '#ffffff',

    // Accent
    accent: '#cc0000',
    accentForeground: '#ffffff',

    // Buttons - Classic gradients
    buttonPrimary: '#ffffcc',
    buttonPrimaryHover: '#ffff99',
    buttonPrimaryActive: '#ffcc00',
    buttonSecondary: '#cccccc',
    buttonSecondaryHover: '#bbbbbb',
    buttonSecondaryActive: '#aaaaaa',

    // Destructive
    destructive: '#cc0000',
    destructiveForeground: '#ffffff',

    // UI Elements
    border: '#999999',
    input: '#ffffff',
    ring: '#ffcc00',

    // Habbo window styling
    windowBg: '#d0d0d0',
    windowBorder: '#777777',
    windowHeader: '#6699cc',
    windowHeaderGradient: 'linear-gradient(to bottom, #7799dd, #5588cc)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
    md: '0 2px 4px rgba(0, 0, 0, 0.25)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.3)',
    window: '0 4px 12px rgba(0, 0, 0, 0.35)',
  },
  borderRadius: {
    sm: '0px',
    md: '0px',
    lg: '0px',
  },
  fontFamily: {
    base: '"Verdana", "Arial", sans-serif',
    mono: '"Courier New", monospace',
  },
  transitions: {
    fast: '100ms linear',
    normal: '200ms linear',
    slow: '400ms linear',
  },
};

export const themePresets = {
  habitat: habitatTheme,
  habitatDark: darkHabitatTheme,
  habitatClassic: classicHabitatTheme,
};

export const defaultTheme = habitatTheme;
