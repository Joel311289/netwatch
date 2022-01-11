import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Skeleton from '@components/UI/Skeleton/Skeleton';
import Space from '@components/Layout/Space/Space';
import MediaItemSkeleton from '@components/Media/MediaItem/MediaItem-skeleton';

import { getEmptyArray } from '@utils/helpers/arrays';

const MediaDetailSkeleton = ({ styles }) => {
  const { sizeImage } = useBreakpointViewport();

  return (
    <div className={`${styles.wrapper} ${styles.skeleton}`}>
      <div className={styles.background}>
        <Skeleton height={300} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <Skeleton width={280} height={30} />
          <Skeleton variant="text" width={180} height={15} style={{ marginTop: 5 }} />
        </div>

        <div className={styles.image}>
          <MediaItemSkeleton body={false} width={sizeImage} ratio={1.5} />
        </div>

        <Space gap={10} direction="column" className={`${styles.actions} ${styles.buttons}`}>
          <Skeleton className={styles.button} height={44} />
          <Skeleton className={styles.button} height={44} />
        </Space>

        <div className={styles.description}>
          {getEmptyArray(4).map((_, index) => (
            <Skeleton key={index} variant="text" style={{ maxWidth: '100%' }} />
          ))}
        </div>

        {getEmptyArray(1).map((_, index) => (
          <div key={index} className={styles.section}>
            <div className={styles['section-heading']}>
              <Skeleton width={200} height={30} />
            </div>
            <Space gap={10}>
              <Skeleton height={150} width={250} />
              <Skeleton height={150} width={250} />
            </Space>
          </div>
        ))}
      </div>
    </div>
  );
};

MediaDetailSkeleton.propTypes = {
  styles: PropTypes.object
};

export default MediaDetailSkeleton;
