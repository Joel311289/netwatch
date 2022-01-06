import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { videoDetailMapper } from '@services/mappers';

const params = {
  include_video_language: 'es,null'
};

export const getVideosSerie = (id) => {
  return axios.get(`${apiUrl}/${mediaTypes.TV}/${id}/videos`, { params }).then(({ results }) => {
    return results.map(videoDetailMapper);
  });
};
