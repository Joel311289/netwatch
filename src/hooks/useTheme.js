import { useLocalStorage } from '@hooks/useLocalStorage';

import { THEMES, THEME_STORAGE_KEY } from '@utils/constants';
import { getThemeMode } from '@utils/helpers';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, THEMES.LIGHT, { raw: true });

  const handleTheme = () => setTheme(getThemeMode(theme));

  return [theme, handleTheme];
};
