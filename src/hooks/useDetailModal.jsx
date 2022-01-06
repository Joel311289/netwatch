import React, { useMemo, useState } from 'react';

import Modal from '@components/UI/Modal/Modal';
import MediaModalDetail from '@components/Media/MediaModalDetail/MediaModalDetail';

import { mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getDetailMovie } from '@services/movies/get-detail-movie';
import { getDetailSerie } from '@services/series/get-detail-serie';

import { sleep } from '@utils/helpers';

export const useDetailModal = () => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});
  const [opened, setOpened] = useState(false);

  const onFetchDetail = async (mediaType, mediaId) => {
    const fetchData =
      mediaType === mediaTypes.movie
        ? getDetailMovie.bind(this, mediaId)
        : getDetailSerie.bind(this, mediaId);

    const detail = await fetchData();
    setDetail(detail);
    setLoading(false);
  };

  const onModalOpen = (mediaType, mediaId) => {
    setOpened(true);
    setLoading(true);
    onFetchDetail(mediaType, mediaId);
  };
  const onModalClose = async () => {
    setOpened(false);
    setLoading(false);

    await sleep(500);
    setDetail(null);
  };

  const ModalDetail = useMemo(() => {
    return (
      <Modal size="m" onClose={onModalClose} visible={opened}>
        <MediaModalDetail skeleton={loading} to={routeMediaDetail(detail)} {...detail} />
      </Modal>
    );
  }, [loading, detail, opened]);

  return { onModalOpen, onModalClose, ModalDetail };
};
