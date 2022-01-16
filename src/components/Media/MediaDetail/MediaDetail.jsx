import PropTypes from 'prop-types';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaDetailSkeleton from '@components/Media/MediaDetail/MediaDetail-skeleton';
import MediaDetailHeader from '@components/Media/MediaDetail/MediaDetail-header';
import MediaDetailWatch from '@components/Media/MediaDetail/MediaDetail-watch';
import MediaDetailLinks from '@components/Media/MediaDetail/MediaDetail-links';
import MediaDetailBackground from '@components/Media/MediaDetail/MediaDetail-background';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';

import desktopStyles from '@components/Media/MediaDetail/MediaDetail.module.css';
import mobileStyles from '@components/Media/MediaDetail/MediaDetail-mobile.module.css';

const MediaBackground = (props) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });
  return <MediaDetailBackground styles={styles} {...props} />;
};

const MediaDetail = ({
  sections,
  skeleton,
  title,
  duration,
  date,
  number_seasons,
  watch_providers,
  homepage,
  external_ids,
  next_episode_to_air,
  backdrops,
  posters,
  videos,
  original_title,
  original_language,
  onTrailer
}) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });
  const { mobile, tablet, smallDesktop } = useBreakpointViewport();

  const imageHeight = (mobileHeight) => {
    if (mobile) return mobileHeight;
    if (smallDesktop) return 300;
    return 375;
  };

  if (skeleton) {
    return <MediaDetailSkeleton styles={styles} />;
  }

  const Header = () => (
    <MediaDetailHeader
      styles={styles}
      title={title}
      date={date}
      duration={duration}
      number_seasons={number_seasons}
    />
  );
  const Watch = () => (
    <MediaDetailWatch
      styles={styles}
      next_episode_to_air={next_episode_to_air}
      watch_providers={watch_providers}
      videos={videos}
      onTrailer={onTrailer}
    />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {!tablet && Header()}

        <div className={styles.images}>
          <div className={styles.image}>
            <MediaDetailBackground styles={styles} items={posters} height={imageHeight(210)} />
          </div>

          <div className={styles.background}>
            <MediaDetailBackground
              styles={styles}
              items={backdrops}
              height={imageHeight(200)}
              type="backdrop"
            />
          </div>

          {tablet && Header()}
          {tablet && Watch()}
        </div>

        <div className={styles.extras}>
          {!tablet && Watch()}

          <MediaDetailLinks
            styles={styles}
            external_ids={external_ids}
            homepage={homepage}
            original_title={original_title}
            original_language={original_language}
            watch_providers={watch_providers}
          />
        </div>

        {(sections || [])
          .filter(({ data }) => Boolean(data))
          .map(({ key, heading, data, to, Element }, index) => (
            <div key={key} className={`${styles.section} ${styles[`section-${index + 1}`]}`}>
              <div className={styles['section-heading']}>
                <MediaHeading text={heading} to={to} />
              </div>

              <Element to={to} {...data} styles={styles} />
            </div>
          ))}
      </div>
    </div>
  );
};

MediaDetail.defaultProps = MediaDefaultProps;
MediaDetail.propTypes = {
  sections: PropTypes.array,
  ...MediaPropTypes
};

MediaDetail.Skeleton = MediaDetailSkeleton;
MediaDetail.Header = MediaDetailHeader;
MediaDetail.Watch = MediaDetailWatch;
MediaDetail.Links = MediaDetailLinks;
MediaDetail.Background = MediaBackground;

export default MediaDetail;
