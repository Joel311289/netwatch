import _ from 'lodash';

import { THEMES } from '@utils/constants';

export const getThemeMode = (current) => (current === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);

export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const throttle = _.throttle;
export const debounce = _.debounce;
export const noop = _.noop;
