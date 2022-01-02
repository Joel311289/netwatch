import _ from 'lodash';
import { THEMES } from './constants';

export * from './colors.js';
export * from './arrays.js';
export * from './strings.js';
export * from './objects.js';
export * from './collections.js';
export * from './breakpoints.js';

// Utils

export const showSkeleton = (skeleton) =>
  Array.isArray(skeleton) ? Boolean(skeleton.length) : Boolean(skeleton);

export const getThemeMode = (current) =>
  THEMES[current] && Object.keys(THEMES).indexOf(current) ? THEMES.LIGHT : THEMES.DARK;

export const throttle = _.throttle;
export const debounce = _.debounce;
