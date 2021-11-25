import { useState, useEffect } from 'react';

export const useMediaQuery = (mediaQuery) => {
  const [matches, setMatches] = useState(false);
  const query = mediaQuery.split('@media').reverse()[0];

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};
