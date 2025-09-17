import React from 'react';
import ReactDOM from 'react-dom';

export default function SuccessOverlay({ message = 'Order Completed', onDone }) {
  const portalTarget =
    typeof document !== 'undefined'
      ? document.getElementById('modal-root') || document.body
      : null;

  if (!portalTarget) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[1.5px] animate-fade-in grid place-items-end sm:place-items-center p-3"
      role="status"
      aria-live="polite"
    >
      {/* Bottom sheet / centered card */}
      <div className="w-full sm:w-[420px] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl animate-slide-up overflow-hidden">
        {/* Handle bar */}
        <div className="h-1.5 w-12 bg-slate-300/70 rounded-full mx-auto mt-2 mb-3" />

        <div className="px-6 pb-6 pt-1 text-center">
          {/* Cooking pan emblem */}
          <div className="relative inline-grid place-items-center w-[120px] h-[120px] mx-auto">
            {/* Outer soft halo */}
            <span className="absolute inset-[-10px] rounded-full bg-orange-400/10" />

            {/* Animated cooking pan */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-[92px] h-[92px] text-slate-700"
            >
              {/* Pan base */}
              <rect x="8" y="36" width="40" height="12" rx="2" fill="currentColor" />
              {/* Handle */}
              <rect x="48" y="38" width="12" height="8" rx="2" fill="currentColor" />
              {/* Steam lines */}
              <path
                d="M20 20c0 4-2 4-2 8s2 4 2 8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="animate-bounce"
              />
              <path
                d="M28 16c0 4-2 4-2 8s2 4 2 8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="animate-bounce delay-150"
              />
              <path
                d="M36 20c0 4-2 4-2 8s2 4 2 8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="animate-bounce delay-300"
              />
            </svg>
          </div>

          <div className="mt-3 text-lg font-semibold text-slate-800">{message}</div>
          <div className="text-slate-500 text-sm">We’re preparing your order 🍳</div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}
