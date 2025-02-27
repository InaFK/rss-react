import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeSetter = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
};

export default ThemeSetter;
