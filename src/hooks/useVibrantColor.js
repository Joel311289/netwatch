import { useState, useEffect, useContext } from 'react';
import { usePalette } from 'react-palette';

import { ThemeContext } from '@contexts/ThemeContext';

import { hexToRgb } from '@utils/helpers';

export const useVibrantColor = (url) => {
  const { data: palette } = usePalette(url);
  const { theme } = useContext(ThemeContext);
  const [color, setColor] = useState({});

  useEffect(() => {
    const vibrant = palette[`${theme}Vibrant`];
    setColor({ hex: vibrant, rgb: hexToRgb(vibrant) });
  }, [palette, theme]);

  return color;
};
