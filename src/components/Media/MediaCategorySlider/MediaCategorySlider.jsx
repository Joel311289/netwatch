import PropTypes from 'prop-types';
import { useDetailModal } from '../../../hooks/useDetailModal';
import { showSkeleton } from '../../../utils/helpers';
import Slider from '../../UI/Slider/Slider';
import MediaHeading from '../MediaHeading/MediaHeading';
import MediaItem from '../MediaItem/MediaItem';
import MediaItemSkeleton from '../MediaItem/MediaItem.skeleton';

const MediaCategorySlider = ({ type, heading, items, loading }) => {
  const { onModalOpen, ModalDetail } = useDetailModal();

  if (showSkeleton(loading)) {
    return (
      <div>
        <div className="heading">
          <MediaHeading skeleton={loading} />
        </div>
        <Slider navigation={false}>
          {loading.map((_, index) => (
            <MediaItemSkeleton key={index} ratio={1.5} />
          ))}
        </Slider>
      </div>
    );
  }

  return (
    Array.isArray(items) && (
      <div>
        {Boolean(items.length) && (
          <div className="heading">
            <MediaHeading text={heading} to={type ? `/${type}` : ''} />
          </div>
        )}

        <Slider>
          {items.map((item) => (
            <MediaItem key={item.id} ratio={1.5} onDetail={() => onModalOpen(item)} {...item} />
          ))}
        </Slider>

        {ModalDetail}
      </div>
    )
  );
};

MediaCategorySlider.defaultProps = {
  type: '',
  heading: '',
  items: [],
  loading: false
};

MediaCategorySlider.propTypes = {
  type: PropTypes.string,
  heading: PropTypes.string.isRequired,
  items: PropTypes.array,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
};

export default MediaCategorySlider;
