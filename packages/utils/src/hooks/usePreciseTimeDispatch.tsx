import { useEffect, useRef } from "react";

type IntervalUnit = "second" | "minute";

type UsePreciseTimeDispatchOptions = {
  unit?: IntervalUnit;
  onTick: (date: Date) => void;
  immediate?: boolean;
};

export function usePreciseTimeDispatch({
  unit = "second",
  onTick,
  immediate = false,
}: UsePreciseTimeDispatchOptions) {
  const callbackRef = useRef(onTick);

  useEffect(() => {
    callbackRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    let timeoutId: number | null = null;
    let intervalId: number | null = null;

    const intervalMs = unit === "minute" ? 60_000 : 1_000;

    if (immediate) {
      callbackRef.current(new Date());
    }

    const now = Date.now();
    const remainder = now % intervalMs;
    const delay = remainder === 0 ? intervalMs : intervalMs - remainder;

    timeoutId = window.setTimeout(() => {
      callbackRef.current(new Date());

      intervalId = window.setInterval(() => {
        callbackRef.current(new Date());
      }, intervalMs);
    }, delay);

    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, [unit, immediate]);
}