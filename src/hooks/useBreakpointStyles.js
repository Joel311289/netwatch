import { useEffect, useState } from 'react';
import { isMobileTablet } from '../utils/helpers';
import { useBreakpointViewport } from './useBreakpointViewport';

export const useBreakpointStyles = (desktopStyles, mobileStyles) => {
  const [styles, setStyles] = useState(desktopStyles);
  const breakpoint = useBreakpointViewport();

  useEffect(() => {
    if (isMobileTablet(breakpoint)) {
      setStyles(mobileStyles);
    } else {
      setStyles(desktopStyles);
    }
  }, [breakpoint]);

  return styles;
};
