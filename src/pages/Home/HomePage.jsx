import { useEffect, useState } from 'react';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import MediaItemSkeleton from '../../components/Media/MediaItem/MediaItem.skeleton';
import Slider from '../../components/UI/Slider/Slider';
import Link from '../../components/UI/Link/Link';
import { getTrending } from '../../services/get-trending';
import { getDiscoverMovies } from '../../services/get-discover-movies';
import { getDiscoverSeries } from '../../services/get-discover-series';
import './HomePage.css';
import {useLoadDataPage} from '../../hooks/useLoadDataPage';

const Category = (heading, type = 'movies', items, loading, showMoreLink) => {
  return (
    <div className="category-wrapper">
      <div className="sub-heading flexbox flexbox-space-between">
        {heading}
        {showMoreLink && <Link to={`/${type}`}>Ver más</Link>}
      </div>        
      
      <Slider>
        {items && items.map((item) => (
          <MediaItem key={item.id} to={`/${type}/${item.id}`} ratio={1.5} {...item}></MediaItem>
        ))}
      </Slider>

      {loading && <Slider>
        {loading.map((index) => (
          <MediaItemSkeleton key={index} ratio={1.5}></MediaItemSkeleton>
        ))}
      </Slider>}
    </div>
  );
};

const HomePage = () => {
  const [trendings, setTrendings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const { data:dataTrendings, loading:loadingTrendings } = useLoadDataPage(() => getTrending(), 8);
  const { data:dataMovies, loading:loadingMovies } = useLoadDataPage(() => getDiscoverMovies(), 8);
  const { data:dataSeries, loading:loadingSeries } = useLoadDataPage(() => getDiscoverSeries(), 8);

  useEffect(() => {
    if (dataTrendings) {
      setTrendings(dataTrendings);
    }
  }, [dataTrendings]);
  useEffect(() => {
    if (dataMovies) {
      setMovies(dataMovies);
    }
  }, [dataMovies]);
  useEffect(() => {
    if (dataSeries) {
      setSeries(dataSeries);
    }
  }, [dataSeries]);

  return (
    <div>
      <h2 className="heading">Bienvenido, películas y series para ti</h2>

      {Category('Tendencias hoy', 'movies', trendings, loadingTrendings)}
      
      {Category('Películas populares', 'movies', movies, loadingMovies, true)}
      
      {Category('Series populares', 'series', series, loadingSeries, true)}
    </div>
  );
};

export default HomePage;
