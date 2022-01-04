import React, { useMemo, useState } from 'react';

import Modal from '@components/UI/Modal/Modal';
import MediaModalDetail from '@components/Media/MediaModalDetail/MediaModalDetail';

import { routeMediaDetail } from '@services/helpers';

import { sleep } from '@utils/helpers';

export const useDetailModal = () => {
  const [detail, setDetail] = useState({});
  const [opened, setOpened] = useState(false);

  const onModalOpen = (detail) => {
    setDetail(detail);
    setOpened(true);
  };
  const onModalClose = async () => {
    setOpened(false);
    await sleep(500);
    setDetail(null);
  };

  const ModalDetail = useMemo(() => {
    return (
      <Modal size="m" onClose={onModalClose} visible={opened}>
        <MediaModalDetail to={routeMediaDetail(detail)} {...detail} />
      </Modal>
    );
  }, [detail, opened]);

  return { onModalOpen, onModalClose, ModalDetail };
};
