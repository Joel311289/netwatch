import { useBreakpointStyles } from '../../../hooks/useBreakpointStyles';
import MediaItemSkeleton from '../MediaItem/MediaItem.skeleton';
import Skeleton from '../../UI/Skeleton/Skeleton';
import { getEmptyArray } from '../../../utils/helpers';
import List from '../../UI/List/List';
import { ElementDefaultProps, ElementPropTypes } from '../../../utils/constants';
import desktopStyles from './MediaDetail.module.css';
import mobileStyles from './MediaDetail.mobile.module.css';

const MediaDetailSkeleton = () => {
  const styles = useBreakpointStyles(desktopStyles, mobileStyles);

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <Skeleton height={250} />
      </div>

      <div className={`${styles.backdrop} ${styles.skeleton}`}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Skeleton width={280} height={30} />
            <Skeleton variant="text" width={180} height={15} style={{ marginTop: 5 }} />
          </div>

          <div className={styles.image}>
            <MediaItemSkeleton body={false} width={250} ratio={1.5} />
          </div>

          <div className={styles.detail}>
            <div className={styles.genres}>
              {getEmptyArray(3).map((_, index) => (
                <Skeleton key={index} variant="chip" width={70} />
              ))}
            </div>

            <div className={styles.description}>
              {getEmptyArray(4).map((_, index) => (
                <Skeleton key={index} variant="text" style={{ maxWidth: '100%' }} />
              ))}
            </div>

            <div className={styles.credit}>
              <List divider>
                {getEmptyArray(3).map((_, index) => (
                  <div key={index} className={`${styles.credit} ${styles.skeleton}`}>
                    <Skeleton width={120} height={19} />
                    <Skeleton width={350} height={19} style={{ maxWidth: '50vw' }} />
                  </div>
                ))}
              </List>
            </div>

            <div className={styles.actions}>
              <Skeleton width={150} height={44} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MediaDetailSkeleton.defaultProps = ElementDefaultProps;
MediaDetailSkeleton.propTypes = ElementPropTypes;

export default MediaDetailSkeleton;
