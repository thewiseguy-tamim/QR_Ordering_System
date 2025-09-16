import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const KEY = 'qr_table_number';

export default function useTableNumber() {
  const [params, setParams] = useSearchParams();

  const tableFromUrl = params.get('table');
  let tableFromStorage = null;
  try {
    tableFromStorage = localStorage.getItem(KEY);
  } catch {
    /* ignore */
  }

  useEffect(() => {
    if (tableFromUrl) {
      try { localStorage.setItem(KEY, tableFromUrl); } catch { /* ignore */ }
    }
  }, [tableFromUrl]);

  const table = tableFromUrl || tableFromStorage || null;

  const setTable = (t) => {
    try { localStorage.setItem(KEY, String(t)); } catch { /* ignore */ }
    const next = new URLSearchParams(params);
    next.set('table', String(t));
    setParams(next, { replace: true });
  };

  return { tableNumber: table ? Number(table) : null, setTable };
}