import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ title, onClose, children }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const portalTarget =
    typeof document !== 'undefined'
      ? document.getElementById('modal-root') || document.body
      : null;

  if (!portalTarget) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[80] bg-black/30 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow w-full sm:max-w-xl max-h-[calc(100vh-16px)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3 className="font-semibold">{title}</h3>
          <button ref={closeRef} className="text-lg" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div
          className="p-4 grid gap-3 overflow-y-auto"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
        >
          {children}
        </div>
      </div>
    </div>,
    portalTarget
  );
}