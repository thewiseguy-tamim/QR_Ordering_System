import { formatCurrency } from '../../utils/priceCalculations';
import QuantitySelector from '../cart/QuantitySelector';
import useCart from '../../hooks/useCart';

export default function OrderSummary({ items, subtotal, tax, total, allowEdit = true }) {
  const { updateQuantity } = useCart();

  return (
    <div className="border border-gray-200 rounded-2xl bg-white p-3 grid gap-2">
      <h3 className="font-semibold">Order Summary</h3>
      <ul className="list-none m-0 p-0 grid gap-2">
        {items.map(i => (
          <li key={i.id} className="flex justify-between gap-2">
            <div>
              <div className="font-semibold">{i.quantity}× {i.name}</div>
              {i.selectedOptions?.length > 0 && (
                <div className="flex gap-2 mt-1">
                  {i.selectedOptions.map((o, idx) => <span key={idx} className="text-xs bg-gray-100 rounded px-2 py-1">{o.choice}</span>)}
                </div>
              )}
              {i.specialInstructions && <div className="text-xs text-gray-500 mt-1">“{i.specialInstructions}”</div>}
              {allowEdit && (
                <div className="mt-2">
                  <QuantitySelector value={i.quantity} onChange={(q) => updateQuantity(i.id, q)} />
                </div>
              )}
            </div>
            <div className="font-semibold">{formatCurrency(i.totalPrice)}</div>
          </li>
        ))}
      </ul>
      <div className="grid gap-1 border-t border-dashed border-gray-200 pt-2">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
        <div className="flex justify-between"><span>Tax (15%)</span><span>{formatCurrency(tax)}</span></div>
        <div className="flex justify-between"><strong>Total</strong><strong>{formatCurrency(total)}</strong></div>
      </div>
    </div>
  );
}