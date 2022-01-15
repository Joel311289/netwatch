import { FiPlay, FiPlus, FiTv } from 'react-icons/fi';
import PropTypes from 'prop-types';

import Button from '@components/UI/Button/Button';
import Space from '@components/Layout/Space/Space';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';
import { string } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';
// import MediaHeading from '../MediaHeading/MediaHeading';

const MediaDetailWatch = ({ styles, watch_providers, next_episode_to_air, videos, onTrailer }) => {
  // const { next_episode_name, next_episode_date, next_episode_season_number } =
  //   next_episode_to_air || {};

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

  return (
    <Space direction="column">
      <Space justify="start" gap={5} className={`${styles.actions} ${styles.buttons}`}>
        {buttons.map(({ label, icon, role, href, className, onClick, ...attributes }) => (
          <Button
            key={label}
            className={`${styles.button} ${string(className)}`}
            role={role}
            href={href}
            {...attributes}
            onClick={onClick}>
            {icon}
            <span className={styles.label}>{label}</span>
          </Button>
        ))}
      </Space>

      <Space direction="column" gap={0} className={styles.section}>
        {/* <div className={styles['section-heading']}>
          <MediaHeading text="Próximo capítulo" />
        </div>

        <Space direction="column" gap={5} className={styles['next-date']}>
          {next_episode_name && (
            <span>{`${next_episode_name} (T${next_episode_season_number})`}</span>
          )}
          {next_episode_date && <span>{next_episode_date}</span>}
        </Space> */}

        <Space
          direction="column"
          justify="start"
          gap={15}
          className={`${styles.actions} ${styles.buttons}`}>
          {secondaryButtons.map(({ label, icon, onClick }) => (
            <Button key={label} secondary className={`${styles.button}`} onClick={onClick}>
              {icon}
              <span className={styles.label}>{label}</span>
            </Button>
          ))}
        </Space>
      </Space>
    </Space>
  );
};

MediaDetailWatch.defaultProps = MediaDefaultProps;
MediaDetailWatch.propTypes = {
  styles: PropTypes.object,
  ...MediaPropTypes
};

export default MediaDetailWatch;
