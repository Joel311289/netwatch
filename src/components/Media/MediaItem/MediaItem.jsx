import { Link } from 'react-router-dom';
import { BiInfoCircle, BiPlay } from 'react-icons/bi';
import MediaItemSkeleton from './MediaItem.skeleton';
import { getHeightRatio, showSkeleton } from '../../../utils/helpers';
import { ElementDefaultProps, ElementPropTypes } from '../../../utils/constants';
import styles from './MediaItem.module.css';

const ActionIcon = (icon) => {
  return <div className={styles.icon}>{icon}</div>;
};

const MediaItem = ({ width, ratio, skeleton, image, title, to, onDetail, onTrailer }) => {
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

  if (showSkeleton(skeleton)) {
    return <MediaItemSkeleton width={width} ratio={ratio} />;
  }

  return (
    <div className={styles.wrapper} style={{ width, minWidth: width }}>
      {to && <Link to={to}>{Image(true)}</Link>}
      {!to && Image()}

      {title && (
        <div className={styles.info}>
          <Link to={to}>
            <span className={styles.title}>{title}</span>
          </Link>
          <div className={styles.actions} onClick={onTrailer}>
            <button className={styles.action}>
              {ActionIcon(<BiPlay />)}
              <span>Trailer</span>
            </button>
            <button className={`${styles.action} ${styles.circle}`} onClick={onDetail}>
              {ActionIcon(<BiInfoCircle />)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

MediaItem.defaultProps = ElementDefaultProps;
MediaItem.propTypes = ElementPropTypes;

export default MediaItem;
