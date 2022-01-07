import { useEffect, useRef, useState, useCallback } from 'react';

import { getEmptyArray } from '@utils/helpers/arrays';

const initialData = (itemsPerView) => (itemsPerView ? getEmptyArray(itemsPerView) : null);

export const useFetchData = (fetchData, itemsPerView, page = 1) => {
  const isMounted = useRef(true);
  const [data, setData] = useState({ data: initialData(itemsPerView), loading: true, error: null });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDataCallback = useCallback(
    typeof fetchData === 'string' ? fetch(fetchData) : fetchData,
    [page]
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setData({
      data: initialData(itemsPerView),
      loading: true,
      error: false
    });

    fetchDataCallback()
      .then((response) => {
        if (isMounted.current) {
          setData({
            data: response,
            loading: false,
            error: false
          });
        }
      })
      .catch((error) => {
        setData({
          data: null,
          loading: false,
          error
        });
      });
  }, [fetchDataCallback, itemsPerView, page]);

  return data;
};
