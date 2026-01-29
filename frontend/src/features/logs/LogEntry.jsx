import { formatDateTime } from '../../utils/formatters';

const actionConfig = {
  PRODUCT_CREATED: {
    badge: 'badge-success',
    label: 'Created',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  PRODUCT_UPDATED: {
    badge: 'badge-info',
    label: 'Updated',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    ),
  },
  QUANTITY_CHANGED: {
    badge: 'badge-warning',
    label: 'Qty Changed',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  PRODUCT_DELETED: {
    badge: 'badge-danger',
    label: 'Deleted',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
};

export function LogEntry({ log, index = 0 }) {
  const config = actionConfig[log.action] || {
    badge: 'badge-neutral',
    label: log.action,
    icon: null,
  };

  const formatChanges = (changes) => {
    if (!changes || Object.keys(changes).length === 0) return null;

    return Object.entries(changes).map(([field, { from, to }]) => (
      <div key={field} className="flex items-center gap-2 text-sm">
        <span className="text-surface-400 capitalize">{field}:</span>
        <span className="text-surface-500 line-through">{String(from)}</span>
        <svg className="w-3 h-3 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
        <span className="text-accent-emerald font-medium">{String(to)}</span>
      </div>
    ));
  };

  return (
    <div
      className="p-5 hover:bg-surface-800/20 transition-colors animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className={`badge ${config.badge} gap-1.5`}>
            {config.icon}
            {config.label}
          </span>
          <div>
            <p className="font-medium text-surface-100">
              {log.productSnapshot?.name || 'Unknown Product'}
            </p>
            <p className="text-sm text-surface-500 font-mono">
              SKU: {log.productSnapshot?.sku || 'N/A'}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-sm text-surface-300">
            {formatDateTime(log.createdAt)}
          </p>
          <p className="text-sm text-surface-500">
            by <span className="text-surface-300">{log.user?.name || 'Unknown'}</span>
          </p>
        </div>
      </div>
      {log.changes && Object.keys(log.changes).length > 0 && (
        <div className="mt-4 pt-4 border-t border-surface-700/30 flex flex-wrap gap-x-6 gap-y-2">
          {formatChanges(log.changes)}
        </div>
      )}
    </div>
  );
}
