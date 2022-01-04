import axios from 'axios';

import { apiKey, apiUrl, apiMediaTypes } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';

export const getMoviesPopular = (page = 1) => {
  const params = {
    api_key: apiKey,
    page,
    region: 'ES',
    language: 'es-ES'
  };

  return axios.get(`${apiUrl}/${apiMediaTypes.MOVIE}/popular`, { params }).then((response) => {
    const { results } = response.data || {};

    return results.map(mediaDetailMapper);
  });
};
