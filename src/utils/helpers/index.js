import _ from 'lodash';
import { THEMES } from '@utils/constants';

export * from './colors.js';
export * from './arrays.js';
export * from './strings.js';
export * from './objects.js';
export * from './collections.js';
export * from './breakpoints.js';

// Utils

export const getThemeMode = (current) => (current === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);

export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const throttle = _.throttle;
export const debounce = _.debounce;
