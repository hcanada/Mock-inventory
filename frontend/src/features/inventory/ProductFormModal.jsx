import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { CATEGORIES } from '../../utils/constants';

export function ProductFormModal({ isOpen, onClose, product, onSubmit, isLoading }) {
  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      sku: '',
      description: '',
      category: 'Other',
      quantity: 0,
      price: 0,
      lowStockThreshold: 10,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        sku: product.sku,
        description: product.description || '',
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        lowStockThreshold: product.lowStockThreshold,
      });
    } else {
      reset({
        name: '',
        sku: '',
        description: '',
        category: 'Other',
        quantity: 0,
        price: 0,
        lowStockThreshold: 10,
      });
    }
  }, [product, reset]);

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      quantity: parseInt(data.quantity, 10),
      price: parseFloat(data.price),
      lowStockThreshold: parseInt(data.lowStockThreshold, 10),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Product' : 'Add Product'}
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-2">
              Name <span className="text-accent-rose">*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`input-glass ${errors.name ? 'border-accent-rose/50' : ''}`}
              placeholder="Product name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-accent-rose">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-300 mb-2">
              SKU <span className="text-accent-rose">*</span>
            </label>
            <input
              type="text"
              {...register('sku', { required: 'SKU is required' })}
              disabled={isEditing}
              className={`input-glass ${errors.sku ? 'border-accent-rose/50' : ''} ${isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
              placeholder="PRD-001"
            />
            {errors.sku && (
              <p className="mt-2 text-sm text-accent-rose">{errors.sku.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="input-glass resize-none"
            placeholder="Optional product description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Category <span className="text-accent-rose">*</span>
          </label>
          <div className="relative">
            <select
              {...register('category', { required: 'Category is required' })}
              className="input-glass appearance-none cursor-pointer pr-10"
            >
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-2">
              Quantity <span className="text-accent-rose">*</span>
            </label>
            <input
              type="number"
              {...register('quantity', {
                required: 'Required',
                min: { value: 0, message: 'Must be 0+' },
              })}
              className={`input-glass ${errors.quantity ? 'border-accent-rose/50' : ''}`}
              placeholder="0"
            />
            {errors.quantity && (
              <p className="mt-2 text-sm text-accent-rose">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-300 mb-2">
              Price <span className="text-accent-rose">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400">
                $
              </div>
              <input
                type="number"
                step="0.01"
                {...register('price', {
                  required: 'Required',
                  min: { value: 0, message: 'Must be 0+' },
                })}
                className={`input-glass pl-7 ${errors.price ? 'border-accent-rose/50' : ''}`}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="mt-2 text-sm text-accent-rose">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-300 mb-2">
              Low Stock Alert
            </label>
            <input
              type="number"
              {...register('lowStockThreshold', {
                min: { value: 0, message: 'Must be 0+' },
              })}
              className={`input-glass ${errors.lowStockThreshold ? 'border-accent-rose/50' : ''}`}
              placeholder="10"
            />
            {errors.lowStockThreshold && (
              <p className="mt-2 text-sm text-accent-rose">
                {errors.lowStockThreshold.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-surface-700/50">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
