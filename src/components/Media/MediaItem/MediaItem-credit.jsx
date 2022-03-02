import { Link } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Space from '@components/Layout/Space/Space';
import Skeleton from '@components/UI/Skeleton/Skeleton';

import { routePersonDetail } from '@services/helpers';

import { backgroundImageUrl } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItemCredit = ({ skeleton, image, name, characters, ...detail }) => {
  const { smallDesktop } = useBreakpointViewport();

  if (skeleton) {
    return (
      <div className={`${styles.credit} ${smallDesktop ? styles.rounded : ''}`}>
        <div className={`${styles.image} ${styles.skeleton}`}>
          <Skeleton height="100%" width="100%" />
        </div>

        <Space direction="column" gap={3}>
          <Skeleton className={styles.name} height={20} width={100} />
          <Skeleton className={styles.characters} height={16} width={150} />
        </Space>
      </div>
    );
  }

  return (
    <Link
      to={routePersonDetail(detail)}
      className={`${styles.credit} ${smallDesktop ? styles.rounded : ''}`}
    >
      <div className={styles.image} style={{ backgroundImage: backgroundImageUrl(image) }}>
        {!image && <IoPersonOutline />}
      </div>

      <Space direction="column" gap={3}>
        <span className={styles.name}>{name}</span>
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
  skeleton: PropTypes.bool,
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  characters: PropTypes.array
};

export default MediaItemCredit;
