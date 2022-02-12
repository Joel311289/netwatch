import { useState } from 'react';
import { useFetch } from '@hooks/useFetch';
import { useMediaPath } from '@hooks/useMediaPath';

import MediaModal from '@components/Media/MediaModal/MediaModal';
import MediaDetail from '@components/Media/MediaDetail/MediaDetail';

import { mediaTypes } from '@services/constants';
import { getDetailPerson } from '@services/persons/get-detail-person';

import { sections } from '@pages/PersonDetail/config';
import styles from '@pages/PersonDetail/PersonDetailPage.module.css';

const PersonDetailPage = () => {
  const { id } = useMediaPath('/:mediaType/:key');
  const [fetchModalData, setFetchModalData] = useState({});
  const { data: detail, loading } = useFetch(
    [
      `/api/${mediaTypes.PERSON}/${id}`,
      {
        append_to_response: [
          'external_ids',
          'images',
          'tagged_images',
          'combined_credits',
          'movie_credits',
          'tv_credits'
        ]
      }
    ],
    getDetailPerson
  );

  return (
    <div className={`App-container App-content`}>
      <div className={styles.body}>
        <MediaDetail skeleton={loading} sections={sections(detail)} {...detail} />
      </div>

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default PersonDetailPage;
