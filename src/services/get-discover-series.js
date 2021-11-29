import axios from 'axios';
import { apiKey, apiUrl, getNetworksSupported, mediaDetailMapper, apiMediaTypes } from './index.js';

export const getDiscoverSeries = (page = 1, with_networks = getNetworksSupported()) => {
  const params = {
    apiKey,
    with_networks,
    page,
    watch_region: 'ES',
    language: 'es-ES',
  };

  return axios.get(`${apiUrl}/discover/${apiMediaTypes.SERIE}`, { params })
    .then((response) => {
      const { results } = response.data || {};
      
      return results.map(result => mediaDetailMapper(result));
    });
};
