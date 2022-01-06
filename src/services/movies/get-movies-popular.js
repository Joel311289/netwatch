import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';

export const getMoviesPopular = (page = 1) => {
  const params = {
    page
  };

  return axios.get(`${apiUrl}/${mediaTypes.MOVIE}/popular`, { params }).then(({ results }) => {
    return results.map(mediaDetailMapper);
  });
};
