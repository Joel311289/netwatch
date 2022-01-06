import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { mediaDetailMapper, creatorDetailMapper } from '@services/mappers';

export const path = (id) => `api/${mediaTypes.TV}/${id}`;

export const getDetailSerie = (id) => {
  return axios.get(`${apiUrl}/${path(id)}`).then((response) => {
    const { creators, ...detail } = mediaDetailMapper(response);

    return {
      ...detail,
      creators: (creators || []).map(creatorDetailMapper)
    };
  });
};
