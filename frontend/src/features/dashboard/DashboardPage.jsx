import { useGetDashboardSummaryQuery, useGetDashboardChartsQuery } from '../../api/dashboardApi';
import { PageHeader } from '../../components/layout/PageHeader';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { MetricCard } from './MetricCard';
import { CategoryChart } from './CategoryChart';
import { StatusChart } from './StatusChart';
import { TrendChart } from './TrendChart';
import { formatCurrency } from '../../utils/formatters';

export function DashboardPage() {
  const { data: summaryData, isLoading: summaryLoading, error: summaryError } = useGetDashboardSummaryQuery();
  const { data: chartsData, isLoading: chartsLoading, error: chartsError } = useGetDashboardChartsQuery();

  if (summaryLoading || chartsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (summaryError || chartsError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load dashboard data</p>
      </div>
    );
  }

  const summary = summaryData?.data || {};
  const charts = chartsData?.data || {};

  return (
    <div>
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Products"
          value={summary.totalProducts || 0}
        />
        <MetricCard
          title="Total Inventory Value"
          value={formatCurrency(summary.totalValue || 0)}
        />
        <MetricCard
          title="Low Stock Items"
          value={summary.lowStock || 0}
          variant={summary.lowStock > 0 ? 'warning' : 'default'}
        />
        <MetricCard
          title="Out of Stock"
          value={summary.outOfStock || 0}
          variant={summary.outOfStock > 0 ? 'danger' : 'default'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CategoryChart data={charts.byCategory} />
        <StatusChart data={charts.byStatus} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TrendChart data={charts.overTime} />
      </div>
    </div>
  );
}
