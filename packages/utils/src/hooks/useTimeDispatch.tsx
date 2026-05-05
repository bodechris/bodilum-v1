import { useEffect, useRef } from "react";

type IntervalUnit = "second" | "minute";

type UseTimeDispatchOptions = {
  unit?: IntervalUnit;
  onTick: (date: Date) => void;
  immediate?: boolean;
};

export function useTimeDispatch({
  unit = "second",
  onTick,
  immediate = false,
}: UseTimeDispatchOptions) {
  const callbackRef = useRef(onTick);

  useEffect(() => {
    callbackRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (immediate) {
      callbackRef.current(new Date());
    }

    const delay = unit === "minute" ? 60_000 : 1_000;

    const id = window.setInterval(() => {
      callbackRef.current(new Date());
    }, delay);

    return () => {
      window.clearInterval(id);
    };
  }, [unit, immediate]);
}