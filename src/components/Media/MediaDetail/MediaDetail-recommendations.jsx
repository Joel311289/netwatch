import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Slider from '@components/Layout/Slider/Slider';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { routeMediaDetail } from '@services/helpers';

const MediaDetailRecommendations = ({ items }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();

  const sliderPerView = () => {
    if (mobile) return 2;
    if (smallDesktop) return 4;
    return 4;
  };

  return (
    <div className="fade-in">
      {items && (
        <Slider navigation={true} lazy={true} offset={1} sliderPerView={sliderPerView()}>
          {items.map((item, index) => (
            <MediaItem key={index} lazy={true} to={routeMediaDetail(item)} ratio={1.5} {...item} />
          ))}
        </Slider>
      )}
    </div>
  );
};

MediaDetailRecommendations.propTypes = {
  styles: PropTypes.object,
  items: PropTypes.array
};

export default MediaDetailRecommendations;
