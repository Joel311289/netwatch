import axios from 'axios';

import { mediaDetailMapper, creatorDetailMapper } from '@services/mappers';

export const getDetailSerie = (url) => {
  return axios.get(`${url}`).then((response) => {
    const { creators, ...detail } = mediaDetailMapper(response);

    return {
      ...detail,
      creators: (creators || []).map(creatorDetailMapper)
    };
  });
};
