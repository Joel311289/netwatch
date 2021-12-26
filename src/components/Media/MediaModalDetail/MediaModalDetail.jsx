import { Link as LinkRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MediaItem from '../MediaItem/MediaItem';
import { formattedDate, truncatedText } from '../../../utils/helpers';
import styles from './MediaModalDetail.module.css';
import Link from '../../UI/Link/Link';

const MediaModalDetail = ({ image, title, description, date, original_title }) => {
  return (
    <div className={styles.wrapper}>
      <MediaItem image={image} width={200} ratio={1.5} />

      <div className={styles.data}>
        <LinkRouter>
          <span className={styles.title}>{title}</span>
        </LinkRouter>
        <p className={styles.subtitle}>
          {original_title || title} - {formattedDate(date)}
        </p>
        <p className={styles.description}>{truncatedText(description, 400)}</p>

        <div className={styles.more}>
          <Link>Ver más</Link>
        </div>
      </div>
    </div>
  );
};

MediaModalDetail.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired
};

export default MediaModalDetail;
