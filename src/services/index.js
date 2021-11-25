import objectPath from 'object-path';

const get = objectPath.get;
export const apiKey = import.meta.env.VITE_API_KEY;
export const apiUrl = import.meta.env.VITE_API_URL;
export const apiImagesUrl = import.meta.env.VITE_API_IMAGES_URL;

export const mediaDetailMapper = (media) => {
  if (!media) {
    return {};
  }

  return {
    id: get(media, 'id'),
    type: get(media, 'media_type'),
    title: get(media, 'title') || get(media, 'name'),
    original_title: get(media, 'original_name'),
    image: `${apiImagesUrl}/${get(media, 'poster_path')}`,
    backdrop: `${apiImagesUrl}/${get(media, 'backdrop_path')}`,
    video: get(media, 'video'),
    original_language: get(media, 'original_language'),
    origin_country: get(media, 'origin_country'),
    location: get(media, 'original_name'),
    date: get(media, 'release_date') || get(media, 'first_air_date'),
    description: get(media, 'overview'),
    popularity: get(media, 'popularity'),
    vote_count: get(media, 'vote_count'),
    vote_average: get(media, 'vote_average'),
    genre_ids: get(media, 'genre_ids'),
    adult: get(media, 'adult'),
  };
};
