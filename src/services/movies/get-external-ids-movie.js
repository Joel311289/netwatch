import axios from 'axios';

import { apiKey, apiUrl, apiMediaTypes } from '@services/constants';
import { externalsIdsDetailMapper } from '@services/mappers';

export const getExternalIdsMovie = (id) => {
  const params = {
    api_key: apiKey,
    language: 'es-ES'
  };

  return axios
    .get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}/external_ids`, { params })
    .then((response) => {
      const data = response.data || {};

      return externalsIdsDetailMapper(data);
    });
};
