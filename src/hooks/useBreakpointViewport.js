import { useEffect, useState } from 'react';
import { getDeviceConfig, throttle } from '../utils/helpers';

export const useBreakpointViewport = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      setBrkPnt(getDeviceConfig(window.innerWidth));
    }, 200);

    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
};
