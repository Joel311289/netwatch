import _ from 'lodash';

export const truncateArray = (array, limit) => (Array.isArray(array) ? array.slice(0, limit) : []);
export const getEmptyArray = (size, content = null) => Array(size).fill(content);
export const isEmptyArray = (array) => Array.isArray(array) && compactArray(array).length === 0;

export const compactArray = _.compact;
export const takeArray = _.take;
export const differenceArrays = _.difference;
export const intersectionArrays = _.intersection;
