export default function QuantitySelector({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button className="w-11 h-11 rounded-lg border border-gray-200" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
      <span>{value}</span>
      <button className="w-11 h-11 rounded-lg border border-gray-200" onClick={() => onChange(value + 1)} aria-label="Increase quantity">+</button>
    </div>
  );
}