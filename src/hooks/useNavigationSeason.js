import { useState, useEffect } from 'react';
import { get } from 'lodash';

import { sortCollectionBy } from '@utils/helpers/collections';
import { routeSeasonDetail } from '@services/helpers';

export const useNavigationSeason = ({ seasons, current_season = '', current_episode = '' }) => {
  const [navigation, setNavigation] = useState({ prev: null, next: null });
  const [routes, setRoutes] = useState({ routePrev: null, routeNext: null });

  useEffect(() => {
    let noFilteredItems = [];
    if (!current_episode) {
      noFilteredItems = [...seasons.map(({ season_number }) => ({ season_number }))];
    } else {
      noFilteredItems = [
        ...seasons.reduce(
          (prev, { season_number, episodes }) => [
            ...prev,
            ...Array(episodes)
              .fill()
              .map((_, index) => ({
                season_number,
                episode_number: index + 1
              }))
          ],
          []
        )
      ];
    }

    if (noFilteredItems.length) {
      const filteredItems = sortCollectionBy(noFilteredItems, ['season_number', 'episode_number']);
      console.log(seasons, noFilteredItems);

      const position = filteredItems.findIndex((item) => {
        const season_number = get(item, 'season_number', '');
        const episode_number = get(item, 'episode_number', '');
        return season_number === current_season && episode_number === current_episode;
      });

      const prev = position === 0 ? null : filteredItems[position - 1];
      const next = position === filteredItems.length - 1 ? null : filteredItems[position + 1];
      setNavigation((nav) => ({ ...nav, prev, next }));

      setRoutes({
        routePrev: routeSeasonDetail(prev),
        routeNext: routeSeasonDetail(next)
      });
    }
  }, [current_episode, current_season, seasons]);

  return { ...navigation, ...routes };
};
