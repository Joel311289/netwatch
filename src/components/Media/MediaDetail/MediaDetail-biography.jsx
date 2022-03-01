import PropTypes from 'prop-types';

import Link from '@components/UI/Link/Link';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';

const MediaDetailBiography = ({ styles, biography, to }) => {
  return (
    <div className={`${styles.section} ${styles.biography}`}>
      <div className={styles['section-heading']}>
        <MediaHeading text="Biografía" />
      </div>

      <div className={styles['biography-content']}>{biography || 'Sin biografía'}</div>

      <Link to={to} className={styles['biography-link-more']}>
        Ver más
      </Link>
    </div>
  );
};

MediaDetailBiography.propTypes = {
  styles: PropTypes.object,
  biography: PropTypes.string.isRequired,
  to: PropTypes.string
};

export default MediaDetailBiography;
