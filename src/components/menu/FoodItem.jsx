import React, { useEffect, useState, memo } from 'react';
import useCart from '../../hooks/useCart';
import { calculateItemUnitPrice, formatCurrency } from '../../utils/priceCalculations';
import Modal from '../common/Modal';
import Button from '../common/Button';
import useToast from '../../hooks/useToast';

const FALLBACK_IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f4f4f4"/><text x="50%" y="50%" font-size="24" text-anchor="middle" fill="%23999" dy=".3em">Image</text></svg>';

function Star({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function FoodItem({ item }) {
  const { addItem } = useCart();
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const hasOptions = item.options && item.options.length > 0;
  const isAvailable = item.available;

  const tags = (item.tags || []).slice(0, 2);
  const extraCount = (item.tags || []).length - tags.length;

  const rating = (item.tags || []).includes('popular') ? '4.3' : '4.1';

  const onFabClick = () => {
    if (!isAvailable) return;
    if (hasOptions) {
      setOpen(true);
      return;
    }
    addItem({ menuItem: item, quantity: 1, selectedOptions: [], specialInstructions: '' });
    if (navigator.vibrate) navigator.vibrate(10);
    toast(`Added ${item.name}`, 'success');
  };

  return (
    <article
      className={[
        'relative h-full flex flex-col overflow-hidden',
        'rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.06)]'
      ].join(' ')}
    >
      {/* Image block with overlay badge */}
      <div className="p-2">
        <div className="relative overflow-hidden rounded-xl ring-1 ring-slate-100">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
            className="w-full aspect-[4/3] object-cover"
          />
          {/* Rating pill (right) */}
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-[11px] font-medium text-white bg-blue-500/95 flex items-center gap-1 shadow">
            <Star className="w-3.5 h-3.5" />
            {rating}
          </div>
          {/* Unavailable overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] grid place-items-center">
              <span className="text-slate-700 text-sm font-semibold">Unavailable</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-3 pb-3">
        <h3
          className="font-semibold text-[15px] leading-snug"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          title={item.name}
        >
          {item.name}
        </h3>

        <p
          className="text-sm text-slate-600 mt-1"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          title={item.description}
        >
          {item.description}
        </p>

        {/* Tags row */}
        {(tags.length > 0 || extraCount > 0) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[11px] leading-4 px-2 py-1 rounded-full bg-slate-100 text-slate-700"
              >
                {t}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="text-[11px] leading-4 px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                +{extraCount} more
              </span>
            )}
          </div>
        )}

        {/* Footer line: price at left, floating CTA at right */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className={`font-semibold tracking-tight ${!isAvailable ? 'text-slate-400' : 'text-slate-900'}`}>
            {formatCurrency(item.price)}
          </span>
        </div>
      </div>

      {/* Floating + FAB (bottom-right) */}
      <button
        onClick={onFabClick}
        disabled={!isAvailable}
        aria-label={hasOptions ? `Customize ${item.name}` : `Add ${item.name} to cart`}
        className={[
          'absolute bottom-3 right-3 size-10 rounded-full',
          'grid place-items-center text-white',
          isAvailable ? 'bg-gradient-to-r from-blue-500 to-blue-300 shadow-lg active:scale-[0.98]' : 'bg-slate-300',
        ].join(' ')}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M11 11V6h2v5h5v2h-5v5h-2v-5H6v-2z" />
        </svg>
      </button>

      {/* Modal for customization */}
      {hasOptions && isAvailable && (
        <CustomizeModal
          item={item}
          open={open}
          onClose={() => setOpen(false)}
          onAdd={(payload) => {
            addItem(payload);
            if (navigator.vibrate) navigator.vibrate(10);
            toast(`Added ${item.name}`, 'success');
          }}
        />
      )}
    </article>
  );
}

function pill(active) {
  const base = 'px-3 py-2 rounded-full border text-sm';
  return `${base} ${active ? 'bg-amber-100 border-amber-300' : 'bg-white border-gray-200'}`;
}

function CustomizeModal({ item, open, onClose, onAdd }) {
  const [selected, setSelected] = useState({});
  const [additions, setAdditions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const sizeOption = item.options.find((o) => o.type === 'size');
  const additionOption = item.options.find((o) => o.type === 'additions');

  // Auto-select first size when required so Add is enabled by default
  useEffect(() => {
    if (open && sizeOption?.required && !selected.size && sizeOption.choices?.length) {
      setSelected((s) => ({ ...s, size: sizeOption.choices[0] }));
    }
  }, [open, sizeOption, selected.size]);

  if (!open) return null;

  const selectedOptions = [
    ...(sizeOption && selected.size ? [{ type: 'size', choice: selected.size.name, price: selected.size.price }] : []),
    ...(additionOption ? additions.map((a) => ({ type: 'additions', choice: a.name, price: a.price })) : [])
  ];

  const unitPrice = calculateItemUnitPrice(item.price, selectedOptions);
  const canAdd = !sizeOption || !!selected.size;

  const toggleAddition = (choice) => {
    setAdditions((prev) => {
      const exists = prev.find((a) => a.name === choice.name);
      if (exists) return prev.filter((a) => a.name !== choice.name);
      return [...prev, choice];
    });
  };

  return (
    <Modal title={`Customize ${item.name}`} onClose={onClose}>
      <div className="grid gap-3">
        {sizeOption && (
          <section>
            <h4 className="mb-2 font-medium">Size</h4>
            <div className="flex flex-wrap gap-2">
              {sizeOption.choices.map((choice) => (
                <button
                  key={choice.name}
                  className={pill(selected.size?.name === choice.name)}
                  onClick={() => setSelected((s) => ({ ...s, size: choice }))}
                >
                  {choice.name} {choice.price ? `(+${formatCurrency(choice.price)})` : ''}
                </button>
              ))}
            </div>
          </section>
        )}

        {additionOption && (
          <section>
            <h4 className="mb-2 font-medium">Additions</h4>
            <div className="flex flex-wrap gap-2">
              {additionOption.choices.map((choice) => {
                const active = additions.some((a) => a.name === choice.name);
                return (
                  <button key={choice.name} className={pill(active)} onClick={() => toggleAddition(choice)}>
                    {choice.name} {choice.price ? `(+${formatCurrency(choice.price)})` : ''}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <h4 className="mb-2 font-medium">Special instructions</h4>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., no croutons, extra spicy..."
            rows={3}
            maxLength={200}
            className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </section>

        <section className="flex items-center justify-between">
          <div>Unit: <strong>{formatCurrency(unitPrice)}</strong></div>
          <div className="flex items-center gap-2">
            <button
              className="w-11 h-11 rounded-lg border border-gray-200"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-[24px] text-center">{quantity}</span>
            <button
              className="w-11 h-11 rounded-lg border border-gray-200"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </section>

        <Button
          disabled={!canAdd}
          onClick={() => {
            onAdd({
              menuItem: item,
              quantity,
              selectedOptions,
              specialInstructions: notes.trim()
            });
            onClose();
          }}
        >
          Add {quantity} • {formatCurrency(unitPrice * quantity)}
        </Button>
      </div>
    </Modal>
  );
}

export default memo(FoodItem);