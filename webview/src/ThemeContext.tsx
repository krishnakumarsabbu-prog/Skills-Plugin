import React, { createContext, useContext, useState } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'theme-light' : 'theme-dark'} style={{ height: '100%' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
