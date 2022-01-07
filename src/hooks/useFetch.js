import useSWR from 'swr';

import { getEmptyArray } from '@utils/helpers/arrays';

const initialData = (itemsPerView) => (itemsPerView ? getEmptyArray(itemsPerView) : null);

export const useFetch = (path, fetcher, itemsPerView) => {
  const { data, error } = useSWR(path, fetcher);
  const loading = !error && !data;

  return {
    data: loading ? initialData(itemsPerView) : data,
    loading,
    error
  };
};
