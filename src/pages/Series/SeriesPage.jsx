import { useEffect, useState } from 'react';
import MediaGrid from '../../components/UI/Grid/Grid';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import MediaHeading from '../../components/Media/MediaHeading/MediaHeading';
import Button from '../../components/UI/Button/Button';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { getDiscoverSeries } from '../../services/get-discover-series';

const SeriesPage = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const { data, loading } = useLoadDataPage(() => getDiscoverSeries(page), 20, page);

  useEffect(() => {
    if (data && !loading) {
      setSeries((prev) => [...prev, ...data].filter((item) => Boolean(item)));
    }
    if (Array.isArray(loading)) {
      setSeries((prev) => [...prev, ...loading]);
    }
  }, [data, loading]);

  const onLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div className="container">
      <h2 className="heading">Series de televisión</h2>

      <div className="sub-heading">
        <MediaHeading text="Más populares"></MediaHeading>
      </div>

      <MediaGrid>
        {series &&
          series.map((item, index) => (
            <MediaItem key={index} ratio={1.5} skeleton={!item} {...(item || {})} />
          ))}
      </MediaGrid>

      {!loading && (
        <div className="block">
          <Button size="large" onClick={onLoadMore}>
            Mostrar más
          </Button>
        </div>
      )}
    </div>
  );
};

export default SeriesPage;
