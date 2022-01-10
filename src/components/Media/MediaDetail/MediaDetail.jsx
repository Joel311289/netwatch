import PropTypes from 'prop-types';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';

import MediaItem from '@components/Media/MediaItem/MediaItem';
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
  description,
  image,
  genres,
  duration,
  date,
  watch_providers,
  homepage,
  external_ids,
  onTrailer
}) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });

  if (skeleton) {
    return <MediaDetailSkeleton styles={styles} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.content}`}>
        <div className={styles.image}>
          <MediaItem.Image image={image} ratio={1.5} zoom={true} />
        </div>
        <MediaDetailWatch styles={styles} watch_providers={watch_providers} onTrailer={onTrailer} />
        <MediaDetailLinks styles={styles} external_ids={external_ids} homepage={homepage} />

        <MediaDetailHeader
          styles={styles}
          title={title}
          date={date}
          duration={duration}
          genres={genres}
        />

        <span className={styles.description}>{description}</span>

        {(sections || []).map(({ key, heading, data, to, Element }, index) => (
          <div key={key} className={`${styles.section} ${styles[`section-${index + 1}`]}`}>
            <div className={styles['section-heading']}>
              <MediaHeading text={heading} to={to} />
            </div>

            <Element to={to} {...{ [key]: data }} />
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
