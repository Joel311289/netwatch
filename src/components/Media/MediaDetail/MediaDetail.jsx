import React from 'react';
import { FiPlay } from 'react-icons/fi';
import { BiGlobe, BiPlus, BiTv } from 'react-icons/bi';
import { useBreakpointStyles } from '../../../hooks/useBreakpointStyles';
import { useVibrantColor } from '../../../hooks/useVibrantColor';
import MediaItem from '../MediaItem/MediaItem';
import MediaDetailSkeleton from './MediaDetail.skeleton';
import MediaDetailCredits from './MediaDetailCredits';
import Chip from '../../UI/Chip/Chip';
import Button from '../../UI/Button/Button';
import { MediaDefaultProps, MediaPropTypes } from '../../../utils/constants';
import desktopStyles from './MediaDetail.module.css';
import mobileStyles from './MediaDetail.mobile.module.css';

const MediaDetail = ({
  skeleton,
  title,
  description,
  image,
  backdrop,
  genres,
  duration,
  date,
  credits,
  number_seasons,
  watch_providers
}) => {
  const { rgb: mainColor } = useVibrantColor(backdrop);
  const styles = useBreakpointStyles(desktopStyles, mobileStyles);
  const subheadings = [
    { label: date },
    { label: duration },
    ...(number_seasons ? [{ label: `${number_seasons} temporada(s)` }] : [])
  ];
  const actions = [
    { label: 'Ver trailer', icon: <FiPlay /> },
    { tooltip: 'Añadir Mi lista', icon: <BiPlus /> },
    { tooltip: 'Sitio web', icon: <BiGlobe /> }
  ];

  if (skeleton) {
    return <MediaDetailSkeleton />;
  }

  const Header = () => {
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <h2 className={styles.heading}>{title}</h2>
          <span className={styles.subheadings}>
            {subheadings.map(({ label }, index) => (
              <React.Fragment key={index}>
                {label}
                <span className={styles.separator}>•</span>
              </React.Fragment>
            ))}
          </span>
        </div>
        <div className={styles.genres}>
          {(genres || []).map((genre) => (
            <Chip key={genre} text={genre} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.backdrop}
        style={{
          background: `linear-gradient(to bottom, rgba(${mainColor}, 0.8), rgba(var(--color-backdrop), 0.9))`
        }}></div>

      {mainColor && (
        <div className={styles.background} style={{ backgroundImage: `url(${backdrop})` }}></div>
      )}

      <div className={`${styles.content}`}>
        {Header()}

        <div className={styles.image}>
          <MediaItem image={image} width={250} ratio={1.5} />
        </div>

        {watch_providers && (
          <div className={styles.providers}>
            <div className={styles['provider-label']}>Disponible en:</div>
            <div className={styles['provider-items']}>
              {watch_providers.providers.map(({ id, image }) => (
                <img key={id} src={image} className={styles['provider-item']} />
              ))}
            </div>
            <Button className={styles.action} role="link" href={watch_providers.watch_link}>
              <BiTv />
              <span className={styles.label}>Ver ahora</span>
            </Button>
          </div>
        )}

        <span className={styles.description}>{description}</span>
        <div className={styles.credits}>
          <MediaDetailCredits credits={credits} />
        </div>

        <div className={styles.actions}>
          {actions.map(({ label, icon, tooltip }, index) => (
            <Button key={index} tooltip={tooltip} className={styles.action}>
              {icon}
              <span className={styles.label}>{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

MediaDetail.defaultProps = MediaDefaultProps;
MediaDetail.propTypes = MediaPropTypes;

export default MediaDetail;
