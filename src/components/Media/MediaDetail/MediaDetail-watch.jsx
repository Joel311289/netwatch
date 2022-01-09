import { FiPlay, FiTv } from 'react-icons/fi';
import PropTypes from 'prop-types';

import Button from '@components/UI/Button/Button';
import Space from '@components/Layout/Space/Space';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';
import { string } from '@utils/helpers/strings';

const MediaDetailWatch = ({ styles, watch_providers, onTrailer }) => {
  const { watch_link, providers = [] } = watch_providers || {};
  const withWatchProviders = watch_link || Boolean(providers.length);
  const buttons = [
    ...(withWatchProviders
      ? [
          {
            label: 'Ver ahora',
            role: 'link',
            ...(watch_link ? { href: watch_link } : {}),
            ...(providers[0] && { className: styles['provider-stream'] }),
            icon: providers[0] ? (
              <img src={providers[0].image} className={styles['provider-logo']} />
            ) : (
              <FiTv />
            )
          }
        ]
      : []),
    { label: 'Ver trailer', icon: <FiPlay />, onClick: onTrailer }
  ];

  return (
    <Space align="center" gap={5} className={`${styles.actions} ${styles.buttons}`}>
      {buttons.map(({ label, icon, role, href, className, onClick }) => (
        <Button
          key={label}
          className={`${styles.button} ${string(className)}`}
          role={role}
          href={href}
          onClick={onClick}>
          {icon}
          <span className={styles.label}>{label}</span>
        </Button>
      ))}
    </Space>
  );
};

MediaDetailWatch.defaultProps = MediaDefaultProps;
MediaDetailWatch.propTypes = {
  styles: PropTypes.object,
  ...MediaPropTypes
};

export default MediaDetailWatch;
