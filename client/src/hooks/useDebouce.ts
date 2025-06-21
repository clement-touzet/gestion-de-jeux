import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [deboucedValue, setDeboucedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDeboucedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return deboucedValue;
};
