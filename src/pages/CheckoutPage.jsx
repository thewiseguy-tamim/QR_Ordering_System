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
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [animateSubmit, setAnimateSubmit] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Helper to show animated toast (uses your existing toast API)
  const showAnimatedToast = (message, type = 'info', ttl = 3000) => {
    const content = (
      <div className="qr-toast-anim">
        <div className="whitespace-pre-line">{message}</div>
        <div className="qr-toast-progress mt-2">
          <span style={{ '--ttl': `${ttl}ms` }} />
        </div>
      </div>
    );
    toast(content, type, ttl);
  };

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

  // One-time pulse when the button becomes enabled
  const enabled = canSubmit && items.length > 0 && !loading;
  const prevEnabledRef = useRef(false);
  useEffect(() => {
    if (enabled && !prevEnabledRef.current) {
      setAnimateSubmit(true);
      const t = setTimeout(() => setAnimateSubmit(false), 1200);
      prevEnabledRef.current = enabled; // prevent re-trigger loop
      return () => clearTimeout(t);
    }
    prevEnabledRef.current = enabled;
  }, [enabled]);

  const handleSubmit = async () => {
    // Always validate before submit
    const res = formRef.current?.validateAndGet?.();
    if (!res || !res.ok) {
      showAnimatedToast(res?.message || 'Please complete customer info first.', 'error', 4500);
      return;
    }
    const cust = res.data;
    setCustomer(cust);

    if (items.length === 0) {
      toast('Cart is empty.', 'error', 3000);
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
      localStorage.setItem('qr_last_order', JSON.stringify(orderData));

      clearCart();
      try {
        sessionStorage.removeItem(DRAFT_KEY);
        sessionStorage.removeItem(REDIRECT_ONCE_KEY);
      } catch {}
      setCustomer(null);

      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/confirmation?orderId=${orderData.orderId}`);
      }, 1200);
    } catch (err) {
      console.error(err);
      showAnimatedToast('Failed to submit order. Please try again.', 'error', 4500);
    } finally {
      setLoading(false);
    }
  };

  // Keep button clickable to show toast even if form is invalid.
  // Still blocked by validation inside handleSubmit.
  const clickable = !loading && items.length > 0;

  return (
    <div className="p-4 grid gap-4">
      <CustomerForm
        ref={formRef}
        onSubmit={setCustomer}
        initial={customer}
        onValidityChange={setCanSubmit}
      />

      <OrderSummary
        items={items}
        subtotal={totals.subtotal}
        tax={totals.tax}
        total={totals.total}
        allowEdit
      />

      <Button
        onClick={handleSubmit}
        disabled={!clickable}
        className={[
          'relative select-none',
          'transition-all duration-200',
          clickable
            ? 'hover:scale-[1.02] active:scale-[.98] shadow-md hover:shadow-lg'
            : 'opacity-60 cursor-not-allowed',
          animateSubmit ? 'animate-pulse' : ''
        ].join(' ')}
      >
        {loading ? <LoadingSpinner /> : 'Send to Kitchen'}
      </Button>

      {showSuccess && <SuccessOverlay message="On your way" />}
    </div>
  );
}