import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

export function DeleteConfirmModal({ isOpen, onClose, product, onConfirm, isLoading }) {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product">
      <div className="mb-6">
        <p className="text-gray-700">
          Are you sure you want to delete{' '}
          <span className="font-semibold">{product.name}</span>?
        </p>
        <p className="text-sm text-gray-500 mt-2">
          This action will soft delete the product. It can be recovered later.
        </p>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
}
