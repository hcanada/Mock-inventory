import { useState, useCallback } from 'react';

export function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  return {
    page,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
}
