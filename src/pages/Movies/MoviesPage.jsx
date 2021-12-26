import { useEffect, useState } from 'react';
import MediaGrid from '../../components/UI/Grid/Grid';
import MediaItem from '../../components/Media/MediaItem/MediaItem';
import MediaHeading from '../../components/Media/MediaHeading/MediaHeading';
import MediaModalDetail from '../../components/Media/MediaModalDetail/MediaModalDetail';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import { useLoadDataPage } from '../../hooks/useLoadDataPage';
import { getDiscoverMovies } from '../../services/get-discover-movies';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [itemDetail, setItemDetail] = useState(null);
  const [openedDetail, setOpenedDetail] = useState(false);
  const [page, setPage] = useState(1);
  const { data, loading } = useLoadDataPage(() => getDiscoverMovies(page), 20, page);

  useEffect(() => {
    if (data && !loading) {
      setMovies((prev) => [...prev, ...data].filter((item) => Boolean(item)));
    }
    if (Array.isArray(loading)) {
      setMovies((prev) => [...prev, ...loading]);
    }
  }, [data, loading]);

  const onLoadMore = () => setPage((prev) => prev + 1);
  const onModalOpen = (item) => {
    setItemDetail(item);
    setOpenedDetail(true);
  };
  const onModalClose = () => {
    setOpenedDetail(false);
    setTimeout(() => {
      setItemDetail(null);
    }, 1000);
  };

  return (
    <div className="container">
      <h2 className="heading">Películas</h2>

      <div className="sub-heading">
        <MediaHeading text="Más populares"></MediaHeading>
      </div>

      <MediaGrid>
        {movies &&
          movies.map((item, index) => (
            <MediaItem
              key={index}
              ratio={1.5}
              skeleton={!item}
              onDetail={() => onModalOpen(item)}
              {...(item || {})}
            />
          ))}
      </MediaGrid>

      {!loading && (
        <div className="block">
          <Button size="large" onClick={onLoadMore}>
            Mostrar más
          </Button>
        </div>
      )}

      <Modal size="s" onClose={onModalClose} visible={openedDetail}>
        <MediaModalDetail {...itemDetail} />
      </Modal>
    </div>
  );
};

export default MoviesPage;
