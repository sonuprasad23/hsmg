import React, { useEffect, useState, createContext, useContext } from 'react';
type Theme = 'dark' | 'light';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    // Apply theme class to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  return <ThemeContext.Provider value={{
    theme,
    toggleTheme
  }}>
      {children}
    </ThemeContext.Provider>;
};
export default ThemeProvider;