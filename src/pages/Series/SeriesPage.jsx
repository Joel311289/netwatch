import { useState } from 'react';

import { useFetchPagination } from '@hooks/useFetchPagination';

import Button from '@components/UI/Button/Button';
import Grid from '@components/Layout/Grid/Grid';
import MediaItem from '@components/Media/MediaItem/MediaItem';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaModal from '@components/Media/MediaModal/MediaModal';

import { mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getDiscoverSeries } from '@services/series/get-discover-series';

const SeriesPage = () => {
  const {
    data: series,
    loading,
    onLoadMore,
    paginationEnd
  } = useFetchPagination(`/api/discover/${mediaTypes.TV}`, getDiscoverSeries, 20);
  const [fetchModalData, setFetchModalData] = useState({});

  const onDetail = (item) => setFetchModalData({ ...item, mode: 'detail' });
  const onTrailer = (item) => setFetchModalData({ ...item, mode: 'trailer' });

  return (
    <div className="App-container App-content">
      <h2 className="heading">Series de televisión</h2>

      <div className="sub-heading">
        <MediaHeading text="Más populares"></MediaHeading>
      </div>

      <Grid>
        {series.map((item, index) => (
          <MediaItem
            key={index}
            ratio={1.5}
            skeleton={!item}
            to={routeMediaDetail(item)}
            onDetail={() => onDetail({ ...item, type: mediaTypes.TV })}
            onTrailer={() => onTrailer({ ...item, type: mediaTypes.TV })}
            {...item}
          />
        ))}
      </Grid>

      {!loading && !paginationEnd && (
        <div className="block">
          <Button size="large" onClick={onLoadMore}>
            Mostrar más
          </Button>
        </div>
      )}

      {fetchModalData.id && (
        <MediaModal {...fetchModalData} onClose={() => setFetchModalData({})} />
      )}
    </div>
  );
};

export default SeriesPage;
