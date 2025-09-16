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
          {/* Emblem with confetti */}
          <div className="relative inline-grid place-items-center w-[120px] h-[120px] mx-auto">
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ring" />
            {/* Outer soft halo */}
            <span className="absolute inset-[-10px] rounded-full bg-green-500/10" />
            {/* Confetti bits */}
            <span className="absolute -left-2 bottom-6 w-2 h-2 rounded-full bg-green-400 animate-confetti-1" />
            <span className="absolute -right-1 bottom-5 w-1.5 h-4 rounded bg-emerald-500 rotate-45 animate-confetti-2" />
            <span className="absolute left-3 -top-1 w-2 h-2 rounded-full bg-lime-400 animate-confetti-3" />
            <span className="absolute right-4 -top-2 w-1.5 h-1.5 rounded-full bg-green-300 animate-confetti-1" />
            <span className="absolute left-8 top-1 w-1.5 h-1.5 rounded bg-emerald-400 animate-confetti-2" />

            {/* Center circle + check */}
            <div className="relative z-10 grid place-items-center w-[92px] h-[92px] rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 12.5l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDasharray: 48, strokeDashoffset: 48 }}
                  className="animate-check"
                />
              </svg>
            </div>
          </div>

          <div className="mt-3 text-lg font-semibold text-slate-800">{message}</div>
          <div className="text-slate-500 text-sm">We’re preparing your order 🎉</div>

          {/* Action button (optional) */}
          <button
            type="button"
            onClick={onDone}
            className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-md active:scale-[0.98] transition-transform"
          >
            Continue
          </button>
        </div>
      </div>
    </div>,
    portalTarget
  );
}