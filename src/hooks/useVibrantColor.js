import { useState, useEffect } from 'react';
import { usePalette } from 'react-palette';
import { hexToRgb } from '../utils/helpers';

export const useVibrantColor = (url) => {
  const { data: palette } = usePalette(url);
  const [color, setColor] = useState({});

  useEffect(() => {
    if (palette) {
      setColor({ hex: palette.vibrant, rgb: hexToRgb(palette.vibrant) });
    }
  }, [palette]);

  return color;
};
