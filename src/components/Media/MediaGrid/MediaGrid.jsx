import PropTypes from 'prop-types';

import Grid from '@components/Layout/Grid/Grid';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { routeMediaDetail } from '@services/helpers';

import styles from '@components/Media/MediaGrid/MediaGrid.module.css';

const MediaGrid = ({ items }) => {
  return (
    <div className={`media-grid-wrapper ${styles.wrapper}`}>
      <Grid>
        {items.map((item, index) => (
          <MediaItem
            key={index}
            ratio={1.5}
            skeleton={!item}
            listable
            to={routeMediaDetail(item)}
            {...item}
          />
        ))}
      </Grid>
    </div>
  );
};

MediaGrid.defaultProps = {
  items: []
};

MediaGrid.propTypes = {
  items: PropTypes.array,
  skeleton: PropTypes.bool
};

export default MediaGrid;
