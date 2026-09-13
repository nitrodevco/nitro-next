import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

export interface LayoutSize {
    width: number;
    height: number;
}

/**
 * In the DOM render mode every dual-target component redirects its `Ref<Container>` at the
 * real `HTMLElement` it rendered (see `Box.tsx`'s `BoxDom`), so a "container" handed to these
 * hooks may be a DOM node at runtime. It has no `layout`/`on` - it gets a `ResizeObserver`.
 */
const asDomNode = (node: PixiContainer | null): HTMLElement | null =>
    ((typeof HTMLElement !== 'undefined') && (node instanceof HTMLElement)) ? node : null;

const readSize = (node: PixiContainer | null): LayoutSize => {
    const domNode = asDomNode(node);

    if (domNode) return { width: domNode.clientWidth, height: domNode.clientHeight };

    const computed = node?.layout?.computedLayout;

    return {
        width: computed?.width ?? node?.width ?? 0,
        height: computed?.height ?? node?.height ?? 0,
    };
};

/**
 * Runs `handler` whenever `node` is given a new size. On the Pixi target @pixi/layout emits a
 * `layout` event on the container each time Yoga assigns it a computed layout, which makes
 * this the Pixi counterpart of a `ResizeObserver` - and the replacement for the per-frame
 * `requestAnimationFrame` polling of `.layout.computedLayout` the theme used before, which
 * cost a callback per subscriber per frame whether anything had changed or not. On the DOM
 * target the node is a real element and an actual `ResizeObserver` does the same job.
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
        const domNode = asDomNode(node);

        if (domNode) {
            if (typeof ResizeObserver === 'undefined') {
                listener();

                return;
            }

            const observer = new ResizeObserver(listener);

            observer.observe(domNode);
            listener();

            return () => observer.disconnect();
        }

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
