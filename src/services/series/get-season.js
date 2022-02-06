import axios from 'axios';

import { episodeDetailMapper, seasonDetailMapper } from '@services/mappers';

const params = {
  include_video_language: 'es,null'
};

export const getSeasonSerie = (url) => {
  return axios.get(`${url}`, { params }).then((response) => {
    const { episodes } = response;

    return {
      ...seasonDetailMapper(response),
      episodes: episodes.map(episodeDetailMapper)
    };
  });
};
