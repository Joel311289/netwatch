import PropTypes from 'prop-types';

export const bps = {
  mobile: '@media screen and (max-width: 576px)',
  tablet: '@media screen and (min-width: 768px)'
};

export const BREAKPOINTS = {
  xs: {
    name: 'xs',
    width: 0,
    slidesPerView: 2,
    itemsPerRow: 2,
    spaceBetween: 10
  },
  sm: {
    name: 'sm',
    width: 576,
    slidesPerView: 3,
    itemsPerRow: 3,
    spaceBetween: 15
  },
  md: {
    name: 'md',
    width: 768,
    slidesPerView: 4,
    itemsPerRow: 4,
    spaceBetween: 15
  },
  lg: {
    name: 'lg',
    width: 992,
    slidesPerView: 5,
    itemsPerRow: 5,
    spaceBetween: 15
  },
  xl: {
    name: 'xl',
    width: 1200,
    slidesPerView: 6,
    itemsPerRow: 6,
    spaceBetween: 20
  },
  xxl: {
    name: 'xxl',
    width: 1600,
    slidesPerView: 6,
    itemsPerRow: 6,
    spaceBetween: 20
  }
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const THEME_STORAGE_KEY = 'theme';

export const ContextPropTypes = {
  children: PropTypes.node
};

export const ElementDefaultProps = {
  body: true,
  skeleton: false,
  checked: false,
  disabled: false,
  width: 'auto',
  height: 'auto',
  ratio: 1,
  items: []
};

export const ElementPropTypes = {
  className: PropTypes.string,
  skeleton: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  children: PropTypes.node,
  style: PropTypes.object,
  body: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratio: PropTypes.number,
  to: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  heading: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  tooltip: PropTypes.string,
  image: PropTypes.string,
  items: PropTypes.array,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func
};

export const MediaDefaultProps = {
  genres: [],
  cast: [],
  director: [],
  writer: []
};

export const MediaPropTypes = {
  title: PropTypes.string,
  original_title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  duration: PropTypes.string,
  date: PropTypes.string,
  genres: PropTypes.array,
  cast: PropTypes.array,
  directors: PropTypes.array,
  writers: PropTypes.array
};
