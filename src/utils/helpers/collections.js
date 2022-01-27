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
export const removeDuplicatesCollectionBy = (array, key) => {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.filter((v, i, a) => a.findIndex((t) => t[key] === v[key]) === i);
};
