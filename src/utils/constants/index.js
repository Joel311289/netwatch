/* ---------- Breakpoints */

export const BREAKPOINTS = {
  xs: {
    name: 'xs',
    width: 576,
    slidesPerView: 2,
    itemsPerRow: 2,
    spaceBetween: 10
  },
  sm: {
    name: 'sm',
    width: 768,
    slidesPerView: 3,
    itemsPerRow: 3,
    spaceBetween: 15
  },
  md: {
    name: 'md',
    width: 992,
    slidesPerView: 4,
    itemsPerRow: 4,
    spaceBetween: 15
  },
  lg: {
    name: 'lg',
    width: 1200,
    slidesPerView: 5,
    itemsPerRow: 5,
    spaceBetween: 15
  },
  xl: {
    name: 'xl',
    width: 1600,
    slidesPerView: 6,
    itemsPerRow: 6,
    spaceBetween: 15
  },
  xxl: {
    name: 'xxl',
    width: 9999,
    slidesPerView: 6,
    itemsPerRow: 6,
    spaceBetween: 15
  }
};

export const bps = {
  mobile: `@media screen and (max-width: ${BREAKPOINTS.xs.width}px)`,
  tablet: `@media screen and (min-width: ${BREAKPOINTS.md.width}px)`
};

/* ---------- Theme */

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const THEME_STORAGE_KEY = 'theme';
