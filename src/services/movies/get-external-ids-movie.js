import axios from 'axios';

import { apiUrl, apiMediaTypes } from '@services/constants';
import { externalsIdsDetailMapper } from '@services/mappers';

export const getExternalIdsMovie = (id) => {
  return axios.get(`${apiUrl}/${apiMediaTypes.MOVIE}/${id}/external_ids`).then((response) => {
    return externalsIdsDetailMapper(response);
  });
};
