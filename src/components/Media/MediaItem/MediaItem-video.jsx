import { useState } from 'react';
import { BiPlay } from 'react-icons/bi';
import PropTypes from 'prop-types';

import Button from '@components/UI/Button/Button';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

import { getImageVideoUrl } from '@services/helpers';

import { string } from '@utils/helpers/strings';

import styles from '@components/Media/MediaItem/MediaItem.module.css';

const MediaItemVideo = ({ site, videoKey, lazy }) => {
  const [videoWatch, setVideoWatch] = useState(null);

  return (
    <>
      <div className={styles.video} onClick={() => setVideoWatch(true)}>
        <Button secondary className={styles.play}>
          <BiPlay />
        </Button>

        <div className={styles['video-thumbnail']}>
          <MediaItemImage
            lazy={lazy}
            image={getImageVideoUrl({ site, key: videoKey })}
            ratio={0.55}
          />
        </div>
      </div>

      <MediaModal
        size="auto"
        mode="video"
        opened={videoWatch}
        videoId={string(videoKey)}
        onClose={() => setVideoWatch(false)}
      />
    </>
  );
};

MediaItemVideo.propTypes = {
  site: PropTypes.string,
  videoKey: PropTypes.string.isRequired,
  lazy: PropTypes.bool
};

export default MediaItemVideo;
