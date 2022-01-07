import { useMemo } from 'react';
import PropTypes from 'prop-types';

import Space from '@components/Layout/Space/Space';
import YoutubeEmbed from '@components/Layout/YoutubeEmbed/YoutubeEmbed';

import { mediaTypes } from '@services/constants';

import { useFetch } from '@hooks/useFetch';

import { getVideoTrailerYoutubeId } from '@services/helpers';
import { getVideosMovie, pathVideosMovie } from '@services/movies/get-videos-movie';
import { getVideosSerie, pathVideosSerie } from '@services/series/get-videos-serie';

const fetcherVideo = (type) => (type === mediaTypes.MOVIE ? getVideosMovie : getVideosSerie);
const pathService = (type, id) =>
  type === mediaTypes.MOVIE ? pathVideosMovie(id) : pathVideosSerie(id);

const MediaModalVideo = ({ styles, type, id }) => {
  const { data, loading } = useFetch(pathService(type, id), fetcherVideo(type));

  const videoId = useMemo(() => getVideoTrailerYoutubeId(data), [data]);

  return (
    <Space className={`media-modal-video ${styles.video}`} align="center" justify="center">
      {loading && <img src="/assets/images/loader.gif" />}

      {!loading && videoId && <YoutubeEmbed embedId={videoId} />}
    </Space>
  );
};

MediaModalVideo.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  styles: PropTypes.object
};

export default MediaModalVideo;