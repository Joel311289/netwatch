import { useMemo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { useFetch } from '@hooks/useFetch';

import YoutubeEmbed from '@components/Layout/YoutubeEmbed/YoutubeEmbed';

import { mediaTypes } from '@services/constants';
import { getVideoTrailerYoutubeId } from '@services/helpers';
import { getVideosMovie } from '@services/movies/get-videos-movie';
import { getVideosSerie } from '@services/series/get-videos-serie';

const fetcherVideo = (type) => (type === mediaTypes.MOVIE ? getVideosMovie : getVideosSerie);

const Video = styled.div`
  &:before {
    padding-top: ${({ ratio }) => (ratio ? `${100 * ratio}%` : '0')};
  }
`;

const MediaModalVideo = ({ styles, video, type, id, width, ratio }) => {
  const { data } = useFetch(!video ? `/api/${type}/${id}/videos` : null, fetcherVideo(type));

  const videoId = useMemo(() => video || getVideoTrailerYoutubeId(data), [video, data]);

  return (
    <Video ratio={ratio} className={`media-modal-video ${styles.video}`} style={{ width }}>
      <img src="/assets/images/loader.gif" />

      {videoId && <YoutubeEmbed embedId={videoId} />}
    </Video>
  );
};

MediaModalVideo.propTypes = {
  video: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  width: PropTypes.number,
  ratio: PropTypes.number,
  styles: PropTypes.object
};

export default MediaModalVideo;
