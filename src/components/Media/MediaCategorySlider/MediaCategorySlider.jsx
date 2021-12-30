import { useDetailModal } from '../../../hooks/useDetailModal';
import Slider from '../../UI/Slider/Slider';
import MediaHeading from '../MediaHeading/MediaHeading';
import MediaItem from '../MediaItem/MediaItem';
import MediaItemSkeleton from '../MediaItem/MediaItem.skeleton';
import { routeMediaDetail } from '../../../services';
import { showSkeleton } from '../../../utils/helpers';
import { ElementDefaultProps, ElementPropTypes } from '../../../utils/constants';

const MediaCategorySlider = ({ type, heading, items, skeleton }) => {
  const { onModalOpen, ModalDetail } = useDetailModal();

  if (showSkeleton(skeleton)) {
    return (
      <div>
        <div className="heading">
          <MediaHeading skeleton={skeleton} />
        </div>
        <Slider navigation={false}>
          {skeleton.map((_, index) => (
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
            <MediaItem
              key={item.id}
              to={routeMediaDetail(item)}
              ratio={1.5}
              onDetail={() => onModalOpen(item)}
              {...item}
            />
          ))}
        </Slider>

        {ModalDetail}
      </div>
    )
  );
};

MediaCategorySlider.defaultProps = ElementDefaultProps;
MediaCategorySlider.propTypes = ElementPropTypes;

export default MediaCategorySlider;
