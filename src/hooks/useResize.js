import _ from 'lodash';
import { useState, useEffect } from 'react';

export const useResize = (elementRef, onResize) => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    const listener = _.throttle(() => {
      if (elementRef && elementRef.current && elementRef.current.getBoundingClientRect) {
        const { width, height } = elementRef.current.getBoundingClientRect();
        setSize([width, height]);
  
        if (onResize) {
          onResize(size);
        }
      }
    }, 200);

    listener();
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  return size;
};
