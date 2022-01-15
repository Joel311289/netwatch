import _ from 'lodash';

import { removeArrayByIndex } from '@utils/helpers/arrays';

export const sortCollectionBy = (array, key, descending = false) =>
  _.orderBy(array, [key], [descending ? 'desc' : 'asc']);
export const removeCollectionBy = (array, key, value) => {
  if (!Array.isArray(array)) {
    return [];
  }
  const index = array.findIndex((item) => item[key] === value);
  return removeArrayByIndex(array, index);
};
