import { Link } from 'react-router-dom';
import { BiInfoCircle, BiPlay } from 'react-icons/bi';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import MediaItemSkeleton from '@components/Media/MediaItem/MediaItem-skeleton';

import { getHeightRatio } from '@utils/helpers/breakpoints';
import { ElementDefaultProps, ElementPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItem = ({ width, ratio, skeleton, image, title, to, onDetail, onTrailer }) => {
  const ActionIcon = (icon) => {
    return (
      <Space align="center" justify="center" className={styles.icon}>
        {icon}
      </Space>
    );
  };
  const Image = (link) => {
    return (
      <div
        className={`${styles.image} ${link ? styles.link : ''}`}
        style={{
          backgroundImage: `url(${image})`,
          width,
          height: getHeightRatio(width, ratio)
        }}
      ></div>
    );
  };

  if (skeleton) {
    return <MediaItemSkeleton width={width} ratio={ratio} />;
  }

  return (
    <div className={styles.wrapper} style={{ width, minWidth: width }}>
      {to && <Link to={to}>{Image(true)}</Link>}
      {!to && Image()}

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

export default MediaItem;
