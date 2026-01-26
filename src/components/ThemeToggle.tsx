import { Moon, Sun } from 'lucide-react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle-icon">
        {theme === 'dark' ? (
          <Sun size={20} aria-hidden="true" />
        ) : (
          <Moon size={20} aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
