import axios from 'axios';
import { apiKey, apiUrl, getWatchProvidersSupported, mediaDetailMapper, apiMediaTypes } from '../index.js';

export const getDiscoverSeries = (page = 1, with_watch_providers = getWatchProvidersSupported()) => {
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
