import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from '../../UI/Slider/Slider';
import MediaItem from '../MediaItem/MediaItem';
import MediaItemExtended from '../MediaItem/MediaItem.extended';
import MediaItemSkeleton from '../MediaItem/MediaItem.skeleton';
import { useResize } from '../../../hooks/useResize';
import { getSizes, getWidth } from '../../../utils/helpers';
import styles from './MediaSlider.module.css';

const MediaSlider = ({ items, loading }) => {
  const [itemSelected, setItemSelected] = useState(null);
  const [elementSelected, setElementSelected] = useState(null);
  const [delayHandler, setDelayHandler] = useState(null)

  const sliderRef = useRef(null);
  const { left: sliderLeft } = useResize(sliderRef);

  const getItemSelectedLeft = () => elementSelected && sliderRef ? (getSizes(elementSelected).left || 0) - sliderLeft : 0;
  const setSelected = (item, element) => {
    setItemSelected(item);
    setElementSelected(element);
  };
  const onItemMouseEnter = (event, index) => {
    const element = event.currentTarget;
    onItemMouseLeave();
    setDelayHandler(setTimeout(() => {
      setSelected(items[index], element);
    }, 500));
  };
  const onItemMouseLeave = () => {
    setSelected(null, null);
    clearTimeout(delayHandler);
  };

  const MediaItemSelected = (item) => {
    return (
      itemSelected && 
      elementSelected && 
      item.id === itemSelected.id && (
      <div 
        key={item.id}
        className={styles['slider-item-selected']} 
        style={{ left: getItemSelectedLeft() }}>
        <MediaItemExtended 
          ratio={0.7} 
          width={getWidth(elementSelected)}
          {...item}
          image={item.backdrop}
          onMouseLeave={onItemMouseLeave}
        />
      </div>
    ));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider} ref={sliderRef} onMouseLeave={onItemMouseLeave}>
        <Slider onPrev={onItemMouseLeave} onNext={onItemMouseLeave}>
          {Array.isArray(items) && items.map((item, index) => (
            <MediaItem key={item.id} ratio={1.5} {...item} onMouseEnter={(e) => onItemMouseEnter(e, index)} />
          ))}
        </Slider>
        
        {Array.isArray(items) && items.map(MediaItemSelected)}

        {Array.isArray(loading) && (
          <Slider navigation={false}>
            {loading.map((_, index) => (
              <MediaItemSkeleton key={index} ratio={1.5}></MediaItemSkeleton>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

MediaSlider.defaultProps = {
  items: [],
  loading: [],
};

MediaSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.any)]),
};

export default MediaSlider;
