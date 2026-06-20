import { create } from 'zustand';
import { ThemeConfig } from '../types';
import { themePresets, defaultTheme } from '../config/themes';

interface ThemeStore {
  currentTheme: ThemeConfig;
  isDarkMode: boolean;
  setTheme: (theme: ThemeConfig | keyof typeof themePresets) => void;
  setDarkMode: (isDark: boolean) => void;
  resetTheme: () => void;
}

const THEME_STORAGE_KEY = 'nitro-theme';
const DARK_MODE_STORAGE_KEY = 'nitro-dark-mode';

const getStoredTheme = (): ThemeConfig => {
  if (typeof window === 'undefined') return defaultTheme;

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      const themeName = stored as keyof typeof themePresets;
      return themePresets[themeName] || defaultTheme;
    }
  } catch (e) {
    console.error('Failed to load theme from storage:', e);
  }
  return defaultTheme;
};

const getStoredDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  } catch (e) {
    console.error('Failed to load dark mode preference:', e);
    return false;
  }
};

export const useThemeStore = create<ThemeStore>((set) => ({
  currentTheme: getStoredTheme(),
  isDarkMode: getStoredDarkMode(),

  setTheme: (theme) => {
    let newTheme: ThemeConfig;

    if (typeof theme === 'string') {
      newTheme = themePresets[theme as keyof typeof themePresets] || defaultTheme;
    } else {
      newTheme = theme;
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme.name);
      } catch (e) {
        console.error('Failed to save theme to storage:', e);
      }
    }

    set({ currentTheme: newTheme });
  },

  setDarkMode: (isDark) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(isDark));
      } catch (e) {
        console.error('Failed to save dark mode preference:', e);
      }
    }
    set({ isDarkMode: isDark });
  },

  resetTheme: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(THEME_STORAGE_KEY);
        localStorage.removeItem(DARK_MODE_STORAGE_KEY);
      } catch (e) {
        console.error('Failed to clear theme storage:', e);
      }
    }
    set({ currentTheme: defaultTheme, isDarkMode: false });
  },
}));
