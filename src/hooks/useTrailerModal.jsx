import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';

import Modal from '@components/UI/Modal/Modal';
import Space from '@components/Layout/Space/Space';
import YoutubeEmbed from '@components/Layout/YoutubeEmbed/YoutubeEmbed';

import { mediaTypes } from '@services/constants';
import { getVideoTrailerYoutubeId } from '@services/helpers';
import { getVideosMovie } from '@services/movies/get-videos-movie';
import { getVideosSerie } from '@services/series/get-videos-serie';

import { sleep } from '@utils/helpers';
import { bps } from '@utils/constants';

const VideoTrailer = styled(Space)`
  background: #010001;
  height: 520px;

  ${bps.mobile} {
    height: 300px;
  }

  img {
    height: 45px;
  }
`;

export const useTrailerModal = () => {
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [opened, setOpened] = useState(false);

  const onFetchTrailer = async (mediaType, mediaId) => {
    const fetchData =
      mediaType === mediaTypes.movie
        ? getVideosMovie.bind(this, mediaId)
        : getVideosSerie.bind(this, mediaId);

    const videos = await fetchData();
    setVideoId(getVideoTrailerYoutubeId(videos));
    setLoading(false);
  };

  const onModalOpen = (mediaType, mediaId) => {
    setOpened(true);
    setLoading(true);
    onFetchTrailer(mediaType, mediaId);
  };
  const onModalClose = async () => {
    setOpened(false);
    setLoading(false);

    await sleep(500);
    setVideoId(null);
  };

  const ModalTrailer = useMemo(() => {
    return (
      <Modal size="l" onClose={onModalClose} visible={opened}>
        <VideoTrailer align="center" justify="center">
          {loading && <img src="/assets/images/loader.gif" />}

          {!loading && videoId && <YoutubeEmbed embedId={videoId} />}
        </VideoTrailer>
      </Modal>
    );
  }, [loading, videoId, opened]);

  return { onModalOpen, onModalClose, ModalTrailer };
};
