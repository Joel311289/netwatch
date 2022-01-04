import axios from 'axios';

import { apiKey, apiUrl, apiMediaTypes } from '@services/constants';
import { watchProvidersDetailMapper, watchProviderDetailMapper } from '@services/mappers';

export const getWatchProvidersSerie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios
    .get(`${apiUrl}/${apiMediaTypes.TV}/${id}/watch/providers`, { params })
    .then((response) => {
      const { results } = response.data || {};
      const { watch_link, providers } = watchProvidersDetailMapper(results['ES']);

      return {
        watch_link,
        providers: providers.map(watchProviderDetailMapper)
      };
    });
};
