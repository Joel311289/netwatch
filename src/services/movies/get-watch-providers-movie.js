import axios from 'axios';
import {
  apiKey,
  apiUrl,
  apiMediaTypes,
  watchProvidersDetailMapper,
  watchProviderDetailMapper
} from '../index.js';

export const getWatchProvidersMovie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios
    .get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}/watch/providers`, { params })
    .then((response) => {
      const { results } = response.data || {};
      const { watch_link, providers } = watchProvidersDetailMapper(results['ES']);

      return {
        watch_link,
        providers: providers.map(watchProviderDetailMapper)
      };
    });
};