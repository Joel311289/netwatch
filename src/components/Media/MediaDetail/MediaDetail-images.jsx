import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaSliderImage from '@components/Media/MediaSlider/MediaSlider-image';

const MediaDetailImages = ({ images, type }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();

  const sliderPerView = useMemo(() => {
    if (mobile) return type !== 'backdrop' ? 2 : 1;
    if (smallDesktop) return type !== 'backdrop' ? 4 : 2;
    return type !== 'backdrop' ? 4 : 2;
  }, [type, mobile, smallDesktop]);

  return (
    <MediaSliderImage
      lazy
      zoom
      items={images}
      type={type || 'backdrop'}
      height={type !== 'backdrop' ? 250 : 200}
      sliderPerView={sliderPerView}
    />
  );
};

MediaDetailImages.defaultProps = {
  images: [],
  type: 'backdrop'
};

MediaDetailImages.propTypes = {
  styles: PropTypes.object,
  images: PropTypes.array,
  type: PropTypes.string
};

export default MediaDetailImages;
