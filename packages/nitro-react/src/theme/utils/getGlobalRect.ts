import { Container as PixiContainer, Point } from 'pixi.js';

export interface GlobalRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Shared by useFrameDrag/useFrameResize, which both read a frame's on-screen position/size to
 * drive their window-level pointermove/pointerup drag math - the one piece of those hooks that
 * genuinely differs per render target. `Box`'s ref is always typed `Container` (see Box.tsx's
 * own docblock on why), but in DOM mode it's actually attached to a plain `HTMLDivElement` at
 * runtime; `instanceof HTMLElement` is a real, safe runtime discriminant here (a Pixi
 * `Container` is never an `HTMLElement`), unlike the type-level cast `Box` uses internally.
 */
export const getGlobalRect = (node: PixiContainer | HTMLElement): GlobalRect => {
    if (node instanceof HTMLElement) {
        const rect = node.getBoundingClientRect();

        return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
    }

    // `toGlobal` of the node's own origin, not `getGlobalPosition`: that one maps `.x`/`.y` through
    // the parent and so misses the offset yoga gave this node itself - a row of a list reported
    // the list's top, whichever row it was.
    const global = node.toGlobal(new Point(0, 0));
    const computed = node.layout?.computedLayout;

    return {
        x: global.x,
        y: global.y,
        width: computed?.width ?? node.width,
        height: computed?.height ?? node.height,
    };
};
