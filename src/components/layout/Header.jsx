import { Link, useLocation } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useTableNumber from '../../hooks/useTableNumber';
import { APP } from '../../config';
import cartIcon from '../../assets/cart.png';

export default function Header() {
  const { totals } = useCart();
  const { tableNumber } = useTableNumber();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center bg-white border-b border-gray-200 px-3 py-2">
      <div className="flex items-center gap-2">
        <Link to="/menu" className="font-extrabold tracking-tight text-2xl">{APP.RESTAURANT_NAME}</Link>
        {/* <span className="ml-1 text-gray-500 text-xs sm:text-sm">
          {tableNumber ? `Table ${tableNumber}` : 'No table'}
        </span> */}
      </div>
      {/* <div className="flex items-center">
        {location.pathname !== '/cart' && (
          <Link to="/cart" aria-label="Cart" className="relative text-2xl">
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            {totals.count > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white rounded-full px-1.5 text-xs">
                {totals.count}
              </span>
            )}
          </Link>
        )}
      </div> */}
    </header>
  );
}
