import { useEffect, useState } from 'react';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import Button from '../../components/UI/Button/Button';
import Link from '../../components/UI/Link/Link';
import { getDiscoverSeries } from '../../services/get-discover-series';
import './SeriesPage.css';

const SeriesPage = () => {
  const [series, setSeries] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getDiscoverSeries(page).then((response) => setSeries(response));
  }, []);

  return (
    <div>
      <h2 className="App-heading">Series de televisión</h2>

      <div className="App-sub-heading">Más populares</div>

      <div className="App-flexbox">
        {series && series.map(item => (
          <MediaItem key={item.id} to={`/series/${item.id}`} ratio={1.5} {...item}></MediaItem>
        ))}
      </div>
    </div>
  );
};

export default SeriesPage;
