import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaSliderItem from '@components/Media/MediaSlider/MediaSlider-item';

const MediaDetailRecommendations = ({ items }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();

  const sliderPerView = () => {
    if (mobile) return 2;
    if (smallDesktop) return 4;
    return 4;
  };

  return (
    <div className="fade-in">
      <MediaSliderItem items={items} sliderPerView={sliderPerView()} />
    </div>
  );
};

MediaDetailRecommendations.propTypes = {
  styles: PropTypes.object,
  items: PropTypes.array
};

export default MediaDetailRecommendations;
