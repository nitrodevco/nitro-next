import { Container, Rectangle, RenderTexture, Sprite, Texture } from 'pixi.js';

import { TexturePool, TextureUtils } from '#renderer/utils';

/**
 * The `BitmapData` operations the plane rasterizers draw with, done on Pixi render textures the way
 * Sulake's own JavaScript client does them (`rasterizer/basic/fn_f810c3.js` in `flash-js`): a canvas
 * is a pooled `RenderTexture`, `fillRect(rect, 0x00FFFFFF)` is a clearing render, and
 * `copyPixels(..., mergeAlpha = true)` is a sprite rendered over what the canvas already holds.
 */

/** A cleared canvas of at least 1x1, taken from the texture pool. */
export const createPlaneCanvas = (width: number, height: number): RenderTexture => {
    width = Math.max(1, Math.trunc(width));
    height = Math.max(1, Math.trunc(height));

    const canvas = TexturePool.createRenderTexture(width, height) ?? RenderTexture.create({ width, height });

    clearPlaneCanvas(canvas);

    return canvas;
};

export const releasePlaneCanvas = (canvas: RenderTexture | undefined): void => {
    if (canvas && !canvas.destroyed) TexturePool.releaseTexture(canvas);
};

/** `fillRect(rect, 0x00FFFFFF)`: every pixel transparent. */
export const clearPlaneCanvas = (canvas: RenderTexture): void => {
    TextureUtils.getRenderer().render({ container: new Container(), target: canvas, clear: true });
};

/** `fillRect(rect, 0xFF000000 | color)`: every pixel replaced by the opaque colour. */
export const fillPlaneCanvas = (canvas: RenderTexture, color: number): void => {
    const sprite = new Sprite(Texture.WHITE);

    sprite.tint = color & 0xFFFFFF;
    sprite.setSize(canvas.width, canvas.height);

    drawOnPlaneCanvas(canvas, sprite, true);
};

/**
 * `copyPixels(texture, frame, (x, y), null, null, true)`: the texture, or the `frame` of a canvas,
 * drawn over the canvas at `(x, y)`. A `tint` is the `ColorTransform` multiplier
 * `PlaneVisualizationLayer` applies before its copy.
 */
export const copyToPlaneCanvas = (canvas: RenderTexture, texture: Texture, x: number, y: number, frame?: Rectangle, tint?: number): void => {
    let source = texture;

    if (frame) {
        if (frame.width <= 0 || frame.height <= 0) return;

        source = new Texture({ source: texture.source, frame });
    }

    const sprite = new Sprite(source);

    sprite.position.set(x, y);

    if (tint !== undefined) sprite.tint = tint & 0xFFFFFF;

    drawOnPlaneCanvas(canvas, sprite);

    if (source !== texture) source.destroy(false);
};

/**
 * `BitmapDataUtil.getFlipHBitmapData`: a mirrored copy of the texture. It is not pooled - the
 * caller keeps it for as long as the data it was parsed for and destroys it with that.
 */
export const createFlippedPlaneTexture = (texture: Texture): RenderTexture => {
    const flipped = RenderTexture.create({ width: Math.max(1, texture.width), height: Math.max(1, texture.height) });
    const sprite = new Sprite(texture);

    sprite.scale.x = -1;
    sprite.x = texture.width;

    drawOnPlaneCanvas(flipped, sprite, true);

    return flipped;
};

/** Renders a display tree onto the canvas and destroys the tree (never the textures it shows). */
export const drawOnPlaneCanvas = (canvas: RenderTexture, container: Container, clear: boolean = false): void => {
    TextureUtils.getRenderer().render({ container, target: canvas, clear });

    container.destroy({ children: true });
};
