import axios from 'axios';

import { apiUrl, apiMediaTypes } from '@services/constants';
import { videoDetailMapper } from '@services/mappers';

export const getVideosSerie = (id) => {
  return axios.get(`${apiUrl}/${apiMediaTypes.TV}/${id}/videos`).then(({ results }) => {
    return results.map(videoDetailMapper);
  });
};
