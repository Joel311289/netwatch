import PropTypes from 'prop-types';

import MediaItemImage from '@components/Media/MediaItem/MediaItem-image';

const MediaModalImage = ({ styles, image, ratio, width }) => {
  console.log(ratio, width);
  return (
    <div className={`media-modal-image ${styles.image}`} style={{ width }} role="img">
      <MediaItemImage image={image} ratio={ratio} />
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
