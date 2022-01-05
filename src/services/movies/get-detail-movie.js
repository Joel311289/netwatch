import axios from 'axios';

import { apiUrl, apiMediaTypes } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';

export const getDetailMovie = (id) => {
  return axios.get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}`).then((response) => {
    return mediaDetailMapper(response);
  });
};
