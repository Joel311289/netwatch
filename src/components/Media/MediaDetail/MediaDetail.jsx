import { useBreakpointStyles } from '@hooks/useBreakpointStyles';
import { useVibrantColor } from '@hooks/useVibrantColor';

import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaDetailSkeleton from '@components/Media/MediaDetail/MediaDetail-skeleton';
import MediaDetailHeader from '@components/Media/MediaDetail/MediaDetail-header';
import MediaDetailCredits from '@components/Media/MediaDetail/MediaDetail-credits';
import MediaDetailWatch from '@components/Media/MediaDetail/MediaDetail-watch';
import MediaDetailLinks from '@components/Media/MediaDetail/MediaDetail-links';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants';

import desktopStyles from '@components/Media/MediaDetail/MediaDetail.module.css';
import mobileStyles from '@components/Media/MediaDetail/MediaDetail-mobile.module.css';

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
  watch_providers,
  homepage,
  external_ids
}) => {
  const styles = useBreakpointStyles(desktopStyles, mobileStyles);
  const { rgb: mainColor } = useVibrantColor(backdrop);

  if (skeleton) {
    return <MediaDetailSkeleton styles={styles} />;
  }

  return (
    <div className={`${styles.wrapper} fade-in`}>
      <div
        className={styles.backdrop}
        style={{
          background: `linear-gradient(to bottom, rgba(${mainColor}, 1), rgba(${mainColor}, 0.7))`
        }}
      ></div>

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
          <MediaDetailCredits styles={styles} credits={credits} />
        </div>

        <MediaDetailWatch styles={styles} watch_providers={watch_providers} />
        <MediaDetailLinks styles={styles} external_ids={external_ids} homepage={homepage} />
      </div>
    </div>
  );
};

MediaDetail.defaultProps = MediaDefaultProps;
MediaDetail.propTypes = MediaPropTypes;

export default MediaDetail;
