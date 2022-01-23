import PropTypes from 'prop-types';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaDetailSkeleton from '@components/Media/MediaDetail/MediaDetail-skeleton';
import MediaDetailHeader from '@components/Media/MediaDetail/MediaDetail-header';
import MediaDetailWatch from '@components/Media/MediaDetail/MediaDetail-watch';
import MediaDetailLinks from '@components/Media/MediaDetail/MediaDetail-links';
import MediaSliderImage from '@components/Media/MediaSlider/MediaSlider-image';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';
import { getWidthRatio } from '@utils/helpers/breakpoints';

import desktopStyles from '@components/Media/MediaDetail/MediaDetail.module.css';
import mobileStyles from '@components/Media/MediaDetail/MediaDetail-mobile.module.css';

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
  const { mobile, tablet, smallDesktop } = useBreakpointViewport();

  const imageWidth = () => {
    return getWidthRatio(imageHeight(210), 1.5);
  };
  const imageHeight = (mobileHeight) => {
    if (mobile) return mobileHeight;
    if (smallDesktop) return 300;
    return 375;
  };

  if (skeleton) {
    return <MediaDetailSkeleton styles={styles} />;
  }

  const Header = () => (
    <MediaDetailHeader styles={styles} title={title} date={date} duration={duration} />
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

        <div className={styles.images} style={{ gridTemplateColumns: `${imageWidth()}px auto` }}>
          <div className={styles.image} style={{ width: imageWidth() }}>
            <MediaSliderImage zoom items={posters} height={imageHeight(210)} />
          </div>

          <div className={styles.background}>
            <MediaSliderImage
              zoom
              styles={styles}
              items={backdrops}
              height={imageHeight(200)}
              type="backdrop"
            />
          </div>

          {tablet && Header()}
        </div>

        {tablet && Watch()}

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

export default MediaDetail;
