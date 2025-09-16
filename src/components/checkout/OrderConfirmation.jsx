import { Link } from 'react-router-dom';

export default function OrderConfirmation({ orderId }) {
  return (
    <div className="p-6 text-center">
      <div className="text-5xl mb-2">✅</div>
      <h2 className="text-xl font-bold">Order Confirmed</h2>
      <p>Your order <strong>{orderId}</strong> has been received!</p>
      <p>We’ll start preparing it right away.</p>
      <Link to="/menu" className="inline-block mt-3 border border-gray-200 px-3 py-2 rounded-lg">Back to Menu</Link>
    </div>
  );
}