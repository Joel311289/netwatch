import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaSliderImage from '@components/Media/MediaSlider/MediaSlider-image';

const MediaDetailImages = ({ images }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();

  const sliderPerView = useMemo(() => {
    if (mobile) return 1;
    if (smallDesktop) return 2;
    return 2;
  }, [mobile, smallDesktop]);

  return (
    <MediaSliderImage
      lazy
      zoom
      items={images}
      type="backdrop"
      height={200}
      sliderPerView={sliderPerView}
    />
  );
};

MediaDetailImages.propTypes = {
  styles: PropTypes.object,
  images: PropTypes.array
};

export default MediaDetailImages;
