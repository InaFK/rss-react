import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        borderRadius: '8px',
        backgroundColor: theme === 'light' ? '#333' : '#fff',
        color: theme === 'light' ? '#fff' : '#333',
        border: '1px solid',
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
};

export default ThemeSwitcher;
