import { useState, useEffect } from 'react';
import { get } from 'lodash';

import { sortCollectionBy } from '@utils/helpers/collections';

export const useNavigationSeason = ({
  seasons,
  episodes,
  current_season = '',
  current_episode = ''
}) => {
  const [navigation, setNavigation] = useState({ prev: null, next: null });
  const [routes, setRoutes] = useState({ routePrev: null, routeNext: null });

  useEffect(() => {
    let noFilteredItems = [];
    if (!episodes) {
      noFilteredItems = [...seasons.map(({ season_number }) => ({ season_number }))];
    } else {
      noFilteredItems = [
        ...seasons.reduce(
          (prev, { season_number }) =>
            current_season === season_number
              ? [...prev, ...episodes]
              : [...prev, ...[{ season_number }]],
          []
        )
      ];
    }

    if (noFilteredItems.length) {
      const filteredItems = sortCollectionBy(noFilteredItems, ['season_number', 'episode_number']);

      const position = filteredItems.findIndex((item) => {
        const season_number = get(item, 'season_number', '');
        const episode_number = get(item, 'episode_number', '');
        return season_number === current_season && episode_number === current_episode;
      });

      const prev = position === 0 ? null : filteredItems[position - 1];
      const next = position === filteredItems.length - 1 ? null : filteredItems[position + 1];
      setNavigation((nav) => ({ ...nav, prev, next }));

      const routeSeasonPrev = `seasons/${get(prev, 'season_number')}`;
      const routeSeasonNext = `seasons/${get(next, 'season_number')}`;
      setRoutes({
        routePrev: !episodes
          ? routeSeasonPrev
          : `${routeSeasonPrev}/episodes/${get(prev, 'episode_number')}`,
        routeNext: !episodes
          ? routeSeasonNext
          : `${routeSeasonNext}/episodes/${get(next, 'episode_number')}`
      });
    }
  }, [current_episode, current_season, episodes, seasons]);

  return { ...navigation, ...routes };
};
