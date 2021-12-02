import { useEffect, useState } from 'react';
import MediaGrid from '../../components/UI/Grid/Grid';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import MediaItemSkeleton from '../../components/Media/MediaItem/MediaItem.skeleton';
import Button from '../../components/UI/Button/Button';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { getDiscoverSeries } from '../../services/get-discover-series';
import './SeriesPage.css';

const SeriesPage = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const { data, loading } = useLoadDataPage(() => getDiscoverSeries(page), 20, page);

  useEffect(() => {
    if (data) {
      setSeries((prev) => [...prev, ...data]);
    }
  }, [data]);

  const onLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div className="container">
      <h2 className="heading">Series de televisión</h2>

      <div className="sub-heading">Más populares</div>

      <MediaGrid gap={15} itemsPerRow={5}>
        {series && series.map((item) => (
          <MediaItem key={item.id} to={`/series/${item.id}`} ratio={1.5} {...item}></MediaItem>
        ))}
      </MediaGrid>
      
      <MediaGrid gap={15} itemsPerRow={5}>
        {loading && loading.map((index) => (
          <MediaItemSkeleton key={index} ratio={1.5}></MediaItemSkeleton>
        ))}
      </MediaGrid>

      {!loading && <div className="block">
        <Button size="large" onClick={onLoadMore}>Mostrar más</Button>
      </div>}
    </div>
  );
};

export default SeriesPage;
