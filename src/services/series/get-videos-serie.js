import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { videoDetailMapper } from '@services/mappers';

const params = {
  include_video_language: 'es,null'
};

export const pathVideosSerie = (id) => `${apiUrl}/${mediaTypes.TV}/${id}/videos`;

export const getVideosSerie = (url) => {
  return axios.get(url, { params }).then(({ results }) => {
    return results.map(videoDetailMapper);
  });
};
