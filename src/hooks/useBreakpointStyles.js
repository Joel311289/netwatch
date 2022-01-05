import { useEffect, useState } from 'react';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import { isMobileTablet } from '@utils/helpers/breakpoints';

export const useBreakpointStyles = ({ desktopStyles, mobileStyles }) => {
  const [styles, setStyles] = useState(desktopStyles);
  const { breakpoint } = useBreakpointViewport();

  useEffect(() => {
    if (isMobileTablet(breakpoint)) {
      setStyles(mobileStyles);
    } else {
      setStyles(desktopStyles);
    }
  }, [breakpoint]);

  return styles;
};
