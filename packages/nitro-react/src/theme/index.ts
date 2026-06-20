// Types
export type { ThemeConfig, ThemeColors, ThemeSpacing, ThemeShadows } from './types';
export type { DraggableWindowPosition, DraggableWindowState } from './types';

// Context & Provider
export { ThemeProvider, ThemeContext } from './context/ThemeProvider';

// Stores
export { useThemeStore } from './stores/useThemeStore';
export { useDraggableWindowStore } from './stores/useDraggableWindowStore';

// Hooks
export { useTheme } from './hooks/useTheme';
export { useDraggableWindow } from './hooks/useDraggableWindow';

// Config
export { habitatTheme, darkHabitatTheme, classicHabitatTheme, themePresets, defaultTheme } from './config/themes';

// Utils
export { cn, getThemeColorClass, getThemeSpacingClass, getThemeShadowClass, generateThemeVariables } from './utils/classNameUtils';
