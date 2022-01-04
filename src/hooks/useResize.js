import { useState, useEffect, useCallback } from 'react';

import { getSizes } from '@utils/helpers/breakpoints';

export const useResize = (elementRef, onResize) => {
  const [sizes, setSizes] = useState({});

  const listener = useCallback(() => {
    if (elementRef && elementRef.current) {
      setSizes(getSizes(elementRef.current));

      if (onResize) {
        onResize(sizes);
      }
    }
  }, [elementRef]);

  useEffect(() => {
    listener();
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [listener, document.body.clientHeight]);

  return sizes;
};
