import axios from 'axios';
import { apiKey, apiUrl, mediaDetailMapper, apiMediaTypes } from './index.js';

export const getDiscoverMovies = (page = 1) => {
  const params = {
    api_key: apiKey,
    page,
    watch_region: 'ES',
    language: 'es-ES'
  };

  return axios.get(`${apiUrl}/discover/${apiMediaTypes.MOVIE}`, { params }).then((response) => {
    const { results } = response.data || {};

    return results.map((result) => mediaDetailMapper(result));
  });
};
