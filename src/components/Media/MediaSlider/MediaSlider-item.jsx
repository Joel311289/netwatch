import Slider from '@components/Layout/Slider/Slider';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { routeMediaDetail } from '@services/helpers';

import { ElementPropTypes, MediaPropTypes } from '@utils/constants/proptypes';

import styles from '@components/Media/MediaSlider/MediaSlider-item.module.css';

const MediaSliderItem = ({ skeleton, items, sliderPerView, ratio, imageKey }) => {
  return (
    <Slider
      navigation={!skeleton}
      lazy={true}
      offset={1}
      sliderPerView={sliderPerView}
      navigationClass={styles.navigation}>
      {items.map(({ image, backdrop, ...item }, index) => (
        <MediaItem
          key={index}
          lazy={true}
          skeleton={skeleton}
          to={routeMediaDetail(item)}
          ratio={ratio || 1.5}
          {...item}
          image={imageKey === 'backdrop' ? backdrop : image}
        />
      ))}
    </Slider>
  );
};

MediaSliderItem.propTypes = {
  ...ElementPropTypes,
  ...MediaPropTypes
};

export default MediaSliderItem;
