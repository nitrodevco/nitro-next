/**
 * The window's size in stage pixels, for layout that depends on it - what Flash read off
 * `desktop.width` and `desktop.height` (`GetDesktopSize`). Reading it during render is impure: the
 * React Compiler caches a `GetDesktopSize()` call in a render body as it would any call whose
 * arguments do not change, so the component keeps the size it first rendered at. This is the same
 * value behind a subscription, so a component re-renders when the stage is resized and nowhere
 * else. The stage, not the window: it follows the window a moment later, in screen pixels.
 */
import { GetRenderer } from '@nitrodevco/nitro-renderer';
import { useSyncExternalStore } from 'react';

import { GetDesktopSize } from '../utils/GetPixelRatio';

export interface ViewportSize {
    width: number;
    height: number;
}

/** One object per size, so a render that reads it sees the same reference until the stage resizes. */
let size: ViewportSize | undefined;
const listeners = new Set<() => void>();

const getSize = (): ViewportSize => (size ??= GetDesktopSize());

const onResize = () => {
    const next = GetDesktopSize();

    if (size && (size.width === next.width) && (size.height === next.height)) return;

    size = next;

    for (const listener of listeners) listener();
};

const subscribe = (onChange: () => void) => {
    listeners.add(onChange);

    // The window's resize too, should this subscribe before the renderer is up.
    if (listeners.size === 1) {
        GetRenderer()?.on('resize', onResize);
        window.addEventListener('resize', onResize);
    }

    return () => {
        listeners.delete(onChange);

        if (listeners.size) return;

        GetRenderer()?.off('resize', onResize);
        window.removeEventListener('resize', onResize);
    };
};

export const useViewportSize = () => useSyncExternalStore(subscribe, getSize);
