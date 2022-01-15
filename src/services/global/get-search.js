import axios from 'axios';

import { mediaDetailMapper } from '@services/mappers';
import { sortCollectionBy } from '@utils/helpers/collections';

export const getSearch = (url) => {
  return axios.get(`${url}`).then(({ results }) => {
    return sortCollectionBy(results.map(mediaDetailMapper), 'popularity', true);
  });
};
