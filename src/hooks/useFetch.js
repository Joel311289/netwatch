import { useState, useEffect, useRef } from 'react';
import { sleep } from '../utils/helpers';

export const useFetch = (url, delay = 500) => {
  const isMounted = useRef(true);
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then((resp) => resp.json())
      .then(async (data) => {
        if (isMounted.current) {
          await sleep(delay);

          setState({
            loading: false,
            error: null,
            data
          });
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo cargar la info'
        });
      });
  }, [url, delay]);

  return state;
};
