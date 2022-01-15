import _ from 'lodash';

export const lastElementArray = (array, position) => _.last(array, position);
export const getElementArray = (array, position) => _.nth(array, position);
export const isEmptyArray = (array) => Array.isArray(array) && compactArray(array).length === 0;
export const getEmptyArray = (size, content = false) => Array(size).fill(content);
export const truncateArray = (array, limit) => (Array.isArray(array) ? array.slice(0, limit) : []);
export const splitArray = (array, callback) => {
  if (!Array.isArray(array)) {
    return [];
  }
  const _array = [...array];
  return [_.remove(_array, callback), _array];
};
export const splitArrayByIndex = (array, index) => {
  const [filtered, removed] = splitArray(array, (_, i) => i <= index);
  return [filtered, removed];
};
export const removeArrayByIndex = (array, index) => {
  const [filtered, removed] = splitArrayByIndex(array, index);
  return [...filtered.slice(0, -1), ...removed];
};

export const compactArray = _.compact;
export const lastArray = _.last;
export const uniqArray = _.uniq;
export const dropArray = _.drop;
export const takeArray = _.take;
export const flattenArray = _.flatten;
export const differenceArrays = _.difference;
export const intersectionArrays = _.intersection;
