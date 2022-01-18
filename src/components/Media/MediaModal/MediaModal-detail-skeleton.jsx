import Skeleton from '@components/UI/Skeleton/Skeleton';
import Space from '@components/Layout/Space/Space';
import MediaItemSkeleton from '@components/Media/MediaItem/MediaItem-skeleton';

import { ElementPropTypes } from '@utils/constants/proptypes';
import { getEmptyArray } from '@utils/helpers/arrays';

const MediaModalDetailSkeleton = ({ styles }) => {
  return (
    <Space gap={25} className={styles.detail}>
      <div className={styles.image}>
        <MediaItemSkeleton width={200} ratio={1.5} body={false} />
      </div>
      <div className={styles.background}>
        <Skeleton height={200} />
      </div>

      <Space direction="column" className={styles.data}>
        <Space direction="column" gap={[10, 10]} className={styles.header}>
          <div className={styles.title}>
            <Skeleton width={300} height={25} />
          </div>
          <Skeleton width={200} height={23} />
        </Space>

        <Space direction="column" className={styles.description}>
          {getEmptyArray(5).map((_, index) => (
            <Skeleton key={index} variant="text" width="100%" />
          ))}
        </Space>

        <Space justify="end" className={styles.more}>
          <Skeleton variant="action" width={100} />
        </Space>
      </Space>
    </Space>
  );
};

MediaModalDetailSkeleton.propTypes = ElementPropTypes;

export default MediaModalDetailSkeleton;
