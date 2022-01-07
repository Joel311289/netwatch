import useSWRInfinite from 'swr/infinite';

import { getEmptyArray } from '@utils/helpers/arrays';
import { useState } from 'react';

const initialData = (itemsPerView) => (itemsPerView ? getEmptyArray(itemsPerView) : null);

export const useFetchPagination = (path, fetcherMoreData, itemsPerView) => {
  const getKey = (index, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return path(index + 1);
  };

  const [limit, setLimit] = useState(1);
  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    (...args) => {
      return fetcherMoreData(...args).then(({ items, total_pages }) => {
        setLimit(total_pages);
        return items;
      });
    },
    {
      initialSize: 1,
      revalidateAll: false,
      persistSize: true
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd = size === limit;

  const onLoadMore = () => setSize(size + 1);

  return {
    data: !isLoadingMore
      ? [].concat(...(data || []))
      : [].concat(...(data || []), initialData(itemsPerView)),
    loading: isLoadingMore,
    error,
    page: size,
    paginationEnd: isReachingEnd,
    onLoadMore
  };
};
