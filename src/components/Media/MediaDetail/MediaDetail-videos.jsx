import { useMemo, useState } from 'react';
import { BiPlay } from 'react-icons/bi';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Button from '@components/UI/Button/Button';
import Slider from '@components/Layout/Slider/Slider';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';
import MediaModal from '../MediaModal/MediaModal';

import { getImageVideoUrl } from '@services/helpers';

import { string } from '@utils/helpers/strings';

const MediaDetailVideos = ({ styles, videos }) => {
  const { mobile, smallDesktop } = useBreakpointViewport();
  const [videoWatch, setVideoWatch] = useState(null);

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
            <div key={index} className={styles.video} onClick={() => setVideoWatch(item)}>
              <Button secondary className={styles.play}>
                <BiPlay />
              </Button>

              <div className={styles['video-thumbnail']}>
                <MediaItemImage lazy={true} image={getImageVideoUrl(item)} ratio={0.55} />
              </div>
            </div>
          ))}
        </Slider>
      )}

      <MediaModal
        size="auto"
        mode="video"
        opened={Boolean(videoWatch)}
        videoId={string(videoWatch && videoWatch.key)}
        onClose={() => setVideoWatch(false)}
      />
    </div>
  );
};

MediaDetailVideos.propTypes = {
  styles: PropTypes.object,
  videos: PropTypes.array
};

export default MediaDetailVideos;
