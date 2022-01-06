import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { externalsIdsDetailMapper } from '@services/mappers';

export const getExternalIdsMovie = (id) => {
  return axios.get(`${apiUrl}/${mediaTypes.MOVIE}/${id}/external_ids`).then((response) => {
    return externalsIdsDetailMapper(response);
  });
};
