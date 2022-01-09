import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaItem from '@components/Media/MediaItem/MediaItem';
import Slider from '@components/Layout/Slider/Slider';

const MediaDetailBackground = ({ styles, items }) => {
  const { tablet } = useBreakpointViewport();

  return (
    <div className={styles.background}>
      {items && (
        <Slider
          sliderPerRow={1}
          lazy={true}
          effectFade={true}
          pagination={!tablet}
          navigation={tablet}
          sliderClass={styles['slider-backgrounds']}
          paginationBulletsClass={styles['pagination-bullets-backgrounds']}>
          {items.map(({ image }) => (
            <MediaItem.Image key={image} image={image} ratio={tablet ? 0.7 : 0.4} />
          ))}
        </Slider>
      )}
    </div>
  );
};

MediaDetailBackground.propTypes = {
  styles: PropTypes.object,
  items: PropTypes.array
};

export default MediaDetailBackground;
