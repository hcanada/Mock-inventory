import { useState } from 'react';
import { useGetLogsQuery } from '../../api/logsApi';
import { PageHeader } from '../../components/layout/PageHeader';
import { PageLoader } from '../../components/ui/LoadingSpinner';
import { Pagination } from '../../components/ui/Pagination';
import { EmptyState } from '../../components/ui/EmptyState';
import { LogEntry } from './LogEntry';

export function LogsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetLogsQuery({ page, limit: 20 });

  const logs = data?.data || [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  if (error) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent-rose/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-display font-semibold text-surface-200 mb-2">Failed to load logs</h3>
        <p className="text-surface-400">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Activity Logs"
        subtitle="Track all product changes"
      />

      {isLoading ? (
        <PageLoader />
      ) : logs.length === 0 ? (
        <div className="glass-card">
          <EmptyState
            title="No activity logs yet"
            message="Activity logs will appear here when products are created, updated, or deleted."
            icon={
              <div className="w-16 h-16 rounded-2xl bg-surface-800/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
          />
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="divide-y divide-surface-700/30">
            {logs.map((log, index) => (
              <LogEntry key={log._id} log={log} index={index} />
            ))}
          </div>
          <Pagination
            page={pagination.page}
            pages={pagination.pages}
            total={pagination.total}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
