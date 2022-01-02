import { createContext } from 'react';
import { useTheme } from '../hooks/useTheme';
import { ContextPropTypes } from '../utils/constants';

export const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useTheme();

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

ThemeContextProvider.propTypes = ContextPropTypes;
