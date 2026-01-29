import { CATEGORIES, STATUSES, SORT_OPTIONS, SORT_ORDERS } from '../../utils/constants';

export function ProductFilters({
  search,
  category,
  status,
  sortBy,
  sortOrder,
  onFilterChange,
}) {
  return (
    <div className="glass-card p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search products..."
              className="input-glass pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Category
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="input-glass appearance-none cursor-pointer pr-10"
            >
              <option value="" className="bg-surface-800">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-surface-800">
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-surface-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="input-glass appearance-none cursor-pointer pr-10"
            >
              <option value="" className="bg-surface-800">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value} className="bg-surface-800">
                  {s.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-surface-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Sort By
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="input-glass appearance-none cursor-pointer pr-10"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-surface-800">
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-surface-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Order
          </label>
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => onFilterChange('sortOrder', e.target.value)}
              className="input-glass appearance-none cursor-pointer pr-10"
            >
              {SORT_ORDERS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-surface-800">
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-surface-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
