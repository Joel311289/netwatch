import PropTypes from 'prop-types';

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
  skeleton: PropTypes.bool,
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
  credits: [],
  genres: [],
  cast: [],
  director: [],
  writer: [],
  external_ids: []
};

export const MediaPropTypes = {
  title: PropTypes.string,
  original_title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  duration: PropTypes.string,
  date: PropTypes.string,
  genres: PropTypes.array,
  credits: PropTypes.array,
  cast: PropTypes.array,
  directors: PropTypes.array,
  writers: PropTypes.array,
  number_episodes: PropTypes.number,
  number_seasons: PropTypes.number,
  watch_providers: PropTypes.shape({
    watch_link: PropTypes.string,
    providers: PropTypes.array
  }),
  external_ids: PropTypes.array,
  home_page: PropTypes.string
};
