import PropTypes from 'prop-types';
import { truncatedText } from '../../../utils/helpers';
import styles from './MediaItem.module.css';

const MediaItemExtended = ({ width, ratio, title, date, description, image, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`${styles.wrapper} ${styles.extended}`}
      style={{ width }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div 
        className={styles.image}
        style={{ backgroundImage: `url(${image})`, width, height: width && !isNaN(width) ? width * ratio : 'auto' }}>
      </div>

      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{truncatedText(description, 150)}</span>
        {date && <span className={styles.date}>{date}</span>}
      </div>
    </div>
  );
};

MediaItemExtended.defaultProps = {
  width: 'auto',
  ratio: 1,
  title: 'Title',
  date: '',
  image: '',
};

MediaItemExtended.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratio: PropTypes.number,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default MediaItemExtended;
