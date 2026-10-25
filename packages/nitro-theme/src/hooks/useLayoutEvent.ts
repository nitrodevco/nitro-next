import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

import { useLatest } from './useLatest';

export interface LayoutSize {
    width: number;
    height: number;
}

const readSize = (node: PixiContainer | null): LayoutSize => {
    // A destroyed node's `scale` is null, so its `width`/`height` getters would throw.
    if (!node || node.destroyed) return { width: 0, height: 0 };

    const computed = node?.layout?.computedLayout;

    return {
        width: computed?.width ?? node?.width ?? 0,
        height: computed?.height ?? node?.height ?? 0,
    };
};

/**
 * Runs `handler` whenever `node` is given a new size. @pixi/layout emits a `layout` event on the
 * container each time Yoga assigns it a computed layout, which makes this the counterpart of a
 * `ResizeObserver` - and the replacement for the per-frame `requestAnimationFrame` polling of
 * `.layout.computedLayout` the theme used before, which cost a callback per subscriber per frame
 * whether anything had changed or not.
 *
 * The handler also runs once on subscribe when the node already has a layout (a node that
 * was laid out before the effect attached would otherwise never report).
 */
export const useLayoutEvent = (node: PixiContainer | null, handler: () => void): void => {
    const handlerRef = useLatest(handler);

    useEffect(() => {
        if (!node || node.destroyed) return;

        const listener = () => handlerRef.current();

        node.on('layout', listener);

        if (node.layout?.computedLayout) listener();

        return () => {
            node.off('layout', listener);
        };
    }, [ node ]);
};

/** The node's laid-out size as state, updated only when it actually changes. */
export const useLayoutSize = (node: PixiContainer | null): LayoutSize => {
    const [ size, setSize ] = useState<LayoutSize>(() => readSize(node));

    useLayoutEvent(node, () => {
        const next = readSize(node);

        setSize(prev => ((Math.abs(prev.width - next.width) > 0.5 || Math.abs(prev.height - next.height) > 0.5) ? next : prev));
    });

    return size;
};
