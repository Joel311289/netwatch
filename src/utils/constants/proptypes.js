import PropTypes from 'prop-types';

import { noop } from '@utils/helpers';

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
  items: [],
  onClick: noop,
  onChange: noop,
  onList: noop,
  onWatch: noop,
  onTrailer: noop,
  onDetail: noop
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
  label: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  subtext: PropTypes.string,
  tooltip: PropTypes.string,
  image: PropTypes.string,
  imageKey: PropTypes.string,
  lazy: PropTypes.bool,
  items: PropTypes.array,
  checked: PropTypes.bool,
  listable: PropTypes.bool,
  watchable: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onList: PropTypes.func,
  onWatch: PropTypes.func,
  onTrailer: PropTypes.func,
  onDetail: PropTypes.func
};

export const MediaDefaultProps = {
  credits: {},
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
  backdrop: PropTypes.string,
  backdrops: PropTypes.array,
  images: PropTypes.array,
  posters: PropTypes.array,
  videos: PropTypes.array,
  duration: PropTypes.string,
  date: PropTypes.string,
  genres: PropTypes.array,
  credits: PropTypes.object,
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
