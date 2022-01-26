import axios from 'axios';

import { externalsIdsDetailMapper, imageDetailMapper, mediaDetailMapper } from '@services/mappers';

const detailImages = ({ profiles }) => {
  return {
    profiles: profiles.map((item) => imageDetailMapper(item, true))
  };
};

export const getDetailPerson = (url, { append_to_response } = {}) => {
  try {
    const params = {
      ...(append_to_response && { append_to_response: append_to_response.join(',') })
    };

    return axios.get(`${url}`, { params }).then((response) => {
      const { external_ids, images, movie_credits, tv_credits, ...detail } = response;

      return {
        ...mediaDetailMapper(detail),
        ...(external_ids && { external_ids: externalsIdsDetailMapper(external_ids, true) }),
        ...(images && { ...detailImages(images, detail) })
      };
    });
  } catch (error) {
    console.error(error);
  }
};
