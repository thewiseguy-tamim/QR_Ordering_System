import { useEffect, useRef, useState } from 'react';

export default function useFlash(value, duration = 800) {
  const prev = useRef(value);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setActive(true);
      const t = setTimeout(() => setActive(false), duration);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value, duration]);

  return active;
}