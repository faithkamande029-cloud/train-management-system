import { createContext, useContext, useState, useCallback } from 'react';
import ConfirmModal from '../components/common/ConfirmModal/ConfirmModal';

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [resolve, setResolve] = useState(null);
  const [options, setOptions] = useState({});

  const confirm = useCallback((message, title = 'Confirm') => {
    setOptions({ message, title });
    setIsOpen(true);
    return new Promise((res) => {
      setResolve(() => res);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    if (resolve) resolve(true);
  }, [resolve]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    if (resolve) resolve(false);
  }, [resolve]);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
}