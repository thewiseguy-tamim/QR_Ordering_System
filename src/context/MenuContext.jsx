import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, menuItems } from '../data/menuData';

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [params, setParams] = useSearchParams();

  const initialCat = params.get('cat');
  const initialView = params.get('view');
  const initialHide = params.get('hide') === '1';

  const [selectedCategory, _setSelectedCategory] = useState(initialCat ? Number(initialCat) : null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewModeState] = useState(initialView === 'list' ? 'list' : 'grid');
  const [hideUnavailable, setHideUnavailableState] = useState(initialHide);

  useEffect(() => {
    const cat = params.get('cat');
    _setSelectedCategory(cat ? Number(cat) : null);
  }, [params]);

  const setSelectedCategory = useCallback((catId) => {
    _setSelectedCategory(catId);
    const next = new URLSearchParams(params);
    if (catId == null) next.delete('cat'); else next.set('cat', String(catId));
    setParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params, setParams]);

  const setViewMode = useCallback((v) => {
    setViewModeState(v);
    const next = new URLSearchParams(params);
    if (v === 'list') next.set('view', 'list'); else next.delete('view');
    setParams(next, { replace: true });
  }, [params, setParams]);

  const setHideUnavailable = useCallback((val) => {
    setHideUnavailableState(val);
    const next = new URLSearchParams(params);
    if (val) next.set('hide', '1'); else next.delete('hide');
    setParams(next, { replace: true });
  }, [params, setParams]);

  const value = useMemo(() => ({
    categories,
    menuItems,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    hideUnavailable,
    setHideUnavailable
  }), [selectedCategory, searchQuery, viewMode, hideUnavailable, setSelectedCategory, setViewMode, setHideUnavailable]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMenu = () => useContext(MenuContext);