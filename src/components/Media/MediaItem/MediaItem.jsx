import { Link } from 'react-router-dom';

import MediaItemSkeleton from '@components/Media/MediaItem/MediaItem-skeleton';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItem = ({ width, ratio, skeleton, image, title, date, to, lazy }) => {
  return (
    <>
      <div className={`media-item-wrapper ${styles.wrapper}`} style={{ width }}>
        {!skeleton && <MediaItemImage image={image} ratio={ratio} to={to} lazy={lazy} />}

        {title && (
          <Link to={to} className={styles.info}>
            <span className={styles.title}>{title}</span>
            <span className={styles.date}>{date || 'Por determinar'}</span>
          </Link>
        )}
      </div>

      {skeleton && <MediaItemSkeleton width={width} ratio={ratio} />}
    </>
  );
};

MediaItem.defaultProps = ElementDefaultProps;
MediaItem.propTypes = ElementPropTypes;

export default MediaItem;
