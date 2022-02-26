import PropTypes from 'prop-types';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaDetailSkeleton from '@components/Media/MediaDetail/MediaDetail-skeleton';
import MediaDetailHeader from '@components/Media/MediaDetail/MediaDetail-header';
import MediaDetailWatch from '@components/Media/MediaDetail/MediaDetail-watch';
import MediaDetailLinks from '@components/Media/MediaDetail/MediaDetail-links';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';

import { MediaDefaultProps, MediaPropTypes } from '@utils/constants/proptypes';
import { getWidthRatio } from '@utils/helpers/breakpoints';

import desktopStyles from '@components/Media/MediaDetail/MediaDetail.module.css';
import mobileStyles from '@components/Media/MediaDetail/MediaDetail-mobile.module.css';

const MediaDetail = ({ sections, skeleton, duration, image, backdrop, biography, ...detail }) => {
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

  const Header = () => <MediaDetailHeader styles={styles} duration={duration} {...detail} />;
  const Watch = () => duration && <MediaDetailWatch styles={styles} {...detail} />;

  return (
    <div className={`media-detai-wrapper ${styles.wrapper}`}>
      <div className={styles.content}>
        {!tablet && Header()}

        <div className={styles.images} style={{ gridTemplateColumns: `${imageWidth()}px auto` }}>
          <div className={styles.image} style={{ width: imageWidth() }}>
            <MediaItemImage zoom image={image} width="100%" height={imageHeight(210)} />
          </div>

          {backdrop && (
            <div className={styles.background}>
              <MediaItemImage
                zoom
                image={backdrop}
                width="100%"
                height={imageHeight(200)}
                type="backdrop"
              />
            </div>
          )}

          {tablet && Header()}

          {biography && (
            <div className={`${styles.section} ${styles.biography}`}>
              <div className={styles['section-heading']}>
                <MediaHeading text="Biografía" />
              </div>

              <span>{biography || 'Sin biografía'}</span>
            </div>
          )}
        </div>

        {tablet && Watch()}

        <div className={styles.extras}>
          {!tablet && Watch()}

          <MediaDetailLinks styles={styles} {...detail} />
        </div>

        {(sections || [])
          .filter(({ data }) => Boolean(data))
          .map(({ key, heading, data, to, props, Element }, index) => (
            <div key={key} className={`${styles.section} ${styles[`section-${index + 1}`]}`}>
              <div className={styles['section-heading']}>
                <MediaHeading text={heading} to={to} />
              </div>

              <Element to={to} {...data} {...props} styles={styles} />
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
