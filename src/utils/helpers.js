import _ from 'lodash';
import moment from 'moment';
import 'moment/dist/locale/es';
import { BREAKPOINTS, THEMES } from './constants';

// Utils

export const showSkeleton = (skeleton) =>
  Array.isArray(skeleton) ? Boolean(skeleton.length) : Boolean(skeleton);

export const getThemeMode = (current) =>
  THEMES[current] && Object.keys(THEMES).indexOf(current) ? THEMES.LIGHT : THEMES.DARK;

export const getDeviceBreakpoint = (width) => {
  if (width < BREAKPOINTS.sm.width) {
    return 'xs';
  } else if (width < BREAKPOINTS.md.width) {
    return 'sm';
  } else if (width < BREAKPOINTS.lg.width) {
    return 'md';
  } else if (width < BREAKPOINTS.xl.width) {
    return 'lg';
  } else if (width < BREAKPOINTS.xxl.width) {
    return 'xl';
  } else {
    return 'xxl';
  }
};
export const getBreakpoints = () => {
  const breakpoints = {};
  Object.keys(BREAKPOINTS).forEach((breakpoint) => {
    const { width, slidesPerView, spaceBetween } = BREAKPOINTS[breakpoint];
    breakpoints[width] = { slidesPerView, spaceBetween };
  });
  return breakpoints;
};
export const getBreakpointConfigPlaceholders = (breakpoint) =>
  BREAKPOINTS[breakpoint].slidesPerView;
export const getBreakpointConfig = (breakpoint) => BREAKPOINTS[breakpoint];
export const isMobile = (breakpoint) => breakpoint === BREAKPOINTS.xs;
export const isMobileTablet = (breakpoint) => [BREAKPOINTS.xs, BREAKPOINTS.sm].includes(breakpoint);
export const isMobileTabletMedium = (breakpoint) =>
  [BREAKPOINTS.xs, BREAKPOINTS.sm, BREAKPOINTS.md].includes(breakpoint);

export const getWidth = (element) => (element ? element.getBoundingClientRect().width : 0);
export const getHeight = (element) => (element ? element.getBoundingClientRect().height : 0);
export const getSizes = (element) => (element ? element.getBoundingClientRect() : {});
export const getHeightRatio = (width, ratio) => (width && !isNaN(width) ? width * ratio : 'auto');

export const intersectionArrays = (array1, array2) =>
  array1.filter((value) => array2.includes(value));

export const diferenceArrays = (array1, array2) => array1.filter((x) => !array2.includes(x));

export const sortArrayByKey = (array, key, descending = false) => {
  const arraySorted = array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
  return descending ? arraySorted.reverse() : arraySorted;
};

export const getEmptyArray = (size, content = null) => Array(size).fill(content);

export const isEmptyArray = (array) =>
  Array.isArray(array) && array.length > 0 ? !array.find((item) => Boolean(item)) : true;

export const truncatedText = (text, limit) => _.truncate(text, { length: limit, separator: ' ' });

export const formattedDate = (date) => {
  moment.locale('es');
  return moment(new Date(date)).format('DD MMM YYYY');
};

export const isValidateUrl = (value) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
};

export const queryParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(urlSearchParams.entries());

  return queryParams;
};

export const throttle = _.throttle;
export const debounce = _.debounce;
