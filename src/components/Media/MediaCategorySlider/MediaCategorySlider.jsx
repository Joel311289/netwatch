import { useDetailModal } from '@hooks/useDetailModal';

import Slider from '@components/UI/Slider/Slider';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { routeMediaDetail } from '@services/index';

import { showSkeleton } from '@utils/helpers';
import { ElementDefaultProps, ElementPropTypes } from '@utils/constants';

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
            <MediaItem.Skeleton key={index} ratio={1.5} />
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
