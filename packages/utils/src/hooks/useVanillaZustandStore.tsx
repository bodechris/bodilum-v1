import { useSyncExternalStore } from 'react';

interface VanillaStore<T> {
    getState: () => T;
    subscribe: (listener: () => void) => () => void;
}

type Selector<T, U> = (state: T) => U;

export function useVanillaZustandStore<T, U = T>(
    store: VanillaStore<T>,
    selector: Selector<T, U> = (s => s as unknown as U)
): U {
    return useSyncExternalStore(
        store.subscribe,
        () => selector(store.getState()),
        () => selector(store.getState()) // for SSR fallback
    );
}