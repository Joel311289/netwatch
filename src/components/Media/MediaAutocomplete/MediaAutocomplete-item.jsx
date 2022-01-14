import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import MediaItem from '@components/Media/MediaItem/MediaItem';

const MediaAutocompleteItem = ({ styles, to, id, title, image, date }) => {
  return (
    <Link to={to} className={styles['autocomplete-item']} replace id={id}>
      <div className={styles.image}>
        <MediaItem.Image image={image} ratio={1.5} />
      </div>
      <Space direction="column" gap={5}>
        <span className={styles.title}>{title}</span>
        {date && <span className={styles.date}>{date}</span>}
      </Space>
    </Link>
  );
};

MediaAutocompleteItem.propTypes = {
  styles: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  image: PropTypes.string
};

export default MediaAutocompleteItem;
