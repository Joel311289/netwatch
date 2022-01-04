import { BREAKPOINTS } from '@utils/constants';

export const getDeviceBreakpoint = (width) => {
  if (width < BREAKPOINTS.sm.width) {
    return BREAKPOINTS.xs.name;
  } else if (width < BREAKPOINTS.md.width) {
    return BREAKPOINTS.sm.name;
  } else if (width < BREAKPOINTS.lg.width) {
    return BREAKPOINTS.md.name;
  } else if (width < BREAKPOINTS.xl.width) {
    return BREAKPOINTS.lg.name;
  } else if (width < BREAKPOINTS.xxl.width) {
    return BREAKPOINTS.xl.name;
  } else {
    return BREAKPOINTS.xxl.name;
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

export const isMobile = (breakpoint) => breakpoint === BREAKPOINTS.xs.name;
export const isMobileTablet = (breakpoint) =>
  [BREAKPOINTS.xs.name, BREAKPOINTS.sm.name].includes(breakpoint);
export const isMobileTabletMedium = (breakpoint) =>
  [BREAKPOINTS.xs, BREAKPOINTS.sm, BREAKPOINTS.md].includes(breakpoint);

export const getWidth = (element) => (element ? element.getBoundingClientRect().width : 0);
export const getHeight = (element) => (element ? element.getBoundingClientRect().height : 0);
export const getSizes = (element) => (element ? element.getBoundingClientRect() : {});
export const getHeightRatio = (width, ratio) => (width && !isNaN(width) ? width * ratio : 'auto');
