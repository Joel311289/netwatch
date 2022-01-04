import { useEffect, useState } from 'react';

import { getDeviceBreakpoint } from '@utils/helpers/breakpoints';
import { throttle } from '@utils/helpers';

export const useBreakpointViewport = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceBreakpoint(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      setBrkPnt(getDeviceBreakpoint(window.innerWidth));
    }, 200);

    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
};
