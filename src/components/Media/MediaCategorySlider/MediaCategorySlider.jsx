import PropTypes from 'prop-types';
import Slider from '../../UI/Slider/Slider';
import MediaItem from '../MediaItem/MediaItem';
import MediaItemSkeleton from '../MediaItem/MediaItem.skeleton';
import MediaHeading from '../MediaHeading/MediaHeading';
import styles from './MediaCategorySlider.module.css';
import classNames from 'classnames/bind';

const MediaCategorySlider = ({ heading, type, items, loading }) => {
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
          <MediaItem key={item.id} to={`/${type}/${item.id}`} ratio={1.5} {...item}></MediaItem>
        ))}
      </Slider>

      {Array.isArray(loading) && <Slider>
        {loading.map((index) => (
          <MediaItemSkeleton key={index} ratio={1.5}></MediaItemSkeleton>
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
