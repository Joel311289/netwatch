import { FiPlay } from 'react-icons/fi';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import { MediaDefaultProps, MediaPropTypes } from '../../../utils/constants';

const MediaDetailWatch = ({ styles, watch_providers }) => {
  const buttons = [
    {
      label: 'Ver ahora',
      role: 'link',
      href: watch_providers && watch_providers.watch_link,
      className: styles['provider-stream'],
      icon: (
        <img
          src={watch_providers && watch_providers.providers[0].image}
          className={styles['provider-logo']}
        />
      )
    },
    { label: 'Ver trailer', icon: <FiPlay /> }
  ];

  return (
    <div className={styles.buttons}>
      {buttons.map(({ label, icon, role, href, className }) => (
        <Button key={label} className={`${styles.button} ${className}`} role={role} href={href}>
          {icon}
          <span className={styles.label}>{label}</span>
        </Button>
      ))}
    </div>
  );
};

MediaDetailWatch.defaultProps = MediaDefaultProps;
MediaDetailWatch.propTypes = {
  styles: PropTypes.object,
  ...MediaPropTypes
};

export default MediaDetailWatch;
