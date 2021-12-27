import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiInfoCircle, BiPlay } from 'react-icons/bi';
import MediaItemSkeleton from './MediaItem.skeleton';
import { getHeightRatio, showSkeleton } from '../../../utils/helpers';
import styles from './MediaItem.module.css';

const ActionIcon = (icon) => {
  return <div className={styles.icon}>{icon}</div>;
};

const MediaItem = ({ width, ratio, skeleton, image, title, to, onDetail, onTrailer }) => {
  if (showSkeleton(skeleton)) {
    return <MediaItemSkeleton width={width} ratio={ratio} />;
  }

  return (
    <div className={styles.wrapper} style={{ width }}>
      <Link to={to}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})`, width, height: getHeightRatio(width, ratio) }}
        ></div>
      </Link>

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

MediaItem.defaultProps = {
  skeleton: false,
  width: 'auto',
  ratio: 1
};

MediaItem.propTypes = {
  skeleton: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratio: PropTypes.number,
  image: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
  onDetail: PropTypes.func,
  onTrailer: PropTypes.func
};

export default MediaItem;
