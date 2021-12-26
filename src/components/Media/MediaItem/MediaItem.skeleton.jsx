import PropTypes from 'prop-types';
import Skeleton from '../../UI/Skeleton/Skeleton';
import { getHeightRatio } from '../../../utils/helpers';
import styles from './MediaItem.module.css';

const MediaItemSkeleton = ({ width, ratio }) => {
  return (
    <div className={styles.wrapper} style={{ width }}>
      <Skeleton width={width} height={getHeightRatio(width, ratio)} />
      <div className={`${styles.info} ${styles.skeleton}`}>
        <div>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
        <Skeleton variant="action" width={100} />
      </div>
    </div>
  )
};

MediaItemSkeleton.defaultProps = {
  width: 'auto',
  ratio: 1,
};

MediaItemSkeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratio: PropTypes.number,
};

export default MediaItemSkeleton;
