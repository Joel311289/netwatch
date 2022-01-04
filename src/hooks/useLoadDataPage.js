import { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';

import { getEmptyArray } from '@utils/helpers';

export const useLoadDataPage = (fetchData, itemsPerPage, page = 1) => {
  const isMounted = useRef(true);
  const [data, setData] = useState({});
  const fetchDataCallback = useCallback(fetchData, [page]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setData({
      data: null,
      loading: itemsPerPage ? getEmptyArray(itemsPerPage, null) : true,
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
      .catch(() => {
        setData({
          data: [],
          loading: false,
          error: 'No se pudo cargar la info'
        });
      });
  }, [page]);

  return data;
};
