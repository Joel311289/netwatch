import { useEffect, useState } from 'react';
import MediaCategorySlider from '../../components/Media/MediaCategorySlider/MediaCategorySlider';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { getTrending } from '../../services/get-trending';
import { getDiscoverMovies } from '../../services/get-discover-movies';
import { getDiscoverSeries } from '../../services/get-discover-series';
import './HomePage.css';

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

      <MediaCategorySlider heading="Tendencias hoy" items={trendings} loading={loadingTrendings}></MediaCategorySlider>
      
      <MediaCategorySlider heading="Películas populares" type="movies" items={movies} loading={loadingMovies}></MediaCategorySlider>
      
      <MediaCategorySlider heading="Series populares" type="series" items={series} loading={loadingSeries}></MediaCategorySlider>
    </div>
  );
};

export default HomePage;
