import axios from 'axios';

import { mediaDetailMapper } from '@services/mappers';

export const getTrending = (url) => {
  return axios.get(`${url}`).then(({ results }) => {
    return results.map(mediaDetailMapper);
  });
};
