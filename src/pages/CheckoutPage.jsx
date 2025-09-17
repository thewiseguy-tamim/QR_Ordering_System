import { useEffect, useRef, useState } from 'react';
import CustomerForm from '../components/checkout/CustomerForm';
import OrderSummary from '../components/checkout/OrderSummary';
import useCart from '../hooks/useCart';
import { submitOrderToPOS } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useToast from '../hooks/useToast';
import SuccessOverlay from '../components/common/SuccessOverlay';

const DRAFT_KEY = 'qr_customer_draft_v1';
const REDIRECT_ONCE_KEY = 'qr_review_redirected_once';

export default function CheckoutPage() {
  const { items, totals, clearCart } = useCart();
  const [customer, setCustomer] = useState(null); // set on Review or on Submit via ref
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Prefill from session draft when entering the page
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null');
      if (saved) {
        setCustomer({
          name: saved.name || '',
          phone: saved.phone || '',
          email: saved.email || '',
          tableNumber: saved.tableNumber || 1
        });
      }
    } catch {}
  }, []);

  const handleSubmit = async () => {
    // Ensure we have valid customer data (from review or from form ref)
    let cust = customer;
    if (!cust) {
      const res = formRef.current?.validateAndGet?.();
      if (!res || !res.ok) {
        toast(res?.message || 'Please complete customer info first.', 'error');
        return;
      }
      cust = res.data;
      setCustomer(cust);
    }

    if (items.length === 0) {
      toast('Cart is empty.', 'error');
      return;
    }

    const orderData = {
      orderId: 'ORD_' + Date.now(),
      tableNumber: cust.tableNumber,
      customer: { name: cust.name, phone: cust.phone, email: cust.email || undefined },
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

      // Save last order (optional, not part of reset)
      localStorage.setItem('qr_last_order', JSON.stringify(orderData));

      // Reset everything for next order
      clearCart(); // clears cart + persisted cart
      try {
        sessionStorage.removeItem(DRAFT_KEY);
        sessionStorage.removeItem(REDIRECT_ONCE_KEY);
      } catch {}
      setCustomer(null);

      // Show success animation then go to confirmation
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/confirmation?orderId=${orderData.orderId}`);
      }, 1200);
    } catch (err) {
      console.error(err);
      toast('Failed to submit order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 grid gap-4">
      <CustomerForm ref={formRef} onSubmit={setCustomer} initial={customer} />

      <OrderSummary
        items={items}
        subtotal={totals.subtotal}
        tax={totals.tax}
        total={totals.total}
        allowEdit
      />

      <Button onClick={handleSubmit} disabled={loading || items.length === 0}>
        {loading ? <LoadingSpinner /> : 'Submit Order'}
      </Button>

      {showSuccess && <SuccessOverlay message="Order Completed" />}
    </div>
  );
}