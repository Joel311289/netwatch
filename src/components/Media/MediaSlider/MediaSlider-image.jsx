import PropTypes from 'prop-types';

import Slider from '@components/Layout/Slider/Slider';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

const MediaSliderImage = ({ items, type, height, sliderPerView, effectFade, zoom }) => {
  return (
    <div className="fade-in">
      {items && (
        <Slider sliderPerView={sliderPerView} lazy={true} effectFade={effectFade} navigation={true}>
          {items.map(({ image }) => (
            <MediaItemImage
              key={image}
              lazy
              zoom={zoom}
              image={image}
              height={height}
              type={type}
            />
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
  height: PropTypes.number,
  ratio: PropTypes.number,
  effectFade: PropTypes.bool,
  sliderPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  zoom: PropTypes.bool,
  type: PropTypes.oneOf(['backdrop', 'poster', ''])
};

export default MediaSliderImage;
