import objectPath from 'object-path';

import {
  routeMediaTypes,
  personRoleTypes,
  tvWatchProvidersSupported,
  videoSites,
  videoTypes
} from '@services/constants';

import { removeSpecialCharactersText } from '@utils/helpers/strings';
import { compactArray, isEmptyArray } from '@utils/helpers/arrays';

export const isMediaMovie = (media) => Object.prototype.hasOwnProperty.call(media, 'release_date');
export const isMediaSerie = (media) =>
  Object.prototype.hasOwnProperty.call(media, 'first_air_date');

export const getImageMediaUrl = (baseUrl, path) => (path ? `${baseUrl}${path}` : '');

export const getPersonRoleType = ({ character, department }) =>
  character ? personRoleTypes.Acting : personRoleTypes[department];

export const getWatchProvidersSupported = () => Object.keys(tvWatchProvidersSupported).join('|');

export const getVideoUrl = ({ site, key }) =>
  site === videoSites.youtube ? `https://www.youtube.com/watch?v=${key}` : '';
export const getVideoTrailerYoutubeId = (videos) => {
  if (!videos || isEmptyArray(videos)) {
    return '';
  }
  const trailers = videos.filter(
    (video) => video.type === videoTypes.trailer && video.site === videoSites.youtube
  );
  return objectPath.get(
    compactArray([
      ...[trailers.find(({ language }) => language === 'es')],
      ...[trailers.find(({ language }) => language === 'en')],
      ...[videos[0]]
    ])[0],
    'key'
  );
};

export const routeMediaDetail = (media) => {
  if (!media) {
    return '/';
  }
  const { id, type, original_title = '' } = media;
  const title = removeSpecialCharactersText(original_title, '-');
  const pathType = routeMediaTypes[type];
  return (title ? `/${pathType}/${id}-${title}` : `/${pathType}/${id}`).toLowerCase();
};
