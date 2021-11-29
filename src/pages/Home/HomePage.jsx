import { useEffect, useState } from 'react';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import MediaItemSkeleton from '../../components/Media/MediaItem/MediaItem.skeleton';
import Slider from '../../components/UI/Slider/Slider';
import Button from '../../components/UI/Button/Button';
import Link from '../../components/UI/Link/Link';
import { getTrending } from '../../services/get-trending';
import { getDiscoverMovies } from '../../services/get-discover-movies';
import { getDiscoverSeries } from '../../services/get-discover-series';
import './HomePage.css';

const HomePage = () => {
  const [trendings, setTrendings] = useState(null);
  const [movies, setMovies] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    getTrending().then((response) => setTrendings(response));
    getDiscoverMovies().then((response) => setMovies(response));
    getDiscoverSeries().then((response) => setSeries(response));
  }, []);

  // [1,2,3,4,5,6,7,8].map((_, index) => (
  //   <MediaItemSkeleton key={index} ratio={1.5}></MediaItemSkeleton>
  // ))

  const category = (heading, type = 'movies', items, showMoreLink) => {
    return items && (
      <div className="type-wrapper">
        <div className="App-sub-heading">
          {heading}
          {showMoreLink && <Link to={`/${type}`}>Ver más</Link>}
        </div>        
        <Slider>
          {items.map(item => (
            <MediaItem key={item.id} to={`/${type}/${item.id}`} ratio={1.5} {...item}></MediaItem>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <div>
      <h2 className="App-heading">Bienvenido, películas y series para ti</h2>

      {category('Tendencias hoy', 'movies', trendings)}
      
      {category('Películas populares', 'movies', movies, true)}
      
      {category('Series populares', 'series', series, true)}
    </div>
  );
};

export default HomePage;
