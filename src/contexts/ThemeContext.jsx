import { createContext, useState } from 'react';

import { ContextPropTypes } from '@utils/constants/proptypes';
import { THEMES, THEME_STORAGE_KEY } from '@utils/constants';
import { getThemeMode } from '@utils/helpers';

export const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
  const [value, setValue] = useState(() => {
    const valueStoraged = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (valueStoraged) return valueStoraged;
    window.localStorage.setItem(THEME_STORAGE_KEY, THEMES.LIGHT);
    return THEMES.LIGHT;
  });

  const theme = {
    theme: value,
    setTheme: (current) => {
      setValue(getThemeMode(current));
      window.localStorage.setItem(THEME_STORAGE_KEY, getThemeMode(current));
    }
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

ThemeContextProvider.propTypes = ContextPropTypes;
