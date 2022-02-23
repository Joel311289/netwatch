import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import List from '@components/UI/List/List';
import ListItem from '@components/UI/List/List-item';
import MediaSliderImage from '@components/Media/MediaSlider/MediaSlider-image';

const MediaDetailImages = ({ images, type, to }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();

  const items = [{ key: 'images', label: 'Ver todas las imágenes' }];

  const sliderPerView = useMemo(() => {
    if (mobile) return type !== 'backdrop' ? 2 : 1;
    if (smallDesktop) return type !== 'backdrop' ? 3 : 2;
    return type !== 'backdrop' ? 4 : 2;
  }, [type, mobile, smallDesktop]);

  return (
    <>
      <MediaSliderImage
        lazy
        zoom
        items={images}
        type={type || 'backdrop'}
        height={type !== 'backdrop' ? 250 : 200}
        sliderPerView={sliderPerView}
      />

      {images.length > sliderPerView && (
        <div style={{ marginTop: 15 }}>
          <List divider>
            {items.map((item) => (
              <ListItem key={item.key} {...item} to={to} />
            ))}
          </List>
        </div>
      )}
    </>
  );
};

MediaDetailImages.defaultProps = {
  images: [],
  type: 'backdrop'
};

MediaDetailImages.propTypes = {
  styles: PropTypes.object,
  images: PropTypes.array,
  type: PropTypes.string,
  to: PropTypes.string
};

export default MediaDetailImages;
