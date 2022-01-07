import axios from 'axios';

import { videoDetailMapper } from '@services/mappers';

const params = {
  include_video_language: 'es,null'
};

export const getVideosMovie = (url) => {
  return axios.get(`${url}`, { params }).then(({ results }) => {
    return results.map(videoDetailMapper);
  });
};
