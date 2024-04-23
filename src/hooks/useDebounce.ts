'use client';

import { useEffect, useState } from 'react';

const useDebounce = <T = unknown>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
