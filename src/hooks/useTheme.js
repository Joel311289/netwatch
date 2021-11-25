import { useState, useEffect } from 'react';
import { THEMES, THEME_STORAGE_KEY } from '../utils/constants';
import { getThemeMode } from '../utils/helpers';

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem(THEME_STORAGE_KEY) || THEMES.LIGHT);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, String(theme));
  }, [theme]);

  const handleTheme = () => setTheme((prev) => getThemeMode(prev.toUpperCase()));

  return [theme, handleTheme];
};
