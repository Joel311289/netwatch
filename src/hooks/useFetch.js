import useSWR from 'swr';

export const useFetch = (path, fetcher) => {
  const { data, error } = useSWR(path, fetcher);

  return {
    data,
    loading: !error && !data,
    error
  };
};
