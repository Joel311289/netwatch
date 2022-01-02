import React from 'react';
import { BiGlobe, BiPlus } from 'react-icons/bi';
import { useBreakpointStyles } from '../../../hooks/useBreakpointStyles';
import { useVibrantColor } from '../../../hooks/useVibrantColor';
import MediaItem from '../MediaItem/MediaItem';
import MediaDetailSkeleton from './MediaDetail.skeleton';
import MediaDetailHeader from './MediaDetailHeader';
import MediaDetailCredits from './MediaDetailCredits';
import Button from '../../UI/Button/Button';
import { MediaDefaultProps, MediaPropTypes } from '../../../utils/constants';
import desktopStyles from './MediaDetail.module.css';
import mobileStyles from './MediaDetail.mobile.module.css';
import MediaDetailWatch from './MediaDetailWatch';

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
  const actions = [
    { tooltip: 'Añadir Mi lista', icon: <BiPlus /> },
    { tooltip: 'Sitio web', icon: <BiGlobe /> }
  ];

  if (skeleton) {
    return <MediaDetailSkeleton />;
  }

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
        <MediaDetailHeader
          styles={styles}
          title={title}
          date={date}
          duration={duration}
          number_seasons={number_seasons}
          genres={genres}
        />

        <div className={styles.image}>
          <MediaItem image={image} width={250} ratio={1.5} />
        </div>

        <span className={styles.description}>{description}</span>
        <div className={styles.credits}>
          <MediaDetailCredits credits={credits} />
        </div>

        <div className={styles.actions}>
          <MediaDetailWatch styles={styles} watch_providers={watch_providers} />

          {actions.map(({ icon, tooltip }, index) => (
            <Button key={index} tooltip={tooltip} className={styles.action}>
              {icon}
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
