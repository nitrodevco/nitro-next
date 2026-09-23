import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

/** The far edges of a container's visible children, in its own space; `null` while it has none. */
export interface ChildBounds {
    right: number;
    bottom: number;
}

/**
 * A layer the port adds to fill its container - a `BackgroundLayer`, or the rectangle a clipping
 * `Box` masks itself with. Flash draws those as the container's own skin, not as children, so
 * they take no part in its bounds (and, being the container's size, would keep it from shrinking).
 */
const isFillLayer = (child: PixiContainer, node: PixiContainer): boolean => {
    if (child === node.mask) return true;

    const style = child.layout?.style;

    return (style?.position === 'absolute') && (style.width === '100%') && (style.height === '100%');
};

const readChildBounds = (node: PixiContainer): ChildBounds | null => {
    let right = Number.MIN_SAFE_INTEGER;
    let bottom = Number.MIN_SAFE_INTEGER;
    let found = false;

    for (const child of node.children) {
        const computed = child.layout?.computedLayout;

        if (!child.visible || !computed || isFillLayer(child, node)) continue;

        right = Math.max(right, computed.left + computed.width);
        bottom = Math.max(bottom, computed.top + computed.height);
        found = true;
    }

    return found ? { right, bottom } : null;
};

/**
 * `WindowController.resizeToAccommodateChildren` as a measurement: the largest `x + width` and
 * `y + height` over the container's visible children - the size `FrameController.resizeToFitContent`
 * gives the frame's content. It follows the children as Yoga lays them out: each one's `layout`
 * event (a text that wraps to another line, an item list that grows), and every child added or
 * removed, re-reads the edges. Like Flash's, it only looks at the direct children, and a
 * container with none visible reports `null` (Flash leaves its size alone then).
 */
export const useChildBounds = (node: PixiContainer | null): ChildBounds | null => {
    const [ bounds, setBounds ] = useState<ChildBounds | null>(null);

    useEffect(() => {
        if (!node) return;

        const watched = new Set<PixiContainer>();

        const update = () => {
            const next = readChildBounds(node);

            setBounds(prev => ((prev?.right === next?.right) && (prev?.bottom === next?.bottom) ? prev : next));
        };

        const watch = (child: PixiContainer) => {
            if (watched.has(child)) return;

            watched.add(child);
            child.on('layout', update);
            child.on('visibleChanged', update);
        };

        const unwatch = (child: PixiContainer) => {
            if (!watched.delete(child)) return;

            child.off('layout', update);
            child.off('visibleChanged', update);
        };

        const onChildAdded = (child: PixiContainer) => {
            watch(child);
            update();
        };

        const onChildRemoved = (child: PixiContainer) => {
            unwatch(child);
            update();
        };

        for (const child of node.children) watch(child);

        node.on('layout', update);
        node.on('childAdded', onChildAdded);
        node.on('childRemoved', onChildRemoved);
        update();

        return () => {
            node.off('layout', update);
            node.off('childAdded', onChildAdded);
            node.off('childRemoved', onChildRemoved);

            for (const child of [ ...watched ]) unwatch(child);
        };
    }, [ node ]);

    return bounds;
};
