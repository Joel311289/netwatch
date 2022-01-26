import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import MediaDetail from '@components/Media/MediaDetail/MediaDetail';
import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaCredits from '@components/Media/MediaCredits/MediaCredits';
import MediaDetailGeneral from '@components/Media/MediaDetail/MediaDetail-general';
import MediaDetailRecommendations from '@components/Media/MediaDetail/MediaDetail-recommendations';
import MediaDetailVideos from '@components/Media/MediaDetail/MediaDetail-videos';
import MediaDetailImages from '@components/Media/MediaDetail/MediaDetail-images';

import { mediaTypes, routeMediaTypes } from '@services/constants';
import { getDetailPerson } from '@services/persons/get-detail-person';

import { getIdFromParams } from '@utils/helpers/strings';
import { isEmptyArray } from '@utils/helpers/arrays';

import styles from '@pages/Movies/MoviesPage.module.css';

const PersonsDetailPage = () => {
  const id = getIdFromParams(useParams(), 'key');
  const { data: person, loading } = useFetch(
    [
      `/api/${mediaTypes.PERSON}/${id}`,
      {
        append_to_response: ['external_ids', 'images', 'movie_credits', 'tv_credits']
      }
    ],
    getDetailPerson
  );
  const [fetchModalData, setFetchModalData] = useState({});
  const { tablet } = useBreakpointViewport();

  const { movie_credits, tv_credits, profiles } = person || {};

  const sections = [
    {
      key: 'general',
      heading: 'Vista general',
      data: { ...person },
      Element: MediaDetailGeneral
    },
    {
      key: 'images',
      heading: `Imágenes (${profiles && profiles.length})`,
      to: `/${routeMediaTypes.person}/${id}/images`,
      data: profiles && !isEmptyArray(profiles) && { images: profiles },
      Element: MediaDetailImages
    }
  ];

  return (
    <div className={`App-container App-content ${tablet && styles.tablet}`}>
      <div className={styles.body}>
        <MediaDetail skeleton={loading} sections={sections} {...person} />
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default PersonsDetailPage;
