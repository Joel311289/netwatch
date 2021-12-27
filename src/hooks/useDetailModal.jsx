import React, { useMemo, useState } from 'react';
import MediaModalDetail from '../components/Media/MediaModalDetail/MediaModalDetail';
import Modal from '../components/UI/Modal/Modal';

export const useDetailModal = () => {
  const [item, setItem] = useState({});
  const [opened, setOpened] = useState(false);

  const onModalOpen = (item) => {
    setItem(item);
    setOpened(true);
  };
  const onModalClose = () => {
    setOpened(false);
    setTimeout(() => {
      setItem(null);
    }, 500);
  };

  const ModalDetail = useMemo(() => {
    return (
      <Modal size="s" onClose={onModalClose} visible={opened}>
        <MediaModalDetail {...item} />
      </Modal>
    );
  }, [item, opened]);

  return { onModalOpen, onModalClose, ModalDetail };
};
