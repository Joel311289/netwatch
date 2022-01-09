import { useEffect, useState } from 'react';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

export const useBreakpointStyles = ({ desktopStyles, mobileStyles }) => {
  const [styles, setStyles] = useState(desktopStyles);
  const { tablet } = useBreakpointViewport();

  useEffect(() => {
    if (tablet) {
      setStyles(mobileStyles);
    } else {
      setStyles(desktopStyles);
    }
  }, [tablet, desktopStyles, mobileStyles]);

  return styles;
};
