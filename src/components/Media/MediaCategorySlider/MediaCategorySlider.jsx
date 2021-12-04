import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Slider from '../../UI/Slider/Slider';
import MediaItem from '../MediaItem/MediaItem';
import MediaItemSkeleton from '../MediaItem/MediaItem.skeleton';
import MediaHeading from '../MediaHeading/MediaHeading';
import styles from './MediaCategorySlider.module.css';

const MediaCategorySlider = ({ heading, type, items, loading }) => {
  const itemSize = 170;
  const classes = classNames.bind(styles)({
    'skeleton': Boolean(loading),
  });

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.heading} ${classes}`}>
        <MediaHeading text={heading} to={type ? `/${type}` : ''}></MediaHeading>
      </div>
      
      <Slider>
        {Array.isArray(items) && items.map((item) => (
          <MediaItem key={item.id} to={`/${type}/${item.id}`} size={itemSize} ratio={1.5} {...item}></MediaItem>
        ))}
      </Slider>

      {Array.isArray(loading) && <Slider navigation={false}>
        {loading.map((index) => (
          <MediaItemSkeleton key={index} size={itemSize} ratio={1.5}></MediaItemSkeleton>
        ))}
      </Slider>}
    </div>
  )
}

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

export default MediaCategorySlider
