import { Link } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Space from '@components/Layout/Space/Space';

import { routePersonDetail } from '@services/helpers';

import { backgroundImageUrl } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItemCredit = ({ image, name, characters, ...detail }) => {
  const { smallDesktop } = useBreakpointViewport();

  return (
    <Link
      to={routePersonDetail(detail)}
      className={`${styles.credit} ${smallDesktop ? styles.rounded : ''}`}
    >
      <div className={styles.image} style={{ backgroundImage: backgroundImageUrl(image) }}>
        {!image && <IoPersonOutline />}
      </div>

      <Space direction="column" gap={3}>
        <span className={`${styles.name}`}>{name}</span>
        {characters && !isEmptyArray(characters) && (
          <span className={`${styles.characters}`}>
            {!smallDesktop && 'como'} {characters.join('/')}
          </span>
        )}
      </Space>
    </Link>
  );
};

MediaItemCredit.defaultProps = {
  characters: []
};

MediaItemCredit.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  characters: PropTypes.array
};

export default MediaItemCredit;
