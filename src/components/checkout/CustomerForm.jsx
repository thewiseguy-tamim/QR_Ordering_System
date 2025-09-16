import { useState, useEffect } from 'react';
import useTableNumber from '../../hooks/useTableNumber';

export default function CustomerForm({ onSubmit, initial }) {
  const [name, setName] = useState(initial?.name || '');
  const [phone, setPhone] = useState(initial?.phone || '');
  const [email, setEmail] = useState(initial?.email || '');
  const { tableNumber, setTable } = useTableNumber();
  const [table, setTableInput] = useState(tableNumber || '');

  useEffect(() => {
    if (tableNumber && !table) setTableInput(tableNumber);
  }, [tableNumber, table]);

  const validPhone = (value) => /^\+?[\d\s\-()]{7,}$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!validPhone(phone)) errors.phone = 'Valid phone required';
    if (!String(table).trim() || isNaN(Number(table))) errors.table = 'Valid table required';
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join('\n'));
      return;
    }
    setTable(table);
    onSubmit({ name: name.trim(), phone: phone.trim(), email: email.trim(), tableNumber: Number(table) });
  };

  const input = "rounded-xl border-gray-200 focus:border-brand focus:ring-brand";

  return (
    <form className="grid gap-3 p-3 border border-gray-200 rounded-2xl bg-white" onSubmit={handleSubmit} noValidate>
      <label className="grid gap-1 text-sm">
        Name
        <input className={input} value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label className="grid gap-1 text-sm">
        Phone
        <input className={input} value={phone} onChange={e => setPhone(e.target.value)} required placeholder="(555) 012-3456" />
      </label>
      <label className="grid gap-1 text-sm">
        Email (optional)
        <input className={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
      </label>
      <label className="grid gap-1 text-sm">
        Table Number
        <input className={input} value={table} onChange={e => setTableInput(e.target.value)} inputMode="numeric" />
      </label>
      <button className="mt-1 w-full px-4 py-3 rounded-xl bg-brand text-black bg-blue-200 font-semibold shadow active:scale-[0.98] transition-transform" type="submit">Review Order</button>
    </form>
  );
}