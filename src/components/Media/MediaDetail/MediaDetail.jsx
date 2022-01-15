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
  const { tablet, smallDesktop } = useBreakpointViewport();

  const imageHeight = () => (smallDesktop ? 300 : 375);

  if (skeleton) {
    return <MediaDetailSkeleton styles={styles} />;
  }

  return (
    <div className={styles.wrapper}>
      <MediaDetailHeader styles={styles} title={title} date={date} duration={duration} />

      <div className={styles.images}>
        <div className={styles.image}>
          <MediaDetailBackground styles={styles} items={posters} height={imageHeight()} />
        </div>
        <div className={styles.background}>
          <MediaDetailBackground
            styles={styles}
            items={backdrops}
            height={imageHeight()}
            type="backdrop"
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.extras}>
          <MediaDetailWatch
            styles={styles}
            next_episode_to_air={next_episode_to_air}
            watch_providers={watch_providers}
            videos={videos}
            onTrailer={onTrailer}
          />

          <MediaDetailLinks
            styles={styles}
            external_ids={external_ids}
            homepage={homepage}
            original_title={original_title}
            original_language={original_language}
          />
        </div>

        {(sections || []).map(({ key, heading, data, to, Element }, index) => (
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
