import { useEffect, useMemo, useRef, useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import { formatCurrency } from '../../utils/priceCalculations';
import Button from '../common/Button';

export default function SpecialsCarousel() {
  const { menuItems } = useMenu();
  const { addItem } = useCart();
  const toast = useToast();

  const specials = useMemo(() => {
    const popular = menuItems.filter(i => (i.tags || []).includes('popular') && i.available);
    const list = popular.length > 0 ? popular : menuItems.slice(0, 5);
    return list.slice(0, 5);
  }, [menuItems]);

  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % specials.length), 3500);
    return () => clearInterval(timerRef.current);
  }, [specials.length]);

  if (specials.length === 0) return null;
  const current = specials[idx];

  const handleOrder = () => {
    const sizeOpt = current.options?.find(o => o.type === 'size' && o.required);
    const defaultSize = sizeOpt?.choices?.[0];
    const selectedOptions = defaultSize ? [{ type: 'size', choice: defaultSize.name, price: defaultSize.price || 0 }] : [];
    addItem({ menuItem: current, quantity: 1, selectedOptions, specialInstructions: '' });
    if (navigator.vibrate) navigator.vibrate(10);
    toast(`Added ${current.name}`, 'success');
  };

  return (
    <section className="px-4 pt-8 pb-3">
      <div className="relative rounded-3xl overflow-hidden shadow-md">
        <img
          src={current.image}
          alt={current.name}
          className="w-full aspect-[16/9] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute left-4 right-4 bottom-4 text-white">
          <h3 className="text-lg font-semibold drop-shadow-sm">{current.name}</h3>
          <p className="text-sm opacity-90">{current.description}</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm bg-white/20 backdrop-blur px-2 py-1 rounded-lg">
              From {formatCurrency(current.price)}
            </span>
            <Button className="w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl" onClick={handleOrder}>
              Order Now
            </Button>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute left-0 right-0 -bottom-2 flex justify-center gap-2">
          {specials.map((_, i) => (
            <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === idx ? 'bg-blue-600' : 'bg-slate-300'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}