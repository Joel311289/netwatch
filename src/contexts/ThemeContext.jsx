import { createContext, useState } from 'react';

import { ContextPropTypes } from '@utils/constants/proptypes';
import { THEME_STORAGE_KEY } from '@utils/constants';
import { getThemeMode } from '@utils/helpers';

export const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
  const [value, setValue] = useState(() => window.localStorage.getItem(THEME_STORAGE_KEY));

  const theme = {
    theme: value,
    setTheme: (current) => {
      setValue(getThemeMode(current));
      window.localStorage.setItem(THEME_STORAGE_KEY, getThemeMode(value));
    }
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

ThemeContextProvider.propTypes = ContextPropTypes;
