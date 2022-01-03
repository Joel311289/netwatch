import { useBreakpointStyles } from '../../../hooks/useBreakpointStyles';
import { useVibrantColor } from '../../../hooks/useVibrantColor';
import MediaItem from '../MediaItem/MediaItem';
import MediaDetailSkeleton from './MediaDetail.skeleton';
import MediaDetailHeader from './MediaDetailHeader';
import MediaDetailCredits from './MediaDetailCredits';
import { MediaDefaultProps, MediaPropTypes } from '../../../utils/constants';
import desktopStyles from './MediaDetail.module.css';
import mobileStyles from './MediaDetail.mobile.module.css';
import MediaDetailWatch from './MediaDetailWatch';
import MediaDetailLinks from './MediaDetailLinks';

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
  const { rgb: mainColor } = useVibrantColor(backdrop);
  const styles = useBreakpointStyles(desktopStyles, mobileStyles);

  if (skeleton) {
    return <MediaDetailSkeleton />;
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.backdrop}
        style={{
          background: `linear-gradient(to bottom, rgba(${mainColor}, 1), rgba(${mainColor}, 0.7))`
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

        <MediaDetailWatch styles={styles} watch_providers={watch_providers} />
        <MediaDetailLinks styles={styles} external_ids={external_ids} homepage={homepage} />
      </div>
    </div>
  );
};

MediaDetail.defaultProps = MediaDefaultProps;
MediaDetail.propTypes = MediaPropTypes;

export default MediaDetail;
