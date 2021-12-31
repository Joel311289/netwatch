import { useEffect, useState } from 'react';
import { isMobile } from '../utils/helpers';
import { useBreakpointViewport } from './useBreakpointViewport';

export const useBreakpointStyles = (desktopStyles, mobileStyles) => {
  const [styles, setStyles] = useState(desktopStyles);
  const breakpoint = useBreakpointViewport();

  useEffect(() => {
    if (isMobile(breakpoint)) {
      setStyles({ ...desktopStyles, ...mobileStyles });
    } else {
      setStyles(desktopStyles);
    }
  }, [breakpoint]);

  return styles;
};
