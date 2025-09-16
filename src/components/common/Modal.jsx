import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ title, onClose, children }) {
  const closeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const portalTarget =
    typeof document !== 'undefined'
      ? document.getElementById('modal-root') || document.body
      : null;

  useEffect(() => {
    setMounted(true); // trigger enter transition

    const onEsc = (e) => e.key === 'Escape' && handleClose();
    document.addEventListener('keydown', onEsc);
    // focus the close button for accessibility
    setTimeout(() => closeRef.current?.focus(), 0);

    return () => document.removeEventListener('keydown', onEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!portalTarget) return null;

  const handleClose = () => {
    if (leaving) return;
    setLeaving(true); // play exit animation
    // match transition durations below (400ms)
    setTimeout(() => {
      try { onClose?.(); } catch {}
    }, 380);
  };

  const backdropState = mounted && !leaving ? 'opacity-100' : 'opacity-0';
  const panelState =
    mounted && !leaving
      ? 'translate-y-0 opacity-100 sm:scale-100'
      : 'translate-y-8 opacity-0 sm:scale-95';

  return ReactDOM.createPortal(
    <div
      className={[
        'fixed inset-0 z-[80]',
        'flex items-end sm:items-center justify-center',
        'transition-opacity duration-400 ease-out',
        'bg-black/30 backdrop-blur-[2px]',
        backdropState
      ].join(' ')}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={[
          'bg-white rounded-t-2xl sm:rounded-2xl shadow w-full sm:max-w-xl',
          'max-h-[calc(100vh-16px)] overflow-hidden',
          'transform-gpu transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)]',
          panelState
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3 className="font-semibold">{title}</h3>
          <button
            ref={closeRef}
            className="text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 rounded"
            onClick={handleClose}
            aria-label="Close"
          >
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