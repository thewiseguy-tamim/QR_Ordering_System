import { useMemo } from 'react';
import FoodItem from './FoodItem';
import { useMenu } from '../../context/MenuContext';

export default function MenuGrid() {
  const { menuItems, selectedCategory, searchQuery, viewMode, hideUnavailable } = useMenu();

  const filtered = useMemo(() => {
    const byCat = selectedCategory ? menuItems.filter(i => i.category === selectedCategory) : menuItems;
    const byAvail = hideUnavailable ? byCat.filter(i => i.available) : byCat;
    const bySearch = !searchQuery ? byAvail : byAvail.filter(item => {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) ||
             item.description.toLowerCase().includes(q) ||
             (item.tags || []).some(t => t.toLowerCase().includes(q));
    });
    return bySearch.sort((a, b) => (a.available === b.available) ? 0 : a.available ? -1 : 1);
  }, [menuItems, selectedCategory, hideUnavailable, searchQuery]);

  const gridClasses =
    viewMode === 'list'
      ? 'grid grid-cols-1 auto-rows-fr items-stretch gap-3 px-3'
      : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr items-stretch gap-3 px-3';

  return (
    <div className={gridClasses}>
      {filtered.map(item => (
        <FoodItem key={item.id} item={item} />
      ))}
      {filtered.length === 0 && <p className="p-4">No items found.</p>}
    </div>
  );
}