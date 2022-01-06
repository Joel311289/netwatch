import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { getWatchProvidersSupported } from '@services/helpers';
import { mediaDetailMapper } from '@services/mappers';

export const getDiscoverSeries = (
  page = 1,
  with_watch_providers = getWatchProvidersSupported()
) => {
  const params = { with_watch_providers, page };

  return axios.get(`${apiUrl}/discover/${mediaTypes.TV}`, { params }).then(({ results }) => {
    return results.map(mediaDetailMapper);
  });
};
