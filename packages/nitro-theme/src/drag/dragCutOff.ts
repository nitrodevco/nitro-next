import { Container, Matrix } from 'pixi.js';

const transform = new Matrix();

/**
 * The box that cuts a freely dragged window off from the pointer, if any: the nearest ancestor with a
 * hit area of its own that does not cover the whole desktop.
 *
 * Flash cuts a window dragged out of its parent off only where the parent clips: its hit test looks
 * into a window's children outside the window's rect unless the window clips
 * (`WindowController.groupParameterFilteredChildrenUnderPoint`), and a clipping window hides them there
 * too. Pixi's `EventBoundary.hitPruneFn` skips every child of a container whose `hitArea` misses the
 * point, and every `Box` that is not `pointerTransparent` carries one (`attachBoxHitArea`). So a box of
 * the port's own that only places a window - no Flash window behind it: the trophy is the desktop's own
 * child - left every part of the window dragged out of it drawn but dead (`FurnitureTemplatePanel`): the
 * press went to the room, and the window could not be grabbed there again. Such a box is
 * `pointerTransparent`.
 *
 * The walk stops at a clipping ancestor (one with a mask), which cuts the window off out of sight and
 * out of reach alike, as Flash's does. A box is compared by its `@pixi/layout` size at its place on
 * the stage; one with no layout is passed over.
 */
export const findDragCutOff = (target: Container, desktop: { width: number; height: number }): Container | undefined => {
    for (let node = target.parent; node; node = node.parent) {
        if (node.mask) return undefined;

        const box = node.hitArea ? node.layout?.computedLayout : undefined;

        if (!box) continue;

        const { a, d, tx, ty } = node.getGlobalTransform(transform, false);

        if ((tx > 0) || (ty > 0) || ((tx + (box.width * a)) < desktop.width) || ((ty + (box.height * d)) < desktop.height)) return node;
    }

    return undefined;
};
