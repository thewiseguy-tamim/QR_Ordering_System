import { formatCurrency } from '../../utils/priceCalculations';
import { Link } from 'react-router-dom';

export default function CartSummary({ subtotal, tax, total, cta = true }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-3 bg-white grid gap-2">
      <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
      <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
      <div className="flex justify-between border-t border-dashed border-gray-200 pt-2">
        <strong>Total</strong><strong>{formatCurrency(total)}</strong>
      </div>
      {cta && (
        <Link to="/checkout" className="mt-1 text-center bg-brand text-white rounded-xl px-4 py-3 font-bold">Proceed to Checkout</Link>
      )}
    </div>
  );
}