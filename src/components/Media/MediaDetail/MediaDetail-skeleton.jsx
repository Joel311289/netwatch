import PropTypes from 'prop-types';

import Skeleton from '@components/UI/Skeleton/Skeleton';
import List from '@components/UI/List/List';
import Space from '@components/Layout/Space/Space';
import MediaItemSkeleton from '@components/Media/MediaItem/MediaItem-skeleton';

import { getEmptyArray } from '@utils/helpers/arrays';

const MediaDetailSkeleton = ({ styles }) => {
  return (
    <div className={`${styles.wrapper} ${styles.skeleton}`}>
      <div className={`${styles.backdrop} ${styles.skeleton}`}></div>

      <div className={styles.background}>
        <Skeleton height={250} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <Skeleton width={280} height={30} />
          <Skeleton variant="text" width={180} height={15} style={{ marginTop: 5 }} />
        </div>

        <div className={styles.image}>
          <MediaItemSkeleton body={false} width={250} ratio={1.5} />
        </div>

        <div className={styles.description}>
          {getEmptyArray(4).map((_, index) => (
            <Skeleton key={index} variant="text" style={{ maxWidth: '100%' }} />
          ))}
        </div>

        <div className={styles.credits}>
          <List divider>
            {getEmptyArray(3).map((_, index) => (
              <Space key={index} gap={[5, 20]} className={styles.credit}>
                <Skeleton width={120} height={19} />
                <Skeleton width={350} height={19} style={{ maxWidth: '50vw' }} />
              </Space>
            ))}
          </List>
        </div>

        <div className={`${styles.actions} ${styles.buttons}`}>
          <Skeleton width={150} height={44} />
        </div>
        <Space align="center" gap={10} className={`${styles.actions} ${styles.links}`}>
          <Skeleton variant="circular" width={44} />
          <Skeleton variant="circular" width={44} />
          <Skeleton variant="circular" width={44} />
        </Space>
      </div>
    </div>
  );
};

MediaDetailSkeleton.propTypes = {
  styles: PropTypes.object
};

export default MediaDetailSkeleton;
