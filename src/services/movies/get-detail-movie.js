import axios from 'axios';

import { apiKey, apiUrl, apiMediaTypes } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';

export const getDetailMovie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios.get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}`, { params }).then((response) => {
    const data = response.data || {};

    return mediaDetailMapper(data);
  });
};
