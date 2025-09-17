import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import Button from '../common/Button';
import useTableNumber from '../../hooks/useTableNumber';
import useToast from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';

const inputBase =
  'w-full bg-white border border-slate-300 rounded-xl px-3 py-3 text-[15px] ' +
  'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

const DRAFT_KEY = 'qr_customer_draft_v1';
const REDIRECT_ONCE_KEY = 'qr_review_redirected_once';

function CustomerFormInner({ onSubmit, initial, onValidityChange }, ref) {
  const toast = useToast();
  const navigate = useNavigate();
  const { tableNumber } = useTableNumber();

  // Load draft from sessionStorage (session only)
  let draft = null;
  try { draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null'); } catch {}

  const [name, setName] = useState(initial?.name ?? draft?.name ?? '');
  const [phone, setPhone] = useState(initial?.phone ?? draft?.phone ?? '');
  const [email, setEmail] = useState(initial?.email ?? draft?.email ?? '');
  const [table, setTable] = useState(
    (initial?.tableNumber ?? draft?.tableNumber ?? tableNumber ?? 1)
  );
  const [reviewed, setReviewed] = useState(Boolean(draft?.reviewed));

  // Persist draft on changes
  useEffect(() => {
    const payload = { name, phone, email, tableNumber: Number(table), reviewed };
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(payload)); } catch {}
  }, [name, phone, email, table, reviewed]);

  const validPhone = (value) => /^\+?[\d\s\-()]{7,}$/.test(value);

  const validateAndGet = () => {
    const t = Number(table);
    const errors = [];
   if (!name.trim() || !validPhone(phone)) errors.push('Name and valid phone number are required');
   if (!Number.isFinite(t) || t < 1 || t > 12) errors.push('Select a table (1–12).');

    if (errors.length) {
      return { ok: false, message: errors.join('\n') };
    }
    return {
      ok: true,
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        tableNumber: t
      }
    };
  };

  useImperativeHandle(ref, () => ({
    validateAndGet
  }));

  // Notify parent about validity so it can enable/disable the submit button
  useEffect(() => {
    onValidityChange?.(validateAndGet().ok);
  }, [name, phone, email, table]);

  // Local helper: animated toast content using your existing toast API
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

  const handleReview = (e) => {
    e.preventDefault();
    const res = validateAndGet();
    if (!res.ok) {
      // Animated toast with line breaks for multiple errors
      showAnimatedToast(res.message, 'error', 5000);
      return;
    }
    onSubmit?.(res.data);
    setReviewed(true);
    toast('Order reviewed', 'success', 1800);

    // Redirect to cart only once per session
    const redirected = sessionStorage.getItem(REDIRECT_ONCE_KEY) === '1';
    if (!redirected) {
      try { sessionStorage.setItem(REDIRECT_ONCE_KEY, '1'); } catch {}
      navigate(`/cart?table=${res.data.tableNumber}`);
    }
  };

  // If user changes any field after review, reset the reviewed state
  const onChangeReset = (setter) => (e) => {
    setter(e.target.value);
    if (reviewed) setReviewed(false);
  };

  const reviewLabel = useMemo(
    () => (reviewed ? '✓ Order reviewed' : 'Review Order'),
    [reviewed]
  );

  const reviewBtnClass = reviewed
    ? 'w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white'
    : undefined;

  return (
    <form
      className="grid gap-3 p-4 border border-slate-200 rounded-2xl bg-white shadow-sm"
      onSubmit={handleReview}
      noValidate
    >
      <div className="grid gap-1">
        <label className="text-sm text-slate-600">Name</label>
        <input
          className={inputBase}
          value={name}
          onChange={onChangeReset(setName)}
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm text-slate-600">Phone</label>
        <input
          className={inputBase}
          value={phone}
          onChange={onChangeReset(setPhone)}
          placeholder="(555) 012-3456"
          autoComplete="tel"
          inputMode="tel"
          required
        />
      </div>

      {/* <div className="grid gap-1">
        <label className="text-sm text-slate-600">Email (optional)</label>
        <input
          className={inputBase}
          type="email"
          value={email}
          onChange={onChangeReset(setEmail)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div> */}

      <div className="grid gap-1">
        <label className="text-sm text-slate-600">Table Number</label>
        <select
          className={inputBase}
          value={table}
          onChange={(e) => {
            setTable(Number(e.target.value));
            if (reviewed) setReviewed(false);
          }}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              Table {n}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="pt-1" aria-live="polite">
        <Button className={reviewBtnClass}>{reviewLabel}</Button>
      </div> */}
    </form>
  );
}

const CustomerForm = forwardRef(CustomerFormInner);
export default CustomerForm;