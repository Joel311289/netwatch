import { useRouteMatch } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';

import { mediaTypeByRoute } from '@services/helpers';

export const useMediaPath = (pathRegexp) => {
  const { url, params } = useRouteMatch();

  // eslint-disable-next-line no-unused-vars
  const [_, mediaType, key, section] = pathToRegexp(pathRegexp).exec(url);

  return {
    mediaType: mediaTypeByRoute(mediaType),
    id: key ? key.split('-')[0] : '',
    section,
    params
  };
};
