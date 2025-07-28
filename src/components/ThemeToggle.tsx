import React from 'react';
import { Sun, Moon } from 'phosphor-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="neuro-button p-3 flex items-center justify-center smooth-transition hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} weight="light" className="text-primary" />
      ) : (
        <Moon size={20} weight="light" className="text-primary" />
      )}
    </button>
  );
}