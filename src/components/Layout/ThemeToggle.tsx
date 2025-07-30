import React from 'react';
import { useTheme } from '../../context/ThemeProvider';
import { SunIcon, MoonIcon } from 'lucide-react';
const ThemeToggle: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <button onClick={toggleTheme} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" aria-label="Toggle theme">
      {theme === 'dark' ? <SunIcon className="h-5 w-5 text-yellow-500" /> : <MoonIcon className="h-5 w-5 text-blue-700" />}
    </button>;
};
export default ThemeToggle;