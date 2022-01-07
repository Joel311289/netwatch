import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { getWatchProvidersSupported } from '@services/helpers';
import { mediaDetailMapper } from '@services/mappers';

export const pathDiscoverSeries = () => `${apiUrl}/discover/${mediaTypes.TV}`;

export const getDiscoverSeries = (
  url,
  page = 1,
  with_watch_providers = getWatchProvidersSupported()
) => {
  const params = { with_watch_providers, page };

  return axios.get(url, { params }).then(({ results, total_pages }) => {
    return { items: results.map(mediaDetailMapper), total_pages };
  });
};
