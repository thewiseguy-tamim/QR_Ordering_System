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

  const tabBase = "min-h-11 px-3 py-2 rounded-full border border-gray-200 bg-white whitespace-nowrap inline-flex items-center gap-1";
  const active = "bg-amber-100 border-amber-300";

  return (
    <div className="flex gap-2 overflow-x-auto px-3 py-2" role="tablist" aria-label="Categories">
      <button
        className={`${tabBase} ${selectedCategory === null ? active : ''}`}
        onClick={() => setSelectedCategory(null)}
        role="tab"
        aria-selected={selectedCategory === null}
      >
        🌟 All <span className="text-xs bg-gray-100 rounded-full px-2 py-0.5">{counts.all}</span>
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
            <span>{cat.icon}</span>
            {cat.name}
            <span className="text-xs bg-gray-100 rounded-full px-2 py-0.5">{counts.byCat[cat.id] || 0}</span>
          </button>
        ))}
    </div>
  );
}