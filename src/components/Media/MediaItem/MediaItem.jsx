import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MediaItem.module.css';

const MediaItem = ({ size, title, date, image, to }) => {
  return (
    <Link className={styles.wrapper} to={to} style={{ width: size }}>
      <img className={styles.image} src={image} width={size}></img>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        {date && <span className={styles.date}>{date}</span>}
      </div>
    </Link>
  );
};

MediaItem.defaultProps = {
  size: 150,
  title: 'Title',
  date: '',
  image: '',
  to: '',
};

MediaItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MediaItem;
