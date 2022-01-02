import { useState, useEffect, useContext } from 'react';
import { usePalette } from 'react-palette';
import { hexToRgb } from '../utils/helpers';
import { ThemeContext } from '../contexts/ThemeContext';

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
