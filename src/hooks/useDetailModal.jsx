import React, { useMemo, useState } from 'react';
import useSWR from 'swr';

import Modal from '@components/UI/Modal/Modal';
import MediaModalDetail from '@components/Media/MediaModalDetail/MediaModalDetail';

import { mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getDetailMovie } from '@services/movies/get-detail-movie';
import { getDetailSerie } from '@services/series/get-detail-serie';

import { sleep } from '@utils/helpers';

export const useDetailModal = () => {
  // const [loading, setLoading] = useState(false);
  // const [detail, setDetail] = useState({});
  const [id, setId] = useState(null);
  const [fetcher, setFetcher] = useState(null);
  const [path, setPath] = useState(null);
  const [opened, setOpened] = useState(false);
  const { data, error } = useSWR(() => (path ? path : null), fetcher);

  const onFetchDetail = async (mediaType, mediaId) => {
    setId(mediaId);
    setPath(`/api/${mediaType}/${mediaId}`);
    setFetcher(
      mediaType === mediaTypes.MOVIE
        ? getDetailMovie.bind(this, mediaId)
        : getDetailSerie.bind(this, mediaId)
    );

    // const detail = await fetchData();
    // setDetail(detail);
    // setLoading(false);
  };

  console.log(data, error);

  const onModalOpen = (mediaType, mediaId) => {
    setOpened(true);
    // setLoading(true);
    onFetchDetail(mediaType, mediaId);
  };
  const onModalClose = async () => {
    setOpened(false);
    // setLoading(false);

    await sleep(500);
    // setDetail(null);
  };

  const ModalDetail = useMemo(() => {
    return (
      <Modal size="m" onClose={onModalClose} visible={opened}>
        {JSON.stringify(data)}
        {/* <MediaModalDetail skeleton={loading} to={routeMediaDetail(detail)} {...detail} /> */}
      </Modal>
    );
    // }, [loading, detail, opened]);
  }, [opened]);

  return { onModalOpen, onModalClose, ModalDetail };
};
