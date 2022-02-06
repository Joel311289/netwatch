import axios from 'axios';

import { episodeDetailMapper } from '@services/mappers';

const params = {
  append_to_response: 'external_ids,videos,images'
};

export const getSeasonEpisodeSerie = (url) => {
  return axios.get(`${url}`, { params }).then((response) => {
    return episodeDetailMapper(response);
  });
};
