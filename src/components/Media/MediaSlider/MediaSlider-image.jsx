import PropTypes from 'prop-types';

import Slider from '@components/Layout/Slider/Slider';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

const MediaSliderImage = ({ items, sliderPerView, effectFade }) => {
  return (
    <div className="fade-in">
      {items && (
        <Slider sliderPerView={sliderPerView} lazy effectFade={effectFade} navigation>
          {items.map(({ image, ratio }) => (
            <MediaItemImage key={image} lazy zoom image={image} ratio={ratio} />
          ))}
        </Slider>
      )}
    </div>
  );
};

MediaSliderImage.defaultProps = {
  sliderPerView: 1
};

MediaSliderImage.propTypes = {
  items: PropTypes.array,
  effectFade: PropTypes.bool,
  sliderPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['backdrop', 'poster', 'profile', ''])
};

export default MediaSliderImage;
