import axios from 'axios';
import { apiKey, apiUrl, mediaDetailMapper } from './index.js';

export const MEDIA_TYPES = {
  ALL: 'all',
  MOVIE: 'movie',
  TV: 'tv',
  PERSONA: 'person',
};

export const TIME_WINDOW = {
  DAY: 'day',
  WEEK: 'week',
};

export const getTrending = (mediaType = MEDIA_TYPES.ALL, timeWindow = TIME_WINDOW.DAY) => {
  return axios.get(`${apiUrl}/trending/${mediaType}/${timeWindow}?api_key=${apiKey}&language=es`)
    .then((response) => {
      const { results } = response.data || {};
      
      return results.map(result => mediaDetailMapper(result));
    });
};
