import axios from 'axios';

import { mediaDetailMapper } from '@services/mappers';

export const getDiscoverMovies = (url) => {
  return axios.get(`${url}`).then(({ results, total_pages }) => {
    return { items: results.map(mediaDetailMapper), total_pages };
  });
};
