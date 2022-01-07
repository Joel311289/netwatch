import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { mediaDetailMapper, creatorDetailMapper } from '@services/mappers';

export const pathDetailSerie = (id) => `${apiUrl}/${mediaTypes.TV}/${id}`;

export const getDetailSerie = (url) => {
  return axios.get(url).then((response) => {
    const { creators, ...detail } = mediaDetailMapper(response);

    return {
      ...detail,
      creators: (creators || []).map(creatorDetailMapper)
    };
  });
};
