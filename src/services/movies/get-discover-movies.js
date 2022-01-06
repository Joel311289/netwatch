import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';

export const getDiscoverMovies = (page = 1) => {
  const params = { page };

  return axios.get(`${apiUrl}/discover/${mediaTypes.MOVIE}`, { params }).then(({ results }) => {
    return results.map(mediaDetailMapper);
  });
};
