import Skeleton from '../../UI/Skeleton/Skeleton';
import { getHeightRatio } from '../../../utils/helpers';
import { ElementDefaultProps, ElementPropTypes } from '../../../utils/constants';
import styles from './MediaItem.module.css';

const MediaItemSkeleton = ({ width, ratio, body }) => {
  return (
    <div className={styles.wrapper} style={{ width }}>
      <Skeleton width={width} height={getHeightRatio(width, ratio)} />
      {body && (
        <div className={`${styles.info} ${styles.skeleton}`}>
          <div>
            <Skeleton height={18} />
            <Skeleton height={18} style={{ marginTop: 3 }} />
          </div>
          <Skeleton variant="action" width={100} />
        </div>
      )}
    </div>
  );
};

MediaItemSkeleton.defaultProps = ElementDefaultProps;
MediaItemSkeleton.propTypes = ElementPropTypes;

export default MediaItemSkeleton;
