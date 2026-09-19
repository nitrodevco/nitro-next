import { useSyncExternalStore } from 'react';

export interface ViewportSize {
    width: number;
    height: number;
}

/** One object per size, so a render that reads it sees the same reference until the window resizes. */
let size: ViewportSize = { width: window.innerWidth, height: window.innerHeight };
const listeners = new Set<() => void>();

const onResize = () => {
    if ((size.width === window.innerWidth) && (size.height === window.innerHeight)) return;

    size = { width: window.innerWidth, height: window.innerHeight };

    for (const listener of listeners) listener();
};

const subscribe = (onChange: () => void) => {
    listeners.add(onChange);

    if (listeners.size === 1) window.addEventListener('resize', onResize);

    return () => {
        listeners.delete(onChange);

        if (!listeners.size) window.removeEventListener('resize', onResize);
    };
};

/**
 * The window's size, for layout that depends on it - what Flash read off `desktop.width` and
 * `desktop.height`. Reading `window.innerWidth` during render is impure; this is the same value
 * behind a subscription, so a component re-renders on resize and nowhere else.
 */
export const useViewportSize = () => useSyncExternalStore(subscribe, () => size);
