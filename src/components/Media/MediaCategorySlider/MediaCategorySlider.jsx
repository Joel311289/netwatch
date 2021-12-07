import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import classNames from 'classnames/bind';
import Slider from '../../UI/Slider/Slider';
import MediaItem from '../MediaItem/MediaItem';
import MediaItemExtended from '../MediaItem/MediaItem.extended';
import MediaItemSkeleton from '../MediaItem/MediaItem.skeleton';
import MediaHeading from '../MediaHeading/MediaHeading';
import { getEmptyArray } from '../../../utils/helpers';
import styles from './MediaCategorySlider.module.css';

const MediaCategorySlider = ({ heading, type, items, loading }) => {
  const itemWidth = 190;
  const [itemSelected, setItemSelected] = useState(null);
  const [anchorElements, setAnchorElements] = useState([]);
  const classes = classNames.bind(styles)({
    skeleton: Boolean(loading),
  });

  useEffect(() => {
    setAnchorElements(getEmptyArray(items.length));
  }, [items]);

  useEffect(() => {
    if (itemSelected) {
      const { element, position } = itemSelected;
      setAnchorElements((prev) => [...prev.map((_, index) => (index === position ? element : null))]);
    }
  }, [itemSelected]);

  const onMouseEnterItem = (event, position) => setItemSelected({ ...{ element: event.currentTarget, position } });
  const onMouseLeaveItem = () => setAnchorElements(getEmptyArray(items.length));

  const SliderItem = (item, index) => (
    <div key={item.id} className={styles['slider-item']}>
      <MediaItem width={itemWidth} ratio={1.5} onMouseEnter={(e) => onMouseEnterItem(e, index)} {...item} />
      <Menu
        sx={{
          pointerEvents: 'none',
        }}
        open={Boolean(anchorElements[index])}
        anchorEl={anchorElements[index]}
        onClose={onMouseLeaveItem}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Fade}
        disableRestoreFocus
        hideBackdrop>
        <MediaItemExtended width={itemWidth * 1.2} ratio={0.7} onMouseLeave={onMouseLeaveItem} {...item} image={item.backdrop} />
      </Menu>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.heading} ${classes}`}>
        <MediaHeading text={heading} to={type ? `/${type}` : ''}></MediaHeading>
      </div>
      <div className={styles.slider} onMouseLeave={onMouseLeaveItem}>
        <Slider>
          {Array.isArray(items) && items.map((item, index) => SliderItem(item, index))}
        </Slider>

        {Array.isArray(loading) && (
          <Slider navigation={false}>
            {loading.map((index) => (
              <MediaItemSkeleton key={index} width={itemWidth} ratio={1.5}></MediaItemSkeleton>
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
