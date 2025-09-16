import { useState } from 'react';
import CustomerForm from '../components/checkout/CustomerForm';
import OrderSummary from '../components/checkout/OrderSummary';
import useCart from '../hooks/useCart';
import { submitOrderToPOS } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useToast from '../hooks/useToast';

export default function CheckoutPage() {
  const { items, totals, clearCart } = useCart();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!customer) { toast('Please enter customer info first.', 'error'); return; }
    if (items.length === 0) { toast('Cart is empty.', 'error'); return; }

    const orderData = {
      orderId: 'ORD_' + Date.now(),
      tableNumber: customer.tableNumber,
      customer: { name: customer.name, phone: customer.phone, email: customer.email || undefined },
      items: items.map(i => ({
        menuItemId: i.menuItemId,
        name: i.name,
        quantity: i.quantity,
        unitPrice: +(i.totalPrice / i.quantity).toFixed(2),
        totalPrice: i.totalPrice,
        options: i.selectedOptions?.map(o => o.choice) || [],
        specialInstructions: i.specialInstructions || ''
      })),
      subtotal: totals.subtotal,
      tax: totals.tax,
      tip: 0,
      total: totals.total,
      orderTime: new Date().toISOString(),
      status: 'pending'
    };

    try {
      setLoading(true);
      await submitOrderToPOS(orderData);
      localStorage.setItem('qr_last_order', JSON.stringify(orderData));
      clearCart();
      toast('Order submitted!', 'success');
      navigate(`/confirmation?orderId=${orderData.orderId}`);
    } catch (err) {
      console.error(err);
      toast('Failed to submit order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 grid gap-4">
      <CustomerForm onSubmit={setCustomer} initial={customer} />
      <OrderSummary items={items} subtotal={totals.subtotal} tax={totals.tax} total={totals.total} allowEdit />
      <Button onClick={handleSubmit} disabled={loading || items.length === 0}>
        {loading ? <LoadingSpinner /> : 'Submit Order'}
      </Button>
    </div>
  );
}