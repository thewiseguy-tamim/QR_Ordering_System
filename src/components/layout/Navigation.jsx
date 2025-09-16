import { NavLink } from 'react-router-dom';
import useCart from '../../hooks/useCart';

function IconHome({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className={active ? 'text-blue-600' : 'text-slate-500'}>
      <path fill="currentColor" d="M12 3l9 7h-3v8a1 1 0 0 1-1 1h-4v-5H11v5H7a1 1 0 0 1-1-1v-8H3l9-7z"/>
    </svg>
  );
}
function IconCart({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className={active ? 'text-blue-600' : 'text-slate-500'}>
      <path fill="currentColor" d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 18zM7.334 6l.84 4H18a1 1 0 0 1 .98 1.197l-1 5A1 1 0 0 1 17 17H9a1 1 0 0 1-.98-.803L6.2 6H4a1 1 0 1 1 0-2h3a1 1 0 0 1 .99.84z"/>
    </svg>
  );
}
function IconCheck({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className={active ? 'text-blue-600' : 'text-slate-500'}>
      <path fill="currentColor" d="M9 16.2l-3.5-3.6L4 14l5 5 11-11-1.5-1.5z"/>
    </svg>
  );
}

function NavItem({ to, label, icon: Icon, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'relative flex flex-col items-center justify-center gap-1',
          'w-24 h-14 rounded-2xl transition-colors',
          isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
        ].join(' ')
      }
      aria-label={label}
    >
      {({ isActive }) => (
        <>
          <Icon active={isActive} />
          <span className="text-[11px] font-medium">{label}</span>
          {badge > 0 && label === 'Cart' && (
            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Navigation() {
  const { totals } = useCart();

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[min(92%,560px)]">
      <div className="flex justify-around px-2 py-2 rounded-[20px] border border-slate-200 bg-white/90 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <NavItem to="/menu" label="Menu" icon={IconHome} />
        <NavItem to="/cart" label="Cart" icon={IconCart} badge={totals.count} />
        <NavItem to="/checkout" label="Checkout" icon={IconCheck} />
      </div>
    </nav>
  );
}