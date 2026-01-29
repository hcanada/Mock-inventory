import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../auth/useAuth';

export function ProductTable({ products, onEdit, onDelete }) {
  const { isAdmin } = useAuth();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-glass">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="font-medium text-surface-100">
                  {product.name}
                </div>
              </td>
              <td>
                <span className="font-mono text-surface-400">{product.sku}</span>
              </td>
              <td>
                <span className="badge badge-neutral">{product.category}</span>
              </td>
              <td>
                <span className={`font-medium ${
                  product.quantity === 0
                    ? 'text-accent-rose'
                    : product.quantity <= product.lowStockThreshold
                    ? 'text-accent-amber'
                    : 'text-surface-100'
                }`}>
                  {product.quantity}
                </span>
              </td>
              <td>
                <span className="font-medium text-surface-100">
                  {formatCurrency(product.price)}
                </span>
              </td>
              <td>
                <StatusBadge status={product.status} />
              </td>
              <td>
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 rounded-lg text-surface-400 hover:text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => onDelete(product)}
                      className="p-2 rounded-lg text-surface-400 hover:text-accent-rose hover:bg-accent-rose/10 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
