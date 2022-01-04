import Slider from '@components/UI/Slider/Slider';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaItemSkeleton from '@components/Media/MediaItem/MediaItem-skeleton';

import { ElementDefaultProps, ElementPropTypes } from '@utils/constants';

const MediaCategorySliderSkeleton = ({ skeleton }) => {
  return (
    <>
      <div className="heading">
        <MediaHeading skeleton={skeleton} />
      </div>

      <Slider navigation={false}>
        {skeleton.map((_, index) => (
          <MediaItemSkeleton key={index} ratio={1.5} />
        ))}
      </Slider>
    </>
  );
};

MediaCategorySliderSkeleton.defaultProps = ElementDefaultProps;
MediaCategorySliderSkeleton.propTypes = ElementPropTypes;

export default MediaCategorySliderSkeleton;
