import { useState, useEffect, useCallback } from 'react';

export const useResize = (elementRef, onResize) => {
  const [size, setSize] = useState([0, 0]);

  const listener = useCallback(() => {
    if (elementRef && elementRef.current && elementRef.current.getBoundingClientRect) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setSize([width, height]);

      if (onResize) {
        onResize(size);
      }
    }
  }, [elementRef]);

  useEffect(() => {
    listener();
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [listener]);

  return size;
};
