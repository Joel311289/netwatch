import { Link } from 'react-router-dom';
import { BsArrowReturnLeft } from 'react-icons/bs';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import MediaItem from '@components/Media/MediaItem/MediaItem';

const MediaAutocompleteItem = ({ styles, selected, to, title, image, date }) => {
  return (
    <Link to={to} className={`${styles['autocomplete-item']} ${selected && styles.selected}`}>
      <div className={styles.image}>
        <MediaItem.Image image={image} ratio={1.5} />
      </div>
      <Space direction="column" gap={5}>
        <span className={styles.title}>{title}</span>
        {date && <span className={styles.date}>{date}</span>}
        <div className={styles.enter}>
          <BsArrowReturnLeft />
        </div>
      </Space>
    </Link>
  );
};

MediaAutocompleteItem.propTypes = {
  styles: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  image: PropTypes.string
};

export default MediaAutocompleteItem;
