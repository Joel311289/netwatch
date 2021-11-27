import { useEffect, useState } from 'react';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import Slider from '../../components/UI/Slider/Slider';
import Button from '../../components/UI/Button/Button';
import Link from '../../components/UI/Link/Link';
import { getTrending } from '../../services/get-trending';
import './HomePage.css';

const HomePage = () => {
  const [trendings, setTrendings] = useState([]);

  useEffect(() => {
    getTrending().then((response) => setTrendings(response));
  }, []);

  return (
    <div>
      <h2 className="App-heading">Bienvenido, películas y series para ti</h2>

      <div className="trending-wrapper type-wrapper">
        <div className="App-sub-heading">Tendencias hoy</div>
        
        <div className="media-container">
          <Slider>
            {trendings.map(item => (
              <MediaItem key={item.id} to={`/movies/${item.id}`} {...item}></MediaItem>
            ))}
          </Slider>
        </div>
      </div>

      {/* <div className="movies-wrapper type-wrapper">
        <div className="App-sub-heading">Películas</div>
        <Button>Más populares</Button>
        <br />
        <Link to="/movies">Ver más películas populares</Link>
      </div>

      <div className="tvs-wrapper type-wrapper">
        <div className="App-sub-heading">Programas de televisión</div>
        <Button>Más populares</Button>
      </div> */}
    </div>
  );
};

export default HomePage;
