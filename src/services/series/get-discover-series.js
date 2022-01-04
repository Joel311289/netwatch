import axios from 'axios';

import { apiKey, apiUrl, apiMediaTypes } from '@services/constants';
import { getWatchProvidersSupported } from '@services/helpers';
import { mediaDetailMapper } from '@services/mappers';

export const getDiscoverSeries = (
  page = 1,
  with_watch_providers = getWatchProvidersSupported()
) => {
  const params = {
    api_key: apiKey,
    with_watch_providers,
    page,
    watch_region: 'ES',
    language: 'es-ES'
  };

  return axios.get(`${apiUrl}/discover/${apiMediaTypes.TV}`, { params }).then((response) => {
    const { results } = response.data || {};

    return results.map(mediaDetailMapper);
  });
};
