import React, { memo } from 'react';
import QuantitySelector from './QuantitySelector.jsx';
import useCart from '../../hooks/useCart';
import { calculateItemUnitPrice, formatCurrency } from '../../utils/priceCalculations';
import useFlash from '../../hooks/useFlash';

function CartItem({ item }) {
  const { updateQuantity, removeItem, setInstructions } = useCart();
  const unitPrice = calculateItemUnitPrice(item.basePrice, item.selectedOptions);
  const flash = useFlash(item.totalPrice);

  return (
    <div className="border border-gray-200 rounded-2xl p-3 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="m-0 font-semibold">{item.name}</h4>
          {item.selectedOptions?.length > 0 && (
            <ul className="list-none p-0 m-1 flex gap-2 text-sm text-gray-700">
              {item.selectedOptions.map((o, idx) => <li key={idx}>{o.choice}</li>)}
            </ul>
          )}
        </div>
        <div className={`font-bold ${flash ? 'animate-flash' : ''}`}>{formatCurrency(item.totalPrice)}</div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} />
        <div className="text-sm text-gray-500">{formatCurrency(unitPrice)} each</div>
      </div>

      <div className="grid gap-2 mt-2">
        <input
          type="text"
          placeholder="Special instructions (optional)"
          value={item.specialInstructions || ''}
          onChange={(e) => setInstructions(item.id, e.target.value)}
          aria-label={`Special instructions for ${item.name}`}
          className="rounded-lg border-gray-200 focus:border-brand focus:ring-brand"
        />
        <button className="self-start rounded-lg border border-gray-200 px-3 py-2 text-red-600" onClick={() => removeItem(item.id)} aria-label="Remove item">Remove</button>
      </div>
    </div>
  );
}
export default memo(CartItem);