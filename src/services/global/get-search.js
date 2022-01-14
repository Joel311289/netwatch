import axios from 'axios';

import { mediaDetailMapper } from '@services/mappers';

export const getSearch = (url) => {
  return axios.get(`${url}`).then(({ results }) => {
    return results.map(mediaDetailMapper);
  });
};
