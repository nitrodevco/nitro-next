import { useSyncExternalStore } from 'react';

const TICK_MS = 1000;

/** The clock React reads, updated once a second so the render itself never asks the time. */
let now = performance.now();
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

const subscribe = (onChange: () => void) => {
    listeners.add(onChange);

    if (!timer) {
        timer = setInterval(() => {
            now = performance.now();

            for (const listener of listeners) listener();
        }, TICK_MS);
    }

    return () => {
        listeners.delete(onChange);

        if (!listeners.size && timer) {
            clearInterval(timer);
            timer = undefined;
        }
    };
};

/**
 * `performance.now()` for countdowns, refreshed every second: reading the time during render is
 * impure, so a component that counts down reads it through this instead.
 */
export const useSecondsClock = () => useSyncExternalStore(subscribe, () => now);
