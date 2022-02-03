import { Link } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';

import { backgroundImageUrl } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItemCredit = ({ id, image, name, characters }) => {
  return (
    <Link to={`/persons/${id}`} className={`${styles.credit}`}>
      <div className={styles.image} style={{ backgroundImage: backgroundImageUrl(image) }}>
        {!image && <IoPersonOutline />}
      </div>

      <Space direction="column" gap={3}>
        <span className={`${styles.name}`}>{name}</span>
        {characters && !isEmptyArray(characters) && (
          <span className={`${styles.characters}`}>como {characters.join('/')}</span>
        )}
      </Space>
    </Link>
  );
};

MediaItemCredit.defaultProps = {
  direction: 'row',
  characters: []
};

MediaItemCredit.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  characters: PropTypes.array
};

export default MediaItemCredit;
