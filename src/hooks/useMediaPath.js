import { useLocation, useParams } from 'react-router-dom';

import { mediaTypeByRoute } from '@services/helpers';

import { getFirstPath, getIdFromParams, getLastPath } from '@utils/helpers/strings';

export const useMediaPath = () => {
  const id = getIdFromParams(useParams(), 'key');
  const { pathname } = useLocation();

  const mediaType = mediaTypeByRoute(getFirstPath(pathname));
  const section = getLastPath(pathname);

  return { mediaType, id, section };
};
