import PropTypes from 'prop-types';

import { useBreakpointStyles } from '@hooks/useBreakpointStyles';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaSliderItem from '@components/Media/MediaSlider/MediaSlider-item';

import mobileStyles from '@components/Media/MediaSeasons/MediaSeasons-mobile.module.css';
import desktopStyles from '@components/Media/MediaSeasons/MediaSeasons.module.css';

const MediaSeasons = ({ seasons }) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });
  const { mobile, smallDesktop } = useBreakpointViewport();

  const sliderPerView = () => {
    if (mobile) return 2;
    if (smallDesktop) return 4;
    return 4;
  };

  return (
    <div className={`media-seasons-wrapper ${styles.wrapper}`}>
      <MediaSliderItem items={seasons} sliderPerView={sliderPerView()} />
    </div>
  );
};

MediaSeasons.propTypes = {
  to: PropTypes.string.isRequired,
  seasons: PropTypes.array
};

export default MediaSeasons;
