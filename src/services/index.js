import objectPath from 'object-path';
import { formattedDate } from '../utils/helpers';

const get = objectPath.get;
export const apiKey = import.meta.env.VITE_API_KEY;
export const apiUrl = import.meta.env.VITE_API_URL;
export const apiImagesUrl = import.meta.env.VITE_API_IMAGES_URL;
export const apiMediaTypes = {
  ALL: 'all',
  MOVIE: 'movie',
  SERIE: 'tv',
  PERSONA: 'person',
};

const SERIE_NETWORK_IDS_SUPPORTED = [
  213, // Netflix
  3186, // HBO Max
  1024, // Amazon Prime Video
  2552, // Apple TV+
  2739, // Disney +
  3744, // Atresplayer Premium
  5081, // Movistar Play
  3980, // Mitele
];

export const getNetworksSupported = () => SERIE_NETWORK_IDS_SUPPORTED.join('|');

export const mediaDetailMapper = (media) => {
  if (!media) {
    return {};
  }

  return {
    id: get(media, 'id'),
    type: get(media, 'media_type'),
    title: get(media, 'title') || get(media, 'name'),
    original_title: get(media, 'original_name'),
    image: `${apiImagesUrl}${get(media, 'poster_path')}`,
    backdrop: `${apiImagesUrl}${get(media, 'backdrop_path')}`,
    video: get(media, 'video'),
    original_language: get(media, 'original_language'),
    origin_country: get(media, 'origin_country'),
    location: get(media, 'original_name'),
    date: formattedDate(get(media, 'release_date') || get(media, 'first_air_date')),
    description: get(media, 'overview'),
    popularity: get(media, 'popularity'),
    vote_count: get(media, 'vote_count'),
    vote_average: get(media, 'vote_average'),
    genre_ids: get(media, 'genre_ids'),
    adult: get(media, 'adult'),
  };
};
