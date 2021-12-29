import PropTypes from 'prop-types';

export const bps = {
  mobile: '@media screen and (max-width: 576px)',
  tablet: '@media screen and (min-width: 768px)'
};

export const BREAKPOINTS = {
  xs: {
    width: 0,
    slidesPerView: 2,
    itemsPerRow: 2,
    spaceBetween: 10
  },
  sm: {
    width: 576,
    slidesPerView: 3,
    itemsPerRow: 3,
    spaceBetween: 15
  },
  md: {
    width: 768,
    slidesPerView: 4,
    itemsPerRow: 4,
    spaceBetween: 15
  },
  lg: {
    width: 992,
    slidesPerView: 5,
    itemsPerRow: 5,
    spaceBetween: 15
  },
  xl: {
    width: 1200,
    slidesPerView: 6,
    itemsPerRow: 6,
    spaceBetween: 20
  },
  xxl: {
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

export const ElementDefaultProps = {
  skeleton: false,
  width: 'auto',
  ratio: 1,
  items: [],

};

export const ElementPropTypes = {
  skeleton: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratio: PropTypes.number,
  to: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  items: PropTypes.aray,
  onClick: PropTypes.func,
  onDetail: PropTypes.func,
  onTrailer: PropTypes.func
};

export const MediaDefaultProps = {
  duration: 0,
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
  duration: PropTypes.number,
  date: PropTypes.string,
  genres: PropTypes.array,
  cast: PropTypes.array,
  directors: PropTypes.array,
  writers: PropTypes.array
};
