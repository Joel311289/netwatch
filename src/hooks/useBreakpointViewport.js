import { useEffect, useState } from 'react';

import { throttle } from '@utils/helpers';
import { getDeviceBreakpoint } from '@utils/helpers/breakpoints';

export const useBreakpointViewport = () => {
  const [breakpoint, setBreakpoint] = useState(() => getDeviceBreakpoint(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      setBreakpoint(getDeviceBreakpoint(window.innerWidth));
    }, 200);

    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return { breakpoint: breakpoint.name, ...breakpoint };
};
