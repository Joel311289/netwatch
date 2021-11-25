import moment from 'moment';
import { BREAKPOINTS, THEMES } from './constants';

// Utils

export const getThemeMode = (current) => (THEMES[current] && Object.keys(THEMES).indexOf(current) ? THEMES.LIGHT : THEMES.DARK);

export const getDeviceConfig = (width) => {
  if (width < 576) {
    return BREAKPOINTS.XS;
  } else if (width < 768) {
    return BREAKPOINTS.SM;
  } else if (width < 992) {
    return BREAKPOINTS.MD;
  } else if (width < 1200) {
    return BREAKPOINTS.LG;
  } else if (width < 1600) {
    return BREAKPOINTS.XL;
  } else {
    return BREAKPOINTS.XXL;
  }
};
export const isMobile = (breakpoint) => breakpoint === BREAKPOINTS.XS;
export const isMobileTablet = (breakpoint) => [BREAKPOINTS.XS, BREAKPOINTS.SM].includes(breakpoint);
export const isMobileTabletMedium = (breakpoint) => [BREAKPOINTS.XS, BREAKPOINTS.SM, BREAKPOINTS.MD].includes(breakpoint);

export const sortArrayByKey = (array, key, descending = false) => {
  const arraySorted = array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
  return descending ? arraySorted.reverse() : arraySorted;
};

export const formattedDate = (date) => {
  return moment(new Date(date), 'YYYYMMDD HH:mm').fromNow();
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
