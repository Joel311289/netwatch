import axios from 'axios';

import { apiUrl, apiMediaTypes } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';

export const getDiscoverMovies = (page = 1) => {
  const params = { page };

  return axios.get(`${apiUrl}/discover/${apiMediaTypes.MOVIE}`, { params }).then(({ results }) => {
    return results.map(mediaDetailMapper);
  });
};
