import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { getItem, setItem } from '../utils/localStorage';
import { calculateItemUnitPrice } from '../utils/priceCalculations';
import { APP } from '../config';

const CartContext = createContext();
const STORAGE_KEY = 'qr_cart_v1';

const initialState = { items: [] };

function sameOptions(a = [], b = []) {
  const sortFn = (x, y) => (x.type + x.choice).localeCompare(y.type + y.choice);
  const A = [...a].sort(sortFn);
  const B = [...b].sort(sortFn);
  return JSON.stringify(A) === JSON.stringify(B);
}

function reducer(state, action) {
  switch (action.type) {
    case 'RESTORE_CART':
      return action.payload || initialState;
    case 'ADD_ITEM': {
      const { menuItem, quantity, selectedOptions = [], specialInstructions = '' } = action.payload;
      const unitPrice = calculateItemUnitPrice(menuItem.price, selectedOptions);
      const idx = state.items.findIndex(
        i => i.menuItemId === menuItem.id &&
             sameOptions(i.selectedOptions, selectedOptions) &&
             (i.specialInstructions || '') === (specialInstructions || '')
      );
      if (idx !== -1) {
        const items = state.items.map((it, k) =>
          k === idx ? { ...it, quantity: it.quantity + quantity, totalPrice: (it.quantity + quantity) * unitPrice } : it
        );
        return { ...state, items };
      }
      const id = `${menuItem.id}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
      const newItem = {
        id,
        menuItemId: menuItem.id,
        name: menuItem.name,
        basePrice: menuItem.price,
        quantity,
        selectedOptions,
        totalPrice: quantity * unitPrice,
        specialInstructions
      };
      return { ...state, items: [...state.items, newItem] };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const items = state.items
        .map(item => {
          if (item.id !== id) return item;
          const unitPrice = calculateItemUnitPrice(item.basePrice, item.selectedOptions);
          return { ...item, quantity, totalPrice: quantity * unitPrice };
        })
        .filter(i => i.quantity > 0);
      return { ...state, items };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    case 'SET_INSTRUCTIONS':
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, specialInstructions: action.payload.specialInstructions } : i) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = getItem(STORAGE_KEY, initialState);
    dispatch({ type: 'RESTORE_CART', payload: saved });
  }, []);

  useEffect(() => {
    setItem(STORAGE_KEY, state);
  }, [state]);

  const totals = useMemo(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
    const tax = +(subtotal * APP.TAX_RATE).toFixed(2);
    const total = +(subtotal + tax).toFixed(2);
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
    return { subtotal, tax, total, count };
  }, [state.items]);

  const value = {
    items: state.items,
    totals,
    addItem: (payload) => dispatch({ type: 'ADD_ITEM', payload }),
    updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
    setInstructions: (id, specialInstructions) => dispatch({ type: 'SET_INSTRUCTIONS', payload: { id, specialInstructions } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' })
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => useContext(CartContext);