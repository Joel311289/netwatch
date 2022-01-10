import PropTypes from 'prop-types';

import MediaItem from '@components/Media/MediaItem/MediaItem';

const MediaModalImage = ({ styles, image, ratio, width }) => {
  return (
    <div className={`media-modal-image ${styles.image}`} style={{ width }} role="img">
      <MediaItem.Image image={image} ratio={ratio} />
    </div>
  );
};

MediaModalImage.propTypes = {
  image: PropTypes.string.isRequired,
  ratio: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  styles: PropTypes.object
};

export default MediaModalImage;
