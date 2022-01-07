import axios from 'axios';

import { getWatchProvidersSupported } from '@services/helpers';
import { mediaDetailMapper } from '@services/mappers';

export const getDiscoverSeries = (url, with_watch_providers = getWatchProvidersSupported()) => {
  const params = { with_watch_providers };

  return axios.get(`${url}`, { params }).then(({ results, total_pages }) => {
    return { items: results.map(mediaDetailMapper), total_pages };
  });
};
