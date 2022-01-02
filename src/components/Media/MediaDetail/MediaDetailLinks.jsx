import PropTypes from 'prop-types';
import { BiPlus, BiGlobe } from 'react-icons/bi';
import Button from '../../UI/Button/Button';
import { MediaDefaultProps, MediaPropTypes } from '../../../utils/constants';

const MediaDetailLinks = ({ styles }) => {
  const actions = [
    { tooltip: 'Añadir Mi lista', icon: <BiPlus /> },
    { tooltip: 'Sitio web', icon: <BiGlobe /> }
  ];

  return (
    <div className={`${styles.actions} ${styles.links}`}>
      {actions.map(({ icon, tooltip }, index) => (
        <Button key={index} tooltip={tooltip} className={styles.link}>
          {icon}
        </Button>
      ))}
    </div>
  );
};

MediaDetailLinks.defaultProps = MediaDefaultProps;
MediaDetailLinks.propTypes = {
  styles: PropTypes.object,
  ...MediaPropTypes
};

export default MediaDetailLinks;
