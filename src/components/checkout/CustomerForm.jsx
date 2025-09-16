import { useState, useEffect } from "react";
import useTableNumber from "../../hooks/useTableNumber";

export default function CustomerForm({ onSubmit, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [email, setEmail] = useState(initial?.email || "");
  const { tableNumber, setTable } = useTableNumber();
  const [table, setTableInput] = useState(tableNumber || "");
  const [errors, setErrors] = useState({});

  // ✅ Validation Functions
  const validBDPhone = (value) => /^01[3-9]\d{8}$/.test(value);
  const validEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";

    if (!validBDPhone(phone))
      newErrors.phone = "Enter a valid Bangladeshi phone (e.g. 01712345678)";

    if (email.trim() && !validEmail(email))
      newErrors.email = "Enter a valid email";

    if (!String(table).trim() || isNaN(Number(table)))
      newErrors.table = "Valid table number required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setTable(table);
      onSubmit({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        tableNumber: Number(table),
      });
    }
  };

  const baseInput =
    "rounded-xl border border-gray-200 px-3 py-2 focus:border-brand focus:ring-2 focus:ring-brand transition w-full";

  return (
    <form
      className="grid gap-5 p-4 border border-gray-200 rounded-2xl bg-white shadow-sm"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Section: Customer Info */}
      <div className="grid gap-3">
        <h2 className="text-base font-semibold text-gray-700">Customer Info</h2>

        {/* Name */}
        <div>
          <input
            className={`${baseInput} ${errors.name ? "border-red-400" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Bangladeshi Phone */}
        <div>
          <input
            className={`${baseInput} ${errors.phone ? "border-red-400" : ""}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 01712345678"
            required
            inputMode="numeric"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            className={`${baseInput} ${errors.email ? "border-red-400" : ""}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com (optional)"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Section: Table */}
      <div className="grid gap-2">
        <h2 className="text-base font-semibold text-gray-700">Dining Info</h2>
        <div>
          <input
            className={`${baseInput} ${errors.table ? "border-red-400" : ""}`}
            value={table}
            onChange={(e) => setTableInput(e.target.value)}
            inputMode="numeric"
            placeholder="Table Number"
          />
          {errors.table && (
            <p className="text-xs text-red-500 mt-1">{errors.table}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        className="mt-2 w-full px-4 py-3 rounded-xl bg-blue-200 text-black font-semibold shadow-lg active:scale-[0.98] hover:bg-blue-300 transition-all"
        type="submit"
      >
        Review Order
      </button>
    </form>
  );
}