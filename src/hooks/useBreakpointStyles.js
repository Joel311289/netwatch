import { useEffect, useState } from 'react';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

export const useBreakpointStyles = ({ desktopStyles, smallDesktopStyles, mobileStyles }) => {
  const [styles, setStyles] = useState(desktopStyles);
  const { tablet, smallDesktop } = useBreakpointViewport();

  useEffect(() => {
    if (tablet) {
      setStyles(mobileStyles);
    } else if (smallDesktop) {
      setStyles(smallDesktopStyles || desktopStyles);
    } else {
      setStyles(desktopStyles);
    }
  }, [tablet, desktopStyles, mobileStyles, smallDesktop, smallDesktopStyles]);

  return styles;
};
