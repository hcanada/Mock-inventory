const statusStyles = {
  in_stock: 'bg-green-100 text-green-800',
  low_stock: 'bg-yellow-100 text-yellow-800',
  out_of_stock: 'bg-red-100 text-red-800',
};

const statusLabels = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  out_of_stock: 'Out of Stock',
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        statusStyles[status] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
