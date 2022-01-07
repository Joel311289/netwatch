import axios from 'axios';

import { mediaDetailMapper } from '@services/mappers';

export const getDetailMovie = (url) => {
  return axios.get(`${url}`).then((response) => {
    return mediaDetailMapper(response);
  });
};
