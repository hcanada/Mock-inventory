export function MetricCard({ title, value, subtitle, variant = 'default' }) {
  const variants = {
    default: 'bg-white',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200',
  };

  return (
    <div
      className={`rounded-lg shadow-sm border p-6 ${variants[variant]}`}
    >
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
