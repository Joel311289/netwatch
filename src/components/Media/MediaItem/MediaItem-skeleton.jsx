import Skeleton from '@components/UI/Skeleton/Skeleton';
import Space from '@components/Layout/Space/Space';

import { getHeightRatio } from '@utils/helpers/breakpoints';
import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItemSkeleton = ({ width, ratio, body }) => {
  return (
    <div style={{ width }}>
      <Skeleton width={width} height={getHeightRatio(width, ratio)} />
      {body && (
        <Space direction="column" justify="between" className={`${styles.info} ${styles.skeleton}`}>
          <div>
            <Skeleton height={18} />
            <Skeleton height={18} style={{ marginTop: 3 }} />
          </div>
          <Skeleton variant="action" width={100} />
        </Space>
      )}
    </div>
  );
};

MediaItemSkeleton.defaultProps = ElementDefaultProps;
MediaItemSkeleton.propTypes = ElementPropTypes;

export default MediaItemSkeleton;
