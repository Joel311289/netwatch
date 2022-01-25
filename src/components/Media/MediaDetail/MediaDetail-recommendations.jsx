import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaSliderItem from '@components/Media/MediaSlider/MediaSlider-item';

const MediaDetailRecommendations = ({ recommendations }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();

  const sliderPerView = () => {
    if (mobile) return 2;
    if (smallDesktop) return 4;
    return 4;
  };

  return (
    <div className="fade-in">
      <MediaSliderItem items={recommendations} sliderPerView={sliderPerView()} />
    </div>
  );
};

MediaDetailRecommendations.propTypes = {
  styles: PropTypes.object,
  recommendations: PropTypes.array
};

export default MediaDetailRecommendations;
