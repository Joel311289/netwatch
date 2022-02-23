import axios from 'axios';

import {
  creditDetailMapper,
  episodeDetailMapper,
  imageDetailMapper,
  videoDetailMapper
} from '@services/mappers';

const detailCredits = (guest_stars) => {
  return {
    cast: guest_stars.map(creditDetailMapper)
  };
};

const detailImages = ({ stills } = {}, still_path) => {
  return {
    stills: (stills || [])
      .filter(({ file_path }) => file_path !== still_path)
      .map((item) => imageDetailMapper(item, true))
  };
};

const detailVideos = ({ results }) => {
  return results.map(videoDetailMapper);
};

const params = {
  append_to_response: 'external_ids,videos,images'
};

export const getSeasonEpisodeSerie = (url) => {
  return axios.get(`${url}`, { params }).then((response) => {
    const { images, videos, guest_stars } = response;

    return {
      ...episodeDetailMapper(response),
      ...(guest_stars && {
        credits: {
          ...detailCredits(guest_stars)
        }
      }),
      ...(images && { images: detailImages(images, response.still_path) }),
      ...(videos && { videos: detailVideos(videos) })
    };
  });
};
