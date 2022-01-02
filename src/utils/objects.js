import _ from 'lodash';

export const isEmptyObject = (object) => !(object && Object.keys(object).length);

export const mergeObjects = _.merge;
