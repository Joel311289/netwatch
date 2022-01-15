import { Link } from 'react-router-dom';
import { BsArrowReturnLeft } from 'react-icons/bs';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import { truncatedText } from '@utils/helpers/strings';

const MediaAutocompleteItem = ({ styles, selected, to, title, image, date }) => {
  return (
    <Link to={to} className={`${styles['autocomplete-item']} ${selected && styles.selected}`}>
      <div className={styles.image}>
        <MediaItemImage image={image} ratio={1.5} />
      </div>
      <Space direction="column" gap={5}>
        <span className={styles.title}>{truncatedText(title, 70)}</span>
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
