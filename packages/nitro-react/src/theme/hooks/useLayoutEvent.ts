import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

export interface LayoutSize {
    width: number;
    height: number;
}

const readSize = (node: PixiContainer | null): LayoutSize => {
    const computed = node?.layout?.computedLayout;

    return {
        width: computed?.width ?? node?.width ?? 0,
        height: computed?.height ?? node?.height ?? 0,
    };
};

/**
 * Runs `handler` whenever Yoga assigns `node` a new computed layout. @pixi/layout emits a
 * `layout` event on the container each time that happens, which makes this the Pixi
 * counterpart of a `ResizeObserver` - and the replacement for the per-frame
 * `requestAnimationFrame` polling of `.layout.computedLayout` the theme used before, which
 * cost a callback per subscriber per frame whether anything had changed or not.
 *
 * The handler also runs once on subscribe when the node already has a layout (a node that
 * was laid out before the effect attached would otherwise never report).
 */
export const useLayoutEvent = (node: PixiContainer | null, handler: () => void): void => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        if (!node) return;

        const listener = () => handlerRef.current();

        node.on('layout', listener);

        if (node.layout?.computedLayout) listener();

        return () => {
            node.off('layout', listener);
        };
    }, [ node ]);
};

/** The node's Yoga-computed size as state, updated only when it actually changes. */
export const useLayoutSize = (node: PixiContainer | null): LayoutSize => {
    const [ size, setSize ] = useState<LayoutSize>(() => readSize(node));

    useLayoutEvent(node, () => {
        const next = readSize(node);

        setSize(prev => ((Math.abs(prev.width - next.width) > 0.5 || Math.abs(prev.height - next.height) > 0.5) ? next : prev));
    });

    return size;
};
