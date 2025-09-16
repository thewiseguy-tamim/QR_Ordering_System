import { APP } from '../config';

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: APP.CURRENCY }).format(amount);
}

export function calculateItemUnitPrice(basePrice, selectedOptions = []) {
  const optionsTotal = selectedOptions.reduce((sum, o) => sum + (o.price || 0), 0);
  return +(basePrice + optionsTotal).toFixed(2);
}

export function calculateCartTotals(items) {
  const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0);
  const tax = +(subtotal * APP.TAX_RATE).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);
  return { subtotal, tax, total };
}