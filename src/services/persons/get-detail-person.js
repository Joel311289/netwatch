import axios from 'axios';
import { get } from 'lodash';

import { externalsIdsDetailMapper, imageDetailMapper, mediaDetailMapper } from '@services/mappers';

import { removeDuplicatesCollectionBy, sortCollectionBy } from '@utils/helpers/collections';
import { truncateArray } from '@utils/helpers/arrays';

const detailImages = (images, tagged_images) => {
  const _images = Object.keys(images).reduce((prev, key) => [...prev, ...images[key]], []);
  const _taggedImages = get(tagged_images, 'results', []);

  const taggedImages = sortCollectionBy(_taggedImages, 'vote_average', true).map((item) =>
    imageDetailMapper(item, true)
  );
  const profiles = sortCollectionBy(_images, 'vote_average', true).map((item) =>
    imageDetailMapper(item)
  );
  return {
    combined: sortCollectionBy([...taggedImages, ...profiles], 'vote_average', true),
    tagged_images: taggedImages,
    profiles
  };
};

const detailCredits = ({ cast, crew }) => {
  const credits = [...cast, ...crew].map(mediaDetailMapper).filter(({ image }) => Boolean(image));
  return truncateArray(
    removeDuplicatesCollectionBy(sortCollectionBy(credits, 'popularity', true), 'id'),
    10
  );
};

export const getDetailPerson = (url, { append_to_response } = {}) => {
  try {
    const params = {
      ...(append_to_response && { append_to_response: append_to_response.join(',') })
    };

    return axios.get(`${url}`, { params }).then((response) => {
      const {
        external_ids,
        images,
        tagged_images,
        combined_credits,
        movie_credits,
        tv_credits,
        ...detail
      } = response;

      return {
        ...mediaDetailMapper(detail),
        ...(combined_credits && { combined_credits: detailCredits(combined_credits) }),
        ...(movie_credits && { movie_credits: detailCredits(movie_credits) }),
        ...(tv_credits && { tv_credits: detailCredits(tv_credits) }),
        ...(external_ids && { external_ids: externalsIdsDetailMapper(external_ids, true) }),
        ...(images && tagged_images && { images: detailImages(images, tagged_images) })
      };
    });
  } catch (error) {
    console.error(error);
  }
};
