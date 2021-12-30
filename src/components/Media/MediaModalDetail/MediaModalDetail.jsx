import { Link as LinkRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MediaItem from '../MediaItem/MediaItem';
import { formattedDate, truncatedText } from '../../../utils/helpers';
import styles from './MediaModalDetail.module.css';
import Link from '../../UI/Link/Link';

const MediaModalDetail = ({ to, image, title, description, date }) => {
  return (
    <div className={styles.wrapper}>
      <MediaItem to={to} image={image} width={200} ratio={1.5} />

      <div className={styles.data}>
        <LinkRouter to={to}>
          <span className={styles.title}>{title}</span>
        </LinkRouter>
        <p className={styles.subtitle}>
          {formattedDate(date)}
        </p>
        <p className={styles.description}>{truncatedText(description, 400)}</p>

        <div className={styles.more}>
          <Link to={to}>Ver más</Link>
        </div>
      </div>
    </div>
  );
};

MediaModalDetail.propTypes = {
  to: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  original_title: PropTypes.string
};

export default MediaModalDetail;
