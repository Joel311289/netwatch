import { useEffect, useState } from 'react';

import { useLoadDataPage } from '@hooks/useLoadDataPage';

export const useLoadMore = (fetchMoreData, itemsPerPage) => {
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState([]);
  const { data, loading } = useLoadDataPage(() => fetchMoreData(page), itemsPerPage, page);

  const onLoadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (data && !loading) {
      setCurrent((prev) => [...prev, ...data].filter((item) => Boolean(item)));
    }
    if (Array.isArray(loading)) {
      setCurrent((prev) => [...prev, ...loading]);
    }
  }, [data, loading]);

  return [current, loading, onLoadMore];
};
