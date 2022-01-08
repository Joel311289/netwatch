import { BREAKPOINTS } from '@utils/constants';

export const getDeviceBreakpoint = (width) => {
  return Object.keys(BREAKPOINTS)
    .map((k) => BREAKPOINTS[k])
    .find((b) => width <= b.width);
};
export const getBreakpoints = () => {
  const breakpoints = {};
  Object.keys(BREAKPOINTS).forEach((breakpoint) => {
    const { width, slidesPerView, spaceBetween } = BREAKPOINTS[breakpoint];
    breakpoints[width] = { slidesPerView, spaceBetween };
  });
  return breakpoints;
};

export const isMobile = (breakpoint) => breakpoint === BREAKPOINTS.xs.name;
export const isMobileTablet = (breakpoint) =>
  [BREAKPOINTS.xs.name, BREAKPOINTS.sm.name].includes(breakpoint);
export const isMobileTabletMedium = (breakpoint) =>
  [BREAKPOINTS.xs, BREAKPOINTS.sm, BREAKPOINTS.md].includes(breakpoint);

export const getWidth = (element) => (element ? element.getBoundingClientRect().width : 0);
export const getHeight = (element) => (element ? element.getBoundingClientRect().height : 0);
export const getSizes = (element) => (element ? element.getBoundingClientRect() : {});
export const getHeightRatio = (width, ratio) => (width && !isNaN(width) ? width * ratio : 'auto');
