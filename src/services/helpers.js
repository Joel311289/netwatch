import objectPath from 'object-path';

import {
  mediaTypes,
  personRoleTypes,
  tvWatchProvidersSupported,
  videoSites,
  videoTypes
} from '@services/constants';

import { removeSpecialCharactersText } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

export const isMediaMovie = (media) => Object.prototype.hasOwnProperty.call(media, 'release_date');
export const isMediaSerie = (media) =>
  Object.prototype.hasOwnProperty.call(media, 'first_air_date');

export const getMediaType = ({ type }) => (type ? mediaTypes[type] : '');

export const getImageMediaUrl = (baseUrl, path) => (path ? `${baseUrl}${path}` : '');

export const getPersonRoleType = ({ character, department }) =>
  character ? personRoleTypes.Acting : personRoleTypes[department];

export const getWatchProvidersSupported = () => Object.keys(tvWatchProvidersSupported).join('|');

export const getVideoUrl = ({ site, key }) =>
  site === videoSites.youtube ? `https://www.youtube.com/watch?v=${key}` : '';
export const getVideoTrailerYoutubeId = (videos) => {
  if (isEmptyArray(videos)) {
    return '';
  }
  return objectPath.get(
    videos.find((video) => video.type === videoTypes.trailer) || videos[0],
    'key'
  );
};

export const routeMediaDetail = (media) => {
  if (!media) {
    return '';
  }
  const { id, type, original_title = '' } = media;
  const title = removeSpecialCharactersText(original_title, '-');
  return (title ? `/${type}/${id}-${title}` : `/${type}/${id}`).toLowerCase();
};
