
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-gray-800/90 px-4 py-2 text-gray-900 dark:text-gray-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 hover:bg-white dark:hover:bg-gray-700/90 transition-all duration-200 backdrop-blur-sm group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="relative w-5 h-5">
        {theme === 'light' ? (
          <Moon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
        ) : (
          <Sun className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
        )}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-900 dark:text-gray-100">
        {theme === 'light' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};

export default ThemeToggle;
