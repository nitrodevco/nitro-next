import { Container, Filter, Rectangle, RenderTexture, Sprite, Texture, TextureSource } from 'pixi.js';

import { TexturePool, TextureUtils } from '#renderer/utils';

import { PlaneColorFilter } from './PlaneColorFilter';

/**
 * The `BitmapData` operations the plane rasterizers draw with, done on Pixi render textures the way
 * Sulake's own JavaScript client does them (`rasterizer/basic/fn_f810c3.js` in `flash-js`): a canvas
 * is a pooled `RenderTexture`, `fillRect(rect, 0x00FFFFFF)` is a clearing render, and
 * `copyPixels(..., mergeAlpha = true)` is a sprite rendered over what the canvas already holds.
 */

/** Copies onto one canvas waiting for a single render pass (`batchPlaneCanvas`). */
interface PlaneCanvasBatch {
    canvas: RenderTexture;
    container: Container;
    sources: Set<TextureSource>;
    textures: Texture[];
    filters: Filter[];
}

let batch: PlaneCanvasBatch | undefined;

/** Draws the copies `batchPlaneCanvas` collected, in their order, in one pass. */
const flushPlaneCanvasBatch = (): void => {
    const pending = batch;

    if (!pending) return;

    batch = undefined;

    if (pending.container.children.length) TextureUtils.getRenderer().render({ container: pending.container, target: pending.canvas, clear: false });

    pending.container.destroy({ children: true });

    for (const filter of pending.filters) filter.destroy();
    for (const texture of pending.textures) texture.destroy(false);
};

/**
 * Draws the batched copies first when a canvas they draw on or draw from is about to be redrawn:
 * a cell with extra items redraws its one canvas for every place it is copied to.
 */
const flushPlaneCanvasBatchFor = (canvas: Texture): void => {
    if (batch && ((batch.canvas.source === canvas.source) || batch.sources.has(canvas.source))) flushPlaneCanvasBatch();
};

/**
 * Runs `draw` with every `copyToPlaneCanvas` onto `canvas` collected and drawn in one render
 * pass at the end. Each copy is a sprite blended over what the canvas holds, so drawing them in
 * order in one pass gives the same pixels as one pass each; a column or matrix tiles dozens of
 * cells, and a pass per cell made a room's first rasterization hundreds of passes.
 */
export const batchPlaneCanvas = <T>(canvas: RenderTexture, draw: () => T): T => {
    flushPlaneCanvasBatch();

    batch = { canvas, container: new Container(), sources: new Set(), textures: [], filters: [] };

    try {
        return draw();
    } finally {
        flushPlaneCanvasBatch();
    }
};

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

/**
 * AIR minifies room bitmaps even with Bitmap.smoothing=false (native ZoomProbe).
 * Use linear minification on the standalone final plane image; magnification stays nearest.
 * Applying this to atlas source art would sample neighbouring frames, so it belongs here.
 */
export const preparePlaneSampling = (texture: RenderTexture): RenderTexture => {
    const style = texture.source.style;

    if (style.minFilter !== 'linear' || style.magFilter !== 'nearest') {
        style.minFilter = 'linear';
        style.magFilter = 'nearest';
        style.update();
    }

    return texture;
};

/** `fillRect(rect, 0x00FFFFFF)`: every pixel transparent. */
export const clearPlaneCanvas = (canvas: RenderTexture): void => {
    flushPlaneCanvasBatchFor(canvas);

    TextureUtils.getRenderer().render({ container: new Container(), target: canvas, clear: true });
};

/** `fillRect(rect, 0xFF000000 | color)`: every pixel replaced by the opaque colour. */
export const fillPlaneCanvas = (canvas: RenderTexture, color: number, transformWhite: boolean = false): void => {
    const sprite = new Sprite(Texture.WHITE);
    const filter = transformWhite && color !== 0xFFFFFF ? new PlaneColorFilter(color, canvas.width) : undefined;

    sprite.tint = transformWhite ? 0xFFFFFF : color & 0xFFFFFF;
    sprite.setSize(canvas.width, canvas.height);

    if (filter) sprite.filters = [ filter ];

    drawOnPlaneCanvas(canvas, sprite, true);
    filter?.destroy();
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

    const filter = tint !== undefined && tint !== 0xFFFFFF ? new PlaneColorFilter(tint, source.width) : undefined;

    if (filter) sprite.filters = [ filter ];

    // Reading the canvas being batched onto needs what is already queued on it.
    if (batch && (batch.canvas.source === texture.source)) flushPlaneCanvasBatch();

    if (batch && (batch.canvas === canvas)) {
        batch.container.addChild(sprite);
        batch.sources.add(texture.source);

        if (filter) batch.filters.push(filter);
        if (source !== texture) batch.textures.push(source);

        return;
    }

    drawOnPlaneCanvas(canvas, sprite);

    filter?.destroy();

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
    flushPlaneCanvasBatchFor(canvas);

    TextureUtils.getRenderer().render({ container, target: canvas, clear });

    container.destroy({ children: true });
};

/**
 * The texture a `RoomPlane` is drawn onto. Keep coverage binary: partially transparent edges of
 * separately rendered adjacent planes blend against black instead of joining into an opaque face.
 * RoomPlane aligns the matrix rasterization with Flash's integer column copies before drawing.
 * The shared pool keeps antialias modes separate and expires unused targets during idle cleanup.
 */
export const acquirePlaneTarget = (width: number, height: number): RenderTexture => {
    width = Math.max(1, Math.trunc(width));
    height = Math.max(1, Math.trunc(height));

    return preparePlaneSampling(TexturePool.createRenderTexture(width, height, false) ?? RenderTexture.create({ width, height, antialias: false }));
};

export const releasePlaneTarget = (target: RenderTexture | undefined): void => {
    if (!target || target.destroyed) return;

    TexturePool.releaseTexture(target);
};
