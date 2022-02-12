import axios from 'axios';

import {
  episodeDetailMapper,
  imageDetailMapper,
  seasonDetailMapper,
  videoDetailMapper
} from '@services/mappers';

const detailImages = ({ backdrops, posters } = {}) => {
  return {
    backdrops: (backdrops || []).map((item) => imageDetailMapper(item, true)),
    posters: (posters || []).map((item) => imageDetailMapper(item))
  };
};

const detailVideos = ({ results }) => {
  return results.map(videoDetailMapper);
};

const params = {
  include_image_language: 'es,null',
  include_video_language: 'es,null',
  append_to_response: 'videos,images'
};

export const getSeasonSerie = (url) => {
  try {
    return axios.get(`${url}`, { params }).then((response) => {
      const { images, videos, episodes } = response;

      return {
        ...seasonDetailMapper(response),
        ...(images && { images: detailImages(images) }),
        ...(videos && { videos: detailVideos(videos) }),
        episodes: episodes.map(episodeDetailMapper)
      };
    });
  } catch (error) {
    console.error(error);
  }
};
