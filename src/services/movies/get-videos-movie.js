import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { videoDetailMapper } from '@services/mappers';

const params = {
  include_video_language: 'es,null'
};

export const pathVideosMovie = (id) => `${apiUrl}/${mediaTypes.MOVIE}/${id}/videos`;

export const getVideosMovie = (url) => {
  return axios.get(url, { params }).then(({ results }) => {
    return results.map(videoDetailMapper);
  });
};
