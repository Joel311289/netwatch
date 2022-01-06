import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { mediaDetailMapper } from '@services/mappers';
// `${apiUrl}/${mediaTypes.MOVIE}/${id}`
export const getDetailMovie = (url) => {
  return axios.get(url).then((response) => {
    return mediaDetailMapper(response);
  });
};
