import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaItem from '@components/Media/MediaItem/MediaItem';
import Slider from '@components/Layout/Slider/Slider';

const MediaDetailBackground = ({ styles, items }) => {
  const { tablet } = useBreakpointViewport();

  return (
    <div className={`${styles.background} fade-in`}>
      {items && (
        <Slider
          sliderPerView={1}
          lazy={true}
          effectFade={true}
          navigation={true}
          sliderClass={styles['slider-backgrounds']}
          paginationBulletsClass={styles['pagination-bullets-backgrounds']}
        >
          {items.map(({ image }) => (
            <MediaItem.Image
              key={image}
              lazy={true}
              image={image}
              height={tablet ? 250 : 450}
              zoom={true}
              type="backdrop"
            />
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
