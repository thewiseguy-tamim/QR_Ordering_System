import React, { useEffect, useState, memo } from 'react';
import useCart from '../../hooks/useCart';
import { calculateItemUnitPrice, formatCurrency } from '../../utils/priceCalculations';
import Modal from '../common/Modal';
import Button from '../common/Button';
import useToast from '../../hooks/useToast';

const FALLBACK_IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f4f4f4"/><text x="50%" y="50%" font-size="24" text-anchor="middle" fill="%23999" dy=".3em">Image</text></svg>';

function FoodItem({ item }) {
  const { addItem } = useCart();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const hasOptions = item.options && item.options.length > 0;
  const isAvailable = item.available;

  const quickAdd = () => {
    addItem({ menuItem: item, quantity: 1, selectedOptions: [], specialInstructions: '' });
    if (navigator.vibrate) navigator.vibrate(10);
    toast(`Added ${item.name}`, 'success');
    // No redirect to cart
  };

  return (
    <article
      className={`flex flex-col sm:flex-row gap-3 bg-white border border-gray-200 rounded-2xl overflow-hidden ${
        !isAvailable ? 'opacity-60' : ''
      }`}
    >
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMG;
        }}
        className="w-full sm:w-2/5 aspect-[4/3] object-cover"
      />
      <div className="flex-1 p-3">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold">{formatCurrency(item.price)}</span>
          <div className="flex gap-1 flex-wrap">
            {(item.tags || []).map((t) => (
              <span key={t} className="text-xs bg-gray-100 rounded px-2 py-1 text-gray-700">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3">
          {isAvailable ? (
            hasOptions ? (
              <Button onClick={() => setOpen(true)} aria-label={`Customize ${item.name}`}>
                Customize
              </Button>
            ) : (
              <Button onClick={quickAdd} aria-label={`Add ${item.name} to cart`}>
                Add to Cart
              </Button>
            )
          ) : (
            <span className="text-gray-500 font-medium">Unavailable</span>
          )}
        </div>
      </div>

      {hasOptions && isAvailable && (
        <CustomizeModal
          item={item}
          open={open}
          onClose={() => setOpen(false)}
          onAdd={(payload) => {
            addItem(payload);
            if (navigator.vibrate) navigator.vibrate(10);
            toast(`Added ${item.name}`, 'success');
            // No redirect to cart
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
  // Hooks must always run (no early return before hooks)
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
    ...(sizeOption && selected.size
      ? [{ type: 'size', choice: selected.size.name, price: selected.size.price }]
      : []),
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
            className="w-full rounded-xl border-gray-200 focus:border-brand focus:ring-brand"
          />
        </section>

        <section className="flex items-center justify-between">
          <div>
            Unit: <strong>{formatCurrency(unitPrice)}</strong>
          </div>
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