import { Link } from 'react-router-dom';
import { FiInfo } from 'react-icons/fi';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import MediaItemSkeleton from '@components/Media/MediaItem/MediaItem-skeleton';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItem = ({ width, ratio, skeleton, image, title, to, lazy, onDetail }) => {
  return (
    <>
      <div className={`media-item-wrapper ${styles.wrapper}`} style={{ width }}>
        {!skeleton && <MediaItemImage image={image} ratio={ratio} to={to} lazy={lazy} />}

        {title && (
          <Space direction="column" justify="between" className={styles.info}>
            <Link to={to}>
              <span className={styles.title}>{title}</span>
            </Link>

            <Space justify="between" direction="row-reverse">
              <button className={`${styles.button} ${styles.circle}`} onClick={onDetail}>
                <FiInfo />
              </button>
            </Space>
          </Space>
        )}
      </div>

      {skeleton && <MediaItemSkeleton width={width} ratio={ratio} />}
    </>
  );
};

MediaItem.defaultProps = ElementDefaultProps;
MediaItem.propTypes = {
  ...ElementPropTypes,
  onDetail: PropTypes.func,
  onTrailer: PropTypes.func
};

MediaItem.Skeleton = MediaItemSkeleton;
MediaItem.Image = MediaItemImage;

export default MediaItem;
