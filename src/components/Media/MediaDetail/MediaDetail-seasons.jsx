import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import List from '@components/UI/List/List';
import ListItem from '@components/UI/List/List-item';
import MediaSliderItem from '@components/Media/MediaSlider/MediaSlider-item';

const MediaDetailSeasons = ({ seasons, to }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();

  const items = [{ key: 'seasons', label: 'Ver todos las temporadas' }];

  const sliderPerView = useMemo(() => {
    if (mobile) return 2;
    if (smallDesktop) return 4;
    return 4;
  }, [mobile, smallDesktop]);

  return (
    <div className={`media-seasons-wrapper`}>
      <MediaSliderItem items={seasons} sliderPerView={sliderPerView} />

      {seasons.length > sliderPerView && (
        <div style={{ marginTop: 15 }}>
          <List divider>
            {items.map((item) => (
              <ListItem key={item.key} {...item} to={to} />
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

MediaDetailSeasons.propTypes = {
  styles: PropTypes.object,
  seasons: PropTypes.array,
  to: PropTypes.string
};

export default MediaDetailSeasons;
