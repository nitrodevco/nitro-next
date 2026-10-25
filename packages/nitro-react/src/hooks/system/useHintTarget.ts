import { Container as PixiContainer } from 'pixi.js';
import { useCallback, useEffect } from 'react';

import { HINT_STYLE_VERTICAL, useHintActions } from '#base/context/hints';

/**
 * `registerHintWindow(key, window, style)` for as long as the calling view lives, and
 * `unregisterHintWindow(key)` when it goes - what Flash's views do as they build and dispose their
 * windows. `enabled` false leaves the key unregistered. The returned ref is the element's: put it on
 * the element itself, or on a pointer-transparent box filling it, and the arrow points at it.
 */
export const useHintTarget = (key: string, enabled: boolean = true, style: number = HINT_STYLE_VERTICAL) => {
    const { registerHintWindow, unregisterHintWindow, setHintWindowNode } = useHintActions();

    useEffect(() => {
        if (!enabled) return;

        registerHintWindow(key, style);

        return () => unregisterHintWindow(key);
    }, [ key, enabled, style, registerHintWindow, unregisterHintWindow ]);

    return useCallback((node: PixiContainer | null) => setHintWindowNode(key, node), [ key, setHintWindowNode ]);
};
