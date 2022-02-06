import { useRouteMatch } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';

import { mediaTypeByRoute } from '@services/helpers';

import { compactArray } from '@utils/helpers/arrays';

export const useMediaPath = (pathRegexp) => {
  const { url, params } = useRouteMatch();

  const matches = pathToRegexp(pathRegexp).exec(url);
  // eslint-disable-next-line no-unused-vars
  const [_, mediaType, key, section, keySection] = compactArray(matches);

  return {
    mediaType: mediaTypeByRoute(mediaType),
    id: key ? key.split('-')[0] : '',
    section: !keySection ? section : `${section}/detail`,
    sectionId: keySection,
    params
  };
};
