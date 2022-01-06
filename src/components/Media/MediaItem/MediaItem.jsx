import { Link } from 'react-router-dom';
import { BiInfoCircle, BiPlay } from 'react-icons/bi';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import MediaItemSkeleton from '@components/Media/MediaItem/MediaItem-skeleton';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItem = ({ width, ratio, skeleton, image, title, to, lazy, onDetail, onTrailer }) => {
  const ActionIcon = (icon) => {
    return (
      <Space align="center" justify="center" className={styles.icon}>
        {icon}
      </Space>
    );
  };

  if (skeleton) {
    return <MediaItemSkeleton width={width} ratio={ratio} />;
  }

  return (
    <div className={`media-item-wrapper ${styles.wrapper}`} style={{ width, minWidth: width }}>
      <MediaItemImage image={image} width={width} ratio={ratio} to={to} lazy={lazy} />

      {title && (
        <Space direction="column" justify="between" className={styles.info}>
          <Link to={to}>
            <span className={styles.title}>{title}</span>
          </Link>

          <Space justify="between">
            <button className={styles.action} onClick={onTrailer}>
              {ActionIcon(<BiPlay />)}
              <span>Trailer</span>
            </button>
            <button className={`${styles.action} ${styles.circle}`} onClick={onDetail}>
              {ActionIcon(<BiInfoCircle />)}
            </button>
          </Space>
        </Space>
      )}
    </div>
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
