import axios from 'axios';

import { apiUrl, mediaTypes, timesWindow } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';

export const pathTrending = (mediaType = mediaTypes.ALL, timeWindow = timesWindow.DAY) =>
  `${apiUrl}/trending/${mediaType}/${timeWindow}`;

export const getTrending = (url) => {
  return axios.get(url).then(({ results }) => {
    return results.map(mediaDetailMapper);
  });
};
