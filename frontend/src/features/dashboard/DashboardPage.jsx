import { useGetDashboardSummaryQuery, useGetDashboardChartsQuery } from '../../api/dashboardApi';
import { PageHeader } from '../../components/layout/PageHeader';
import { PageLoader } from '../../components/ui/LoadingSpinner';
import { MetricCard } from './MetricCard';
import { CategoryChart } from './CategoryChart';
import { StatusChart } from './StatusChart';
import { TrendChart } from './TrendChart';
import { formatCurrency } from '../../utils/formatters';

export function DashboardPage() {
  const { data: summaryData, isLoading: summaryLoading, error: summaryError } = useGetDashboardSummaryQuery();
  const { data: chartsData, isLoading: chartsLoading, error: chartsError } = useGetDashboardChartsQuery();

  if (summaryLoading || chartsLoading) {
    return <PageLoader />;
  }

  if (summaryError || chartsError) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent-rose/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-display font-semibold text-surface-200 mb-2">Failed to load dashboard</h3>
        <p className="text-surface-400">Please try refreshing the page</p>
      </div>
    );
  }

  const summary = summaryData?.data || {};
  const charts = chartsData?.data || {};

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your inventory metrics"
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Products"
          value={summary.totalProducts || 0}
          variant="default"
          index={0}
        />
        <MetricCard
          title="Total Inventory Value"
          value={formatCurrency(summary.totalValue || 0)}
          variant="value"
          index={1}
        />
        <MetricCard
          title="Low Stock Items"
          value={summary.lowStock || 0}
          variant={summary.lowStock > 0 ? 'warning' : 'default'}
          index={2}
        />
        <MetricCard
          title="Out of Stock"
          value={summary.outOfStock || 0}
          variant={summary.outOfStock > 0 ? 'danger' : 'default'}
          index={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-semibold text-surface-100">By Category</h3>
              <p className="text-sm text-surface-400">Product distribution</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
            </div>
          </div>
          <CategoryChart data={charts.byCategory} />
        </div>

        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-semibold text-surface-100">By Status</h3>
              <p className="text-sm text-surface-400">Stock level overview</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent-violet/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
          </div>
          <StatusChart data={charts.byStatus} />
        </div>
      </div>

      {/* Trend Chart */}
      <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-display font-semibold text-surface-100">Inventory Trend</h3>
            <p className="text-sm text-surface-400">Products added over the last 30 days</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-accent-emerald/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
        </div>
        <TrendChart data={charts.overTime} />
      </div>
    </div>
  );
}
