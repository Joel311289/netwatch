import axios from 'axios';

import { apiUrl, apiMediaTypes } from '@services/constants';
import { mediaDetailMapper, creatorDetailMapper } from '@services/mappers';

export const getDetailSerie = (id) => {
  return axios.get(`${apiUrl}/${apiMediaTypes.TV}/${id}`).then((response) => {
    const { creators, ...detail } = mediaDetailMapper(response);

    return {
      ...detail,
      creators: (creators || []).map(creatorDetailMapper)
    };
  });
};
