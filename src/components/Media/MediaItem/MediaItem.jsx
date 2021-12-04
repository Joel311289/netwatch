import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MediaItem.module.css';

const MediaItem = ({ size, ratio, title, date, image, to }) => {
  return (
    <Link className={styles.wrapper} to={to} style={{ width: size }}>
      <div 
        className={styles.image}
        style={{ backgroundImage: `url(${image})`, width: size, height: size * ratio }}>
      </div>
    </Link>
  );
};

MediaItem.defaultProps = {
  size: 150,
  ratio: 1,
  title: 'Title',
  date: '',
  image: '',
  to: '',
};

MediaItem.propTypes = {
  size: PropTypes.number.isRequired,
  ratio: PropTypes.number,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MediaItem;
