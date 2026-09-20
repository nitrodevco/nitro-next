import { Container as PixiContainer, Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { getRenderMode } from '../utils';

/** Animation frames a container has to stay unchanged, with a size and in place, before it is shown. */
const SETTLE_FRAMES = 2;
/** A container that never stops changing (an animated child) is shown after this many frames regardless. */
const MAX_HIDDEN_FRAMES = 12;

/**
 * What the container currently draws, as a string that changes whenever it does: its bounds, and
 * every visible descendant with the texture it shows - a child that mounts a render late (a
 * scrollbar thumb) or an image whose texture arrives from the loader changes neither the bounds
 * nor the layout.
 */
const describe = (node: PixiContainer): string => {
    const { x, y, width, height } = node.getLocalBounds().rectangle;
    const parts: (string | number)[] = [ x, y, width, height ];

    const walk = (child: PixiContainer) => {
        if (!child.visible) return;

        parts.push((child as PixiContainer & { texture?: Texture }).texture?.uid ?? child.children.length);

        for (const grandChild of child.children) walk(grandChild);
    };

    walk(node);

    return parts.join(',');
};

/**
 * Whether a window-like container is ready to be seen. Yoga lays a container out during the
 * render that first draws it, and what depends on that layout comes one or more renders later:
 * a centering offset set from the layout event, the height of a frame that follows its measured
 * content (the wired setup dialog), a `ScrollArea`'s scrollbar once it knows its content is too
 * tall. Drawn straight away, a window flashes up at the top left corner, or at its place but
 * short and half empty, and then jumps into shape. A Flash window is added to the desktop once it
 * is built, so the container is kept unrendered - `renderable = false`, which unlike `visible`
 * leaves it in the yoga tree and still laid out, and which the event boundary also skips - until
 * it has a size, neither its bounds nor what it draws have changed for a couple of animation
 * frames, and `isPositioned` (read on every check, so it may read refs) agrees that it sits
 * where it goes.
 *
 * The DOM target lays out synchronously; there it is shown at once.
 */
export const useRevealWhenSettled = (node: PixiContainer | HTMLElement | null, isPositioned?: () => boolean): boolean => {
    const [ revealed, setRevealed ] = useState(false);
    const isPositionedRef = useRef(isPositioned);
    const isDom = getRenderMode() === 'dom';

    useEffect(() => {
        isPositionedRef.current = isPositioned;
    });

    useEffect(() => {
        if (revealed || isDom || !(node instanceof PixiContainer)) return;

        let previous = '';
        let quietFrames = 0;
        let frames = 0;
        let handle = 0;

        const check = () => {
            if (node.destroyed) return;

            const bounds = node.getLocalBounds().rectangle;
            const current = describe(node);
            const settled = (bounds.width > 0) && (bounds.height > 0) && (current === previous) && (isPositionedRef.current?.() ?? true);

            previous = current;
            quietFrames = settled ? (quietFrames + 1) : 0;
            frames++;

            if ((quietFrames >= SETTLE_FRAMES) || (frames >= MAX_HIDDEN_FRAMES)) {
                setRevealed(true);

                return;
            }

            handle = requestAnimationFrame(check);
        };

        handle = requestAnimationFrame(check);

        return () => cancelAnimationFrame(handle);
    }, [ node, revealed, isDom ]);

    return revealed || isDom;
};
