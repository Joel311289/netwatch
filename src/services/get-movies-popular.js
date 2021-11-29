import axios from 'axios';
import { apiKey, apiUrl, mediaDetailMapper, apiMediaTypes } from './index.js';

export const getMoviesPopular = (page = 1) => {
  const params = {
    apiKey,
    page,
    region: 'ES',
    language: 'es-ES',
  };

  return axios.get(`${apiUrl}/${apiMediaTypes.MOVIE}/popular`, { params })
    .then((response) => {
      const { results } = response.data || {};
      
      return results.map(result => mediaDetailMapper(result));
    });
};
