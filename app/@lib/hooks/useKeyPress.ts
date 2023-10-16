import { useCallback, useEffect } from "react";

export const useKeyPress = (callbackFn: Function, keys?: string[]) => {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (!(keys && !keys.includes(e.key))) {
        callbackFn(e.key);
      }
    },
    [callbackFn, keys]
  );

  useEffect(() => {
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [handler]);
};
