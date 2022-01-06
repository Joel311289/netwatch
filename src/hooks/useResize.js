import { useState, useEffect } from 'react';

import { getSizes } from '@utils/helpers/breakpoints';

export const useResize = (elementRef) => {
  const [sizes, setSizes] = useState({});
  const container = document.querySelector('.App');

  useEffect(() => {
    let ro;
    if (container) {
      ro = new ResizeObserver(() => {
        if (elementRef && elementRef.current) {
          setSizes(getSizes(elementRef.current));
        }
      });
      ro.observe(container);
    }
    return () => ro && ro.unobserve(container);
  }, [container, elementRef]);

  return sizes;
};
