import axios from 'axios';

import { apiUrl, apiMediaTypes } from '@services/constants';
import { videoDetailMapper } from '@services/mappers';

const params = {
  include_video_language: 'es,null'
};

export const getVideosMovie = (id) => {
  return axios
    .get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}/videos`, { params })
    .then(({ results }) => {
      return results.map(videoDetailMapper);
    });
};
