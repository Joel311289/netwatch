import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import Button from '@components/UI/Button/Button';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';

const MediaDetailGeneral = ({ styles, description, genres }) => {
  return (
    <div className={`${styles.general}`}>
      <Space align="center" gap={5} className={styles.genres}>
        {(genres || []).map((genre) => (
          <Button key={genre} secondary rounded size="small" className={styles.genre}>
            {genre}
          </Button>
        ))}
      </Space>
      <span>{description || 'Sin descripción'}</span>
    </div>
  );
};

MediaDetailGeneral.defaultProps = MediaDefaultProps;
MediaDetailGeneral.propTypes = {
  styles: PropTypes.object,
  children: PropTypes.node,
  ...MediaPropTypes
};

export default MediaDetailGeneral;
