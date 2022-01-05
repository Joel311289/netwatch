import { useEffect, useState } from 'react';

import { useFetchData } from '@hooks/useFetchData';

export const useLoadMore = (fetchMoreData, itemsPerView) => {
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState([]);
  const { data, loading } = useFetchData(() => fetchMoreData(page), itemsPerView, page);

  const onLoadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (loading) {
      setCurrent((prev) => [...prev, ...data].splice(0, itemsPerView * page));
    }
    if (data && !loading) {
      setCurrent((prev) => [...prev, ...data].filter(Boolean));
    }
  }, [data, loading]);

  return { data: current, loading, onLoadMore };
};
