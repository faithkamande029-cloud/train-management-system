import Modal from '../Modal/Modal';
import Button from '../Button/Button';

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title || 'Confirm'} size="sm">
      <div className="py-4">
        <p className="text-gray-300">{message || 'Are you sure?'}</p>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Yes, Confirm</Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;