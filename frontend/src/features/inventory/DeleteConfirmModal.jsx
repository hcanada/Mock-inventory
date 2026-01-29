import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

export function DeleteConfirmModal({ isOpen, onClose, product, onConfirm, isLoading }) {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent-rose/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
        <h3 className="text-lg font-display font-semibold text-surface-100 mb-2">
          Delete "{product.name}"?
        </h3>
        <p className="text-sm text-surface-400">
          This will soft delete the product. It can be recovered later if needed.
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={isLoading}>
          Delete Product
        </Button>
      </div>
    </Modal>
  );
}
