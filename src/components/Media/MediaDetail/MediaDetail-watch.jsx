import { FiPlay, FiTv } from 'react-icons/fi';
import PropTypes from 'prop-types';

import Button from '@components/UI/Button/Button';
import Space from '@components/Layout/Space/Space';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';
import { isEmptyArray } from '@utils/helpers/arrays';
import { string } from '@utils/helpers/strings';

const MediaDetailWatch = ({ styles, watch_providers, onTrailer }) => {
  const withWatchProviders = watch_providers && !isEmptyArray(watch_providers.providers);
  const buttons = [
    ...[
      {
        label: 'Ver ahora',
        role: 'link',
        href: withWatchProviders && watch_providers.watch_link,
        ...(withWatchProviders && { className: styles['provider-stream'] }),
        icon: withWatchProviders ? (
          <img src={watch_providers.providers[0].image} className={styles['provider-logo']} />
        ) : (
          <FiTv />
        )
      }
    ],
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
          onClick={onClick}
        >
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
