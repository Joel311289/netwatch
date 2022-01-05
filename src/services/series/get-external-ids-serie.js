import axios from 'axios';

import { apiUrl, apiMediaTypes } from '@services/constants';
import { externalsIdsDetailMapper } from '@services/mappers';

export const getExternalIdsSerie = (id) => {
  return axios.get(`${apiUrl}/${apiMediaTypes.TV}/${id}/external_ids`).then((response) => {
    return externalsIdsDetailMapper(response);
  });
};
