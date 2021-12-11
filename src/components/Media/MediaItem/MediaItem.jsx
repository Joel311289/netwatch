import PropTypes from 'prop-types';
import styles from './MediaItem.module.css';

const MediaItem = ({ width, ratio, image, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ width }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div 
        className={styles.image}
        style={{ backgroundImage: `url(${image})`, width, height: width && !isNaN(width) ? width * ratio : 'auto' }}>
      </div>
    </div>
  );
};

MediaItem.defaultProps = {
  width: 'auto',
  ratio: 1,
  image: '',
};

MediaItem.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratio: PropTypes.number,
  image: PropTypes.string.isRequired,
};

export default MediaItem;
