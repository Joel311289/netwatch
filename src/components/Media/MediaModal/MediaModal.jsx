import { useBreakpointStyles } from '@hooks/useBreakpointStyles';

import PropTypes from 'prop-types';

import Modal from '@components/UI/Modal/Modal';
import MediaModalDetail from '@components/Media/MediaModal/MediaModal-detail';
import MediaModalVideo from '@components/Media/MediaModal/MediaModal-video';

import desktopStyles from '@components/Media/MediaModal/MediaModal.module.css';
import mobileStyles from '@components/Media/MediaModal/MediaModal-mobile.module.css';

const MediaModal = ({ id, type, mode, onClose }) => {
  const styles = useBreakpointStyles({ desktopStyles, mobileStyles });

  return (
    <Modal size="m" visible={Boolean(id)} onClose={onClose}>
      {mode === 'detail' && <MediaModalDetail styles={styles} id={id} type={type} />}
      {mode === 'trailer' && <MediaModalVideo styles={styles} id={id} type={type} />}
    </Modal>
  );
};

MediaModal.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  onClose: PropTypes.func
};

MediaModal.Detail = MediaModalDetail;
MediaModal.Video = MediaModalVideo;

export default MediaModal;
