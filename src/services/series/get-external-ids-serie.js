import axios from 'axios';

import { apiUrl, mediaTypes } from '@services/constants';
import { externalsIdsDetailMapper } from '@services/mappers';

export const getExternalIdsSerie = (id) => {
  return axios.get(`${apiUrl}/${mediaTypes.TV}/${id}/external_ids`).then((response) => {
    return externalsIdsDetailMapper(response);
  });
};
