import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Slider from '../../UI/Slider/Slider';
import MediaItem from '../MediaItem/MediaItem';
import MediaItemExtended from '../MediaItem/MediaItem.extended';
import MediaItemSkeleton from '../MediaItem/MediaItem.skeleton';
import MediaHeading from '../MediaHeading/MediaHeading';
import { useResize } from '../../../hooks/useResize';
import { getSizes, getWidth } from '../../../utils/helpers';
import styles from './MediaCategorySlider.module.css';

const MediaCategorySlider = ({ heading, type, items, loading }) => {
  const [itemSelected, setItemSelected] = useState(null);
  const [elementSelected, setElementSelected] = useState(null);
  const sliderRef = useRef(null);
  const { left: sliderLeft } = useResize(sliderRef);

  const classes = classNames.bind(styles)({
    skeleton: Boolean(loading),
  });

  const getItemSelectedLeft = () => elementSelected && sliderRef ? (getSizes(elementSelected).left || 0) - sliderLeft : 0;
  const setSelected = (item, element) => {
    setItemSelected(item);
    setElementSelected(element);
  };
  const onItemMouseEnter = (event, index) => setSelected(items[index], event.currentTarget);
  const onItemMouseLeave = () => setSelected(null, null);

  const MediaItemSelected = (item) => {
    return itemSelected && item.id === itemSelected.id && (
      <div 
        key={item.id}
        className={styles['slider-item-selected']} 
        style={{ left: getItemSelectedLeft() }}>
        <MediaItemExtended 
          ratio={0.8} 
          width={getWidth(elementSelected)}
          {...item}
          image={item.backdrop}
          onMouseLeave={onItemMouseLeave}
        />
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.heading} ${classes}`}>
        <MediaHeading text={heading} to={type ? `/${type}` : ''}></MediaHeading>
      </div>
      <div className={styles.slider} ref={sliderRef} onMouseLeave={onItemMouseLeave}>
        <Slider>
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

MediaCategorySlider.defaultProps = {
  heading: '',
  type: '',
  items: [],
  loading: [],
};

MediaCategorySlider.propTypes = {
  heading: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // items: PropTypes.arrayOf(PropTypes.objectOf()),
  // loading: PropTypes.arrayOf(PropTypes.objectOf({})),
};

export default MediaCategorySlider;
