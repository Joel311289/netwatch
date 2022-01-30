import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Slider from '@components/Layout/Slider/Slider';
import List from '@components/UI/List/List';
import ListItem from '@components/UI/List/List-item';
import MediaItemVideo from '@components/Media/MediaItem/MediaItem-video';

const MediaDetailVideos = ({ videos, to }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();

  const items = [{ key: 'videos', label: 'Ver todos los vídeos' }];

  const sliderPerView = useMemo(() => {
    if (mobile) return 1;
    if (smallDesktop) return 2;
    return 2;
  }, [mobile, smallDesktop]);

  return (
    <div className="fade-in">
      {videos && (
        <Slider sliderPerView={sliderPerView} lazy navigation>
          {videos.map((item, index) => (
            <React.Fragment key={index}>
              <MediaItemVideo lazy {...item} videoKey={item.key} />
            </React.Fragment>
          ))}
        </Slider>
      )}

      {videos.length > 5 && (
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

MediaDetailVideos.propTypes = {
  styles: PropTypes.object,
  videos: PropTypes.array,
  to: PropTypes.string
};

export default MediaDetailVideos;
