import { useBreakpointStyles } from '@hooks/useBreakpointStyles';

import PropTypes from 'prop-types';

import Modal from '@components/UI/Modal/Modal';
import MediaModalDetail from '@components/Media/MediaModal/MediaModal-detail';
import MediaModalVideo from '@components/Media/MediaModal/MediaModal-video';
import MediaModalImage from '@components/Media/MediaModal/MediaModal-image';
import MediaAutocomplete from '@components/Media/MediaAutocomplete/MediaAutocomplete';

import desktopStyles from '@components/Media/MediaModal/MediaModal.module.css';
import mobileStyles from '@components/Media/MediaModal/MediaModal-mobile.module.css';

const MediaModal = ({ id, opened, size, type, mode, onClose, image, videoId, ...restProps }) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });

  return (
    <Modal
      size={size || 'auto'}
      visible={opened || Boolean(id || image)}
      onClose={onClose}
      position={mode === 'search' ? 'top' : 'center'}>
      {mode === 'detail' && <MediaModalDetail styles={styles} id={id} type={type} />}
      {mode === 'video' && (
        <MediaModalVideo
          styles={styles}
          id={id}
          type={type}
          video={videoId}
          width={850}
          ratio={0.55}
          {...restProps}
        />
      )}
      {mode === 'image' && <MediaModalImage styles={styles} image={image} {...restProps} />}
      {mode === 'search' && <MediaAutocomplete onClose={onClose} />}
    </Modal>
  );
};

MediaModal.propTypes = {
  opened: PropTypes.bool,
  size: PropTypes.string,
  mode: PropTypes.string.isRequired,
  id: PropTypes.number,
  type: PropTypes.string,
  image: PropTypes.string,
  videoId: PropTypes.string,
  onClose: PropTypes.func
};

export default MediaModal;
