import { useState, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

export function useProductFilters() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  const filters = {
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(category && { category }),
    ...(status && { status }),
    sortBy,
    sortOrder,
    page,
    limit: 10,
  };

  const resetFilters = useCallback(() => {
    setSearch('');
    setCategory('');
    setStatus('');
    setSortBy('createdAt');
    setSortOrder('desc');
    setPage(1);
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    setPage(1);
    switch (filterName) {
      case 'search':
        setSearch(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'status':
        setStatus(value);
        break;
      case 'sortBy':
        setSortBy(value);
        break;
      case 'sortOrder':
        setSortOrder(value);
        break;
      default:
        break;
    }
  }, []);

  return {
    search,
    category,
    status,
    sortBy,
    sortOrder,
    page,
    setPage,
    filters,
    handleFilterChange,
    resetFilters,
  };
}
