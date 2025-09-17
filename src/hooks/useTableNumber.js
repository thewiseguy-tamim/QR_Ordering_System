import { useSearchParams } from 'react-router-dom';

export default function useTableNumber() {
  const [params, setParams] = useSearchParams();

  const tableParam = params.get('table');
  const tableNumber = tableParam ? Number(tableParam) : null;

  const setTable = (t) => {
    const next = new URLSearchParams(params);
    if (t == null) next.delete('table');
    else next.set('table', String(t));
    setParams(next, { replace: true });
  };

  return { tableNumber, setTable };
}