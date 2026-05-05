import { useEffect } from "react";

interface ClickOutsideHandler {
    (event: MouseEvent | TouchEvent): void;
}

interface RefObject<T> {
    current: T | null;
}

export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T>,
    handler: ClickOutsideHandler
): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // If clicking inside the element, do nothing
            if (!ref.current || !event.target || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener); // mouse click
        document.addEventListener("touchstart", listener); // touch devices

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}