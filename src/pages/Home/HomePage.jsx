import { useFetchData } from '@hooks/useFetchData';
import { useBreakpointViewport } from '@hooks/useBreakpointViewport';
import { useDetailModal } from '@hooks/useDetailModal';
import { useTrailerModal } from '@hooks/useTrailerModal';

import Slider from '@components/Layout/Slider/Slider';
import MediaHeading from '@components/Media/MediaHeading/MediaHeading';
import MediaItem from '@components/Media/MediaItem/MediaItem';

import { routeMediaTypes, mediaTypes } from '@services/constants';
import { routeMediaDetail } from '@services/helpers';
import { getTrending } from '@services/global/get-trending';
import { getDiscoverMovies } from '@services/movies/get-discover-movies';
import { getDiscoverSeries } from '@services/series/get-discover-series';
import { useState } from 'react';
import { getDetailMovie } from '@services/movies/get-detail-movie';
import { getDetailSerie } from '@services/series/get-detail-serie';
import Modal from '@components/UI/Modal/Modal';
import MediaModalDetail from '@components/Media/MediaModalDetail/MediaModalDetail';

const HomePage = () => {
  const { itemsPerRow } = useBreakpointViewport();
  // const { onModalOpen: onModalDetail, ModalDetail } = useDetailModal();
  const { onModalOpen: onModalTrailer, ModalTrailer } = useTrailerModal();
  const { data: trendings, loading: loadingTrendings } = useFetchData(getTrending, itemsPerRow);
  const { data: movies, loading: loadingMovies } = useFetchData(getDiscoverMovies, itemsPerRow);
  const { data: series, loading: loadingSeries } = useFetchData(getDiscoverSeries, itemsPerRow);

  const [fetchModalData, setFetchModalData] = useState({});

  const categories = [
    { heading: 'Tendencias hoy', items: trendings, loading: loadingTrendings },
    {
      route: routeMediaTypes.movie,
      heading: 'Películas populares',
      items: movies,
      loading: loadingMovies
    },
    {
      route: routeMediaTypes.tv,
      heading: 'Series populares',
      items: series,
      loading: loadingSeries
    }
  ];

  const onDetail = (item) => {
    setFetchModalData(item);
  };

  return (
    <div className="App-container App-content">
      <h2 className="heading">Bienvenido, películas y series para ti</h2>

      {categories.map(({ loading, route, heading, items }) => (
        <div key={heading} style={{ marginBottom: 40 }}>
          <div className="sub-heading">
            {items && (
              <MediaHeading skeleton={loading} text={heading} to={route ? `/${route}` : ''} />
            )}
          </div>

          <Slider navigation={!loading}>
            {items.map((item, index) => (
              <MediaItem
                key={index}
                skeleton={loading}
                to={routeMediaDetail(item)}
                ratio={1.5}
                onDetail={() => onDetail(item)}
                onTrailer={() => onModalTrailer(item.type, item.id)}
                {...item}
              />
            ))}
          </Slider>
        </div>
      ))}

      <Modal size="m" visible={!!fetchModalData.id} onClose={() => setFetchModalData({})}>
        {fetchModalData.id && <MediaModalDetail {...fetchModalData} />}
      </Modal>

      {/* {ModalDetail} */}
      {ModalTrailer}
    </div>
  );
};

export default HomePage;
