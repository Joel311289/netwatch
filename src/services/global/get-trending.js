import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';

export const TIME_WINDOW = {
  DAY: 'day',
  WEEK: 'week'
};

export const getTrending = (mediaType = mediaTypes.ALL, timeWindow = TIME_WINDOW.DAY) => {
  return axios.get(`${apiUrl}/trending/${mediaType}/${timeWindow}`).then(({ results }) => {
    return results.map(mediaDetailMapper);
  });
};
