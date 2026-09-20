import { Container as PixiContainer, Point } from 'pixi.js';

export interface GlobalRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Shared by useFrameDrag/useFrameResize, which both read a frame's on-screen position/size to
 * drive their window-level pointermove/pointerup drag math.
 */
export const getGlobalRect = (node: PixiContainer): GlobalRect => {
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
