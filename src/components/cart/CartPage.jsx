import useCart from '../../hooks/useCart';
import CartItem from './CartItem.jsx';
import CartSummary from './CartSummary.jsx';
import { Link } from 'react-router-dom';
import useToast from '../../hooks/useToast';

export default function CartPage() {
  const { items, totals, clearCart } = useCart();
  const toast = useToast();

  const onClear = () => {
    if (window.confirm('Clear all items from cart?')) {
      clearCart();
      toast('Cart cleared', 'success');
    }
  };

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Your cart is empty.</p>
        <Link to="/menu" className="inline-block mt-2 border border-gray-200 px-3 py-2 rounded-lg">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="p-3 grid gap-3">
      <div className="grid gap-2">
        {items.map(item => <CartItem key={item.id} item={item} />)}
      </div>
      <CartSummary subtotal={totals.subtotal} tax={totals.tax} total={totals.total} />
      <button className="border border-gray-200 rounded-lg px-3 py-2 text-red-600" onClick={onClear} aria-label="Clear cart">Clear Cart</button>
    </div>
  );
}