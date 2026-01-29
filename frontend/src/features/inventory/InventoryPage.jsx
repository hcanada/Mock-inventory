import { useState } from 'react';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../api/productsApi';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
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
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load products</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Inventory">
        {isAdmin && (
          <Button onClick={handleAdd}>Add Product</Button>
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
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Try adjusting your filters or add a new product."
          action={
            isAdmin && (
              <Button onClick={handleAdd}>Add Product</Button>
            )
          }
        />
      ) : (
        <>
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
        </>
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
