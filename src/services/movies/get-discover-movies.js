import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';

export const pathDiscoverMovies = (page = 1) =>
  `${apiUrl}/discover/${mediaTypes.MOVIE}?page=${page}`;

export const getDiscoverMovies = (url) => {
  return axios.get(url).then(({ results, total_pages }) => {
    return { items: results.map(mediaDetailMapper), total_pages };
  });
};
