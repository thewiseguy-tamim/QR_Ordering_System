import { useMemo } from 'react';
import { useMenu } from '../../context/MenuContext';

export default function CategoryFilter() {
  const { categories, menuItems, selectedCategory, setSelectedCategory, hideUnavailable } = useMenu();

  const counts = useMemo(() => {
    const base = hideUnavailable ? menuItems.filter(i => i.available) : menuItems;
    const byCat = categories.reduce((acc, c) => {
      acc[c.id] = base.filter(i => i.category === c.id).length;
      return acc;
    }, {});
    return { all: base.length, byCat };
  }, [menuItems, categories, hideUnavailable]);

  // Keep size: min-h-11 px-3 py-2 and inline chip layout
  const tabBase =
    "min-h-11 px-3 py-2 rounded-full border border-gray-200 bg-white whitespace-nowrap " +
    "inline-flex items-center gap-2 hover:bg-gray-50 transition";
  const active = "bg-amber-100/60 border-amber-300";

  const avatar =
    "h-8 w-8 rounded-full bg-white ring-1 ring-gray-200 shadow-sm " +
    "flex items-center justify-center overflow-hidden";

  return (
    <div
      className="no-scrollbar flex gap-2 overflow-x-auto px-3 py-2"
      role="tablist"
      aria-label="Categories"
    >
      <button
        className={`${tabBase} ${selectedCategory === null ? active : ''}`}
        onClick={() => setSelectedCategory(null)}
        role="tab"
        aria-selected={selectedCategory === null}
      >
        <span className={avatar}>
          <span className="text-lg leading-none">🌟</span>
        </span>
        <span className="text-sm font-medium">All</span>
        {/* Show count only on >= sm to avoid extra width on mobile */}
        <span className="hidden sm:inline-flex text-xs bg-gray-100 rounded-full px-2 py-0.5">
          {counts.all}
        </span>
      </button>

      {categories
        .sort((a, b) => a.order - b.order)
        .map(cat => (
          <button
            key={cat.id}
            className={`${tabBase} ${selectedCategory === cat.id ? active : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
            role="tab"
            aria-selected={selectedCategory === cat.id}
          >
            <span className={avatar}>
              {typeof cat.icon === 'string'
                ? <span className="text-lg leading-none">{cat.icon}</span>
                : cat.icon}
            </span>
            <span className="text-sm font-medium">{cat.name}</span>
            {/* Keep counts without widening mobile */}
            <span className="hidden sm:inline-flex text-xs bg-gray-100 rounded-full px-2 py-0.5">
              {counts.byCat[cat.id] || 0}
            </span>
          </button>
        ))}
    </div>
  );
}