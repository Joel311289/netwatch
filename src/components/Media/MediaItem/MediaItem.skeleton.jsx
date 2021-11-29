import PropTypes from 'prop-types';
import styles from './MediaItem.skeleton.module.css';

const MediaItemSkeleton = ({ size, ratio }) => {
  return (
    <div className={styles.wrapper} style={{ width: size }}>
      <div className={`skeleton ${styles.image}`} style={{ width: size, height: size * ratio }}></div>
      <div className={`skeleton ${styles.info}`}></div>
    </div>
  );
};

MediaItemSkeleton.defaultProps = {
  size: 150,
  ratio: 1,
};

MediaItemSkeleton.propTypes = {
  size: PropTypes.number.isRequired,
  ratio: PropTypes.number,
};

export default MediaItemSkeleton;
