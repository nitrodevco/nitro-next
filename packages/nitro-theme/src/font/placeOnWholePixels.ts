import { Sprite } from 'pixi.js';

/** The part of `@pixi/layout`'s `computeLayoutData` result this changes: the object fit's offset in the view's box. */
interface LayoutViewData {
    offsetX: number;
    offsetY: number;
}

type ComputeLayoutData = (this: Sprite, computedLayout: unknown) => LayoutViewData;

const placed = new WeakSet<Sprite>();

/**
 * `TextSkinRenderer.draw` puts a text field in its window at whole pixels: `Math.floor(width / 2 -
 * field.width / 2)` centred, `Math.floor(width - field.width - margin)` right. `@pixi/layout` places a
 * sprite in its box by its `objectPosition` unrounded, so a field an odd number of pixels narrower than
 * its window landed on a half pixel (the trophy's `title` at 37.5 in its 120 px `title_bg`).
 * `roundPixels` then rounds the sprite's two edges on their own, and at a half pixel float error
 * picks the side for each: on some GPUs the bitmap came out a pixel narrower or wider, a glyph column
 * dropped or doubled - a different one wherever the window was dragged to. The sprite's own
 * `computeLayoutData` (the one `@pixi/layout` calls) floors the offset instead. Once per sprite.
 */
export const placeOnWholePixels = (sprite: Sprite): void => {
    if (placed.has(sprite)) return;

    const view = sprite as unknown as { computeLayoutData?: ComputeLayoutData };
    const compute = view.computeLayoutData;

    if (typeof compute !== 'function') return;

    placed.add(sprite);

    view.computeLayoutData = function (this: Sprite, computedLayout: unknown) {
        const data = compute.call(this, computedLayout);

        return { ...data, offsetX: Math.floor(data.offsetX), offsetY: Math.floor(data.offsetY) };
    };
};
