import { useEffect, useState } from "react";

export function useDelayedValue<T>(
  value: T,
  delay: number,
  condition?: (value: T) => boolean
): T {
  const [delayedValue, setDelayedValue] = useState<T>(value);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (condition === undefined || condition(value)) {
      timeoutId = setTimeout(() => {
        setDelayedValue(value);
      }, delay);
    } else {
      setDelayedValue(value);
    }
    return () => timeoutId && clearTimeout(timeoutId);
  }, [value, condition, delay]);

  return delayedValue;
}
