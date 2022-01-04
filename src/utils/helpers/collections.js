import _ from 'lodash';

export const sortCollectionBy = (array, key, descending = false) =>
  _.orderBy(array, [key], [descending ? 'desc' : 'asc']);
