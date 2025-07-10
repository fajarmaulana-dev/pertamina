/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

/**
 * useDebounce is a React hook that returns a debounced version of a value.
 * It updates the returned value only after a specified delay has passed
 * without any changes to the input value.
 *
 * Useful for delaying expensive operations such as API calls,
 * especially while the user is typing.
 *
 * @param value - The input value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced value.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebounceFunc returns a debounced version of a callback function.
 * The function will only be executed after the specified delay has passed
 * without being called again. This is helpful for limiting function execution
 * in response to frequent user actions like typing or resizing.
 *
 * @param callback - The original function to debounce.
 * @param delay - Delay in milliseconds before the callback is executed.
 * @returns A debounced function that delays execution of the callback.
 *
 * @example
 * const debouncedSearch = useDebounceFunc((q) => fetchResults(q), 300);
 * debouncedSearch('hello'); // Will wait 300ms before calling fetchResults
 */
export function useDebounceFunc<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = (...args: Parameters<T>): void => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return (): void => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}
