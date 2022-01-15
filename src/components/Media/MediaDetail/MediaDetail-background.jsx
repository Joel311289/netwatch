import PropTypes from 'prop-types';

import Slider from '@components/Layout/Slider/Slider';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

const MediaDetailBackground = ({ items, type, height, sliderPerView, zoom }) => {
  return (
    <div className="fade-in">
      {items && (
        <Slider sliderPerView={sliderPerView} lazy={true} effectFade={true} navigation={true}>
          {items.map(({ image }) => (
            <MediaItemImage
              key={image}
              lazy={true}
              image={image}
              height={height}
              zoom={zoom}
              type={type}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

MediaDetailBackground.defaultProps = {
  sliderPerView: 1,
  zoom: true
};

MediaDetailBackground.propTypes = {
  items: PropTypes.array,
  height: PropTypes.number,
  ratio: PropTypes.number,
  sliderPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  zoom: PropTypes.bool,
  type: PropTypes.oneOf(['backdrop', 'poster', ''])
};

export default MediaDetailBackground;
