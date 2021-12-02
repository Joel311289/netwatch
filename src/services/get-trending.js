import axios from 'axios';
import { apiKey, apiUrl, mediaDetailMapper, apiMediaTypes } from './index.js';

export const TIME_WINDOW = {
  DAY: 'day',
  WEEK: 'week',
};

export const getTrending = (mediaType = apiMediaTypes.ALL, timeWindow = TIME_WINDOW.DAY) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES',
  };

  return axios.get(`${apiUrl}/trending/${mediaType}/${timeWindow}`, { params })
    .then((response) => {
      const { results } = response.data || {};
      
      return results.map(result => mediaDetailMapper(result));
    });
};
