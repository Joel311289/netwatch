import React, { useMemo, useState } from 'react';
import MediaModalDetail from '../components/Media/MediaModalDetail/MediaModalDetail';
import Modal from '../components/UI/Modal/Modal';
import { routeMediaDetail } from '../services';
import { sleep } from '../utils/helpers';

export const useDetailModal = () => {
  const [item, setItem] = useState({});
  const [opened, setOpened] = useState(false);

  const onModalOpen = (item) => {
    setItem(item);
    setOpened(true);
  };
  const onModalClose = async () => {
    setOpened(false);
    await sleep(500);
    setItem(null);
  };

  const ModalDetail = useMemo(() => {
    return (
      <Modal size="s" onClose={onModalClose} visible={opened}>
        <MediaModalDetail to={routeMediaDetail(item)} {...item} />
      </Modal>
    );
  }, [item, opened]);

  return { onModalOpen, onModalClose, ModalDetail };
};
