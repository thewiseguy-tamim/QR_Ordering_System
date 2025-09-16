import React, { createContext, useCallback, useContext, useState } from 'react';
import ReactDOM from 'react-dom';

const ToastContext = createContext({ toast: () => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback((message, type = 'info', ttl = 2500) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
    setToasts(ts => [...ts, { id, message, type }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), ttl);
  }, []);

  const color = (type) => type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-gray-800';
  const portalTarget = typeof document !== 'undefined'
    ? (document.getElementById('modal-root') || document.body)
    : null;

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {portalTarget && ReactDOM.createPortal(
        <div className="fixed left-0 right-0 bottom-24 grid justify-center gap-2 px-3 z-50 pointer-events-none" role="status" aria-live="polite">
          {toasts.map(t => (
            <div key={t.id} className={`pointer-events-auto min-w-[200px] max-w-[90vw] ${color(t.type)} text-white rounded-xl px-3 py-2 shadow`}>
              {t.message}
            </div>
          ))}
        </div>,
        portalTarget
      )}
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToastContext = () => useContext(ToastContext);