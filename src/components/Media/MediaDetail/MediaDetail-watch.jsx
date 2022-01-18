import { FiPlay, FiPlus, FiTv } from 'react-icons/fi';
import PropTypes from 'prop-types';

import Button from '@components/UI/Button/Button';
import Space from '@components/Layout/Space/Space';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';
import { string } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

const MediaDetailWatch = ({ styles, watch_providers, videos, onTrailer }) => {
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
    ...(!isEmptyArray(videos)
      ? [{ label: 'Ver trailer', icon: <FiPlay />, onClick: onTrailer }]
      : [])
  ];
  const secondaryButtons = [{ label: 'Añadir mi lista', icon: <FiPlus /> }];

  const ButtonContent = (icon, label) => (
    <>
      <Space align="center" justify="center" className={styles['button-icon']}>
        {icon}
      </Space>
      <span className={styles.label}>{label}</span>
    </>
  );

  return (
    <>
      <Space justify="start" gap={5} className={`${styles.actions} ${styles.buttons}`}>
        {buttons.map(({ label, icon, role, href, className, onClick, ...attributes }) => (
          <Button
            key={label}
            className={`${styles.button} ${string(className)}`}
            role={role}
            href={href}
            {...attributes}
            onClick={onClick}>
            {ButtonContent(icon, label)}
          </Button>
        ))}
      </Space>

      <Space
        justify="start"
        gap={5}
        className={`${styles.actions} ${styles.buttons} ${styles.secondary}`}>
        {secondaryButtons.map(({ label, icon, onClick }) => (
          <Button key={label} secondary className={`${styles.button}`} onClick={onClick}>
            {ButtonContent(icon, label)}
          </Button>
        ))}
      </Space>
    </>
  );
};

MediaDetailWatch.defaultProps = MediaDefaultProps;
MediaDetailWatch.propTypes = {
  styles: PropTypes.object,
  ...MediaPropTypes
};

export default MediaDetailWatch;
