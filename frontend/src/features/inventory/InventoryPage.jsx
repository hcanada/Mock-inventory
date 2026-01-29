import { useState } from 'react';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../api/productsApi';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/Button';
import { PageLoader } from '../../components/ui/LoadingSpinner';
import { Pagination } from '../../components/ui/Pagination';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProductFilters } from './ProductFilters';
import { ProductTable } from './ProductTable';
import { ProductFormModal } from './ProductFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { useProductFilters } from './useProductFilters';
import { useAuth } from '../auth/useAuth';

export function InventoryPage() {
  const { isAdmin } = useAuth();
  const {
    search,
    category,
    status,
    sortBy,
    sortOrder,
    page,
    setPage,
    filters,
    handleFilterChange,
  } = useProductFilters();

  const { data, isLoading, error } = useGetProductsQuery(filters);
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = data?.data || [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedProduct) {
        await updateProduct({ id: selectedProduct._id, ...formData }).unwrap();
      } else {
        await createProduct(formData).unwrap();
      }
      setIsFormOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(selectedProduct._id).unwrap();
      setIsDeleteOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  if (error) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent-rose/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-display font-semibold text-surface-200 mb-2">Failed to load products</h3>
        <p className="text-surface-400">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Inventory" subtitle="Manage your product catalog">
        {isAdmin && (
          <Button onClick={handleAdd}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Product
          </Button>
        )}
      </PageHeader>

      <ProductFilters
        search={search}
        category={category}
        status={status}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onFilterChange={handleFilterChange}
      />

      {isLoading ? (
        <PageLoader />
      ) : products.length === 0 ? (
        <div className="glass-card">
          <EmptyState
            title="No products found"
            message="Try adjusting your filters or add a new product to get started."
            action={
              isAdmin && (
                <Button onClick={handleAdd}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Product
                </Button>
              )
            }
          />
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            page={pagination.page}
            pages={pagination.pages}
            total={pagination.total}
            onPageChange={setPage}
          />
        </div>
      )}

      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
        isLoading={isCreating || isUpdating}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}
