import { useEffect, useState } from 'react';

export function useDebounce<T>(kw: T, delay: number): T {
  const [debouncedKw, setDebouncedKw] = useState(kw);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKw(kw);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [kw, delay]);
  return debouncedKw;
}
