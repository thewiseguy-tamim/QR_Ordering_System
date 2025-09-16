import OrderConfirmation from '../components/checkout/OrderConfirmation';
import { useSearchParams } from 'react-router-dom';

export default function ConfirmationPage() {
  const [params] = useSearchParams();
  const orderId = params.get('orderId') || 'UNKNOWN';
  return <OrderConfirmation orderId={orderId} />;
}