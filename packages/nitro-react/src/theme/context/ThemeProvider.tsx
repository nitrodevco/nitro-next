import { createContext, ReactNode, useEffect, FC } from 'react';
import { useThemeStore } from '../stores/useThemeStore';
import { ThemeConfig } from '../types';

interface ThemeContextValue {
  theme: ThemeConfig;
  isDarkMode: boolean;
  setTheme: (theme: ThemeConfig | string) => void;
  setDarkMode: (isDark: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, defaultTheme }) => {
  const { currentTheme, isDarkMode, setTheme, setDarkMode } = useThemeStore();

  useEffect(() => {
    if (defaultTheme) {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, setTheme]);

  useEffect(() => {
    const root = document.documentElement;

    // Set CSS variables based on current theme
    const colors = currentTheme.colors;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    const spacing = currentTheme.spacing;
    Object.entries(spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    const shadows = currentTheme.shadows;
    Object.entries(shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Set other theme values
    root.style.setProperty('--border-radius-sm', currentTheme.borderRadius.sm);
    root.style.setProperty('--border-radius-md', currentTheme.borderRadius.md);
    root.style.setProperty('--border-radius-lg', currentTheme.borderRadius.lg);
    root.style.setProperty('--font-family-base', currentTheme.fontFamily.base);
    root.style.setProperty('--font-family-mono', currentTheme.fontFamily.mono);
    root.style.setProperty('--transition-fast', currentTheme.transitions.fast);
    root.style.setProperty('--transition-normal', currentTheme.transitions.normal);
    root.style.setProperty('--transition-slow', currentTheme.transitions.slow);

    // Set dark mode class
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [currentTheme, isDarkMode]);

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      isDarkMode,
      setTheme,
      setDarkMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
