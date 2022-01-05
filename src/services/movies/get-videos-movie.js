import axios from 'axios';

import { apiUrl, apiMediaTypes } from '@services/constants';
import { videoDetailMapper } from '@services/mappers';

export const getVideosMovie = (id) => {
  return axios.get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}/videos`).then(({ results }) => {
    return results.map(videoDetailMapper);
  });
};
