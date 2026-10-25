/**
 * The shore of a water area (a pool tile), cut to fit its neighbours. Ports Flash
 * `ShoreMaskCreatorUtility`.
 *
 * A water furni's `shore` layer is one bitmap drawn along every edge of the tile. Each of the eight
 * edge segments (two per side of a 2x2 area, numbered clockwise from the top) is kept or dropped by
 * whether water continues past it, and where a segment ends it is cut straight or round a corner
 * (`getBorderType`). Flash draws a mask for each segment and cut, once per size, flips it into the
 * other seven positions, and ORs the masks of the segments shown into one; the shore bitmap is then
 * copied through that mask into the furni's own instance mask asset.
 *
 * The masks here are alpha maps (every pixel 0 or 255, as Flash's are) kept per asset collection,
 * rather than bitmaps added to it as `mask_<size>_<segment>_<type>`: nothing but this utility ever
 * reads them, and a GPU texture would have to be read back for every shore drawn. Rectangles are
 * clipped as Flash's `fillRect` clips them, including its fractional far-edge coverage.
 */
import { IGraphicAsset, IGraphicAssetCollection } from '@nitrodevco/nitro-api';
import { CanvasSource, DOMAdapter, ICanvas, Rectangle, Sprite, Texture } from 'pixi.js';

import { TextureUtils } from '../../../../utils';

type AlphaMask = { width: number; height: number; alpha: Uint8Array };

export class ShoreMaskCreatorUtility {
    public static NO_CUT: number = 0;
    public static STRAIGHT_CUT: number = 1;
    public static INNER_CUT: number = 2;
    private static CUT_TYPE_COUNT: number = 3;
    private static MASK_COLOR_TRANSPARENT: number = 0;
    private static MASK_COLOR_SOLID: number = 0xFFFFFFFF;

    /** Collection -> `mask_<size>_<segment>_<type>` -> its alpha map; a size is done once it has an entry. */
    private static _masks: WeakMap<IGraphicAssetCollection, Map<string, AlphaMask>> = new WeakMap();
    private static _masksDone: WeakMap<IGraphicAssetCollection, Set<number>> = new WeakMap();
    /** The shore bitmap's pixels, by texture: read back once. */
    private static _shorePixels: WeakMap<Texture, Uint8ClampedArray> = new WeakMap();
    /** The canvas behind each instance mask texture, drawn into in place as Flash draws into its bitmap. */
    private static _instanceCanvases: WeakMap<Texture, ICanvas> = new WeakMap();

    public static createEmptyMask(width: number, height: number): AlphaMask {
        return { width, height, alpha: new Uint8Array(Math.max(0, width * height)) };
    }

    public static getInstanceMaskName(instanceId: number, size: number): string {
        return `instance_mask_${instanceId}_${size}`;
    }

    public static getBorderType(start: number, end: number): number {
        return start + (end * ShoreMaskCreatorUtility.CUT_TYPE_COUNT);
    }

    /** Flash `getInstanceMask`: the instance's own mask asset, created empty at the shore's size and offset. */
    public static getInstanceMask(instanceId: number, size: number, collection: IGraphicAssetCollection, shore: IGraphicAsset | undefined): IGraphicAsset | undefined {
        const name = ShoreMaskCreatorUtility.getInstanceMaskName(instanceId, size);
        let asset = collection.getAsset(name);

        if (!asset && shore?.texture) {
            const canvas = DOMAdapter.get().createCanvas(Math.max(1, shore.texture.width), Math.max(1, shore.texture.height));
            const texture = new Texture({ source: new CanvasSource({ resource: canvas, scaleMode: 'nearest' }) });

            ShoreMaskCreatorUtility._instanceCanvases.set(texture, canvas);

            asset = collection.addAsset(name, texture, shore.offsetX, shore.offsetY);
        }

        return asset;
    }

    public static disposeInstanceMask(instanceId: number, size: number, collection: IGraphicAssetCollection): void {
        collection.disposeAsset(ShoreMaskCreatorUtility.getInstanceMaskName(instanceId, size));
    }

    /** Flash `createShoreMask2x2`: the masks of every segment shown, ORed into `target`. */
    public static createShoreMask2x2(target: AlphaMask, size: number, borders: boolean[], borderTypes: number[], collection: IGraphicAssetCollection): AlphaMask {
        target.alpha.fill(0);

        const masks = ShoreMaskCreatorUtility._masks.get(collection);

        borders.forEach((shown, segment) => {
            if (!shown) return;

            const mask = masks?.get(`mask_${size}_${segment}_${borderTypes[segment]}`);

            if (!mask) return;

            const width = Math.min(mask.width, target.width);
            const height = Math.min(mask.height, target.height);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (mask.alpha[(y * mask.width) + x]) target.alpha[(y * target.width) + x] = 255;
                }
            }
        });

        return target;
    }

    /** Flash `initializeShoreMasks`: every segment's mask for every cut, once per size. */
    public static initializeShoreMasks(size: number, collection: IGraphicAssetCollection | undefined, shore: IGraphicAsset | undefined): boolean {
        if (!collection) return false;

        let done = ShoreMaskCreatorUtility._masksDone.get(collection);

        if (done?.has(size)) return true;

        if (!shore) return false;

        const texture = shore.texture;

        if (texture) {
            const outerCuts = [ 0, 1, 2, 0, 1, 2 ];
            const innerCuts = [ 1, 1, 1, 2, 2, 2 ];

            for (let i = 0; (i < outerCuts.length) && (i < innerCuts.length); i++) {
                let mask = ShoreMaskCreatorUtility.createMaskLeft(texture.width, texture.height);

                ShoreMaskCreatorUtility.cutLeftMask(mask, size, outerCuts[i], innerCuts[i]);
                ShoreMaskCreatorUtility.storeLeftMask(collection, mask, size, outerCuts[i], innerCuts[i]);

                mask = ShoreMaskCreatorUtility.createMaskRight(texture.width, texture.height);

                ShoreMaskCreatorUtility.cutRightMask(mask, size, innerCuts[i], outerCuts[i]);
                ShoreMaskCreatorUtility.storeRightMask(collection, mask, size, innerCuts[i], outerCuts[i]);
            }
        }

        if (!done) ShoreMaskCreatorUtility._masksDone.set(collection, done = new Set());

        done.add(size);

        return true;
    }

    /**
     * `instance.copyPixels(shore, shore.rect, (0, 0), mask, (0, 0), true)` onto the cleared instance
     * mask: the shore with every pixel's alpha multiplied by the mask's. The instance texture's canvas
     * is drawn into and its source updated, so the asset keeps the same texture.
     */
    public static drawInstanceMask(instance: IGraphicAsset, shore: IGraphicAsset, mask: AlphaMask): boolean {
        const target = instance.texture;
        const canvas = target ? ShoreMaskCreatorUtility._instanceCanvases.get(target) : undefined;
        const source = shore.texture;

        if (!target || !canvas || !source) return false;

        let pixels = ShoreMaskCreatorUtility._shorePixels.get(source);

        if (!pixels) {
            // Flash copies the full BitmapData. Extracting a Texture directly reads only its
            // atlas frame; a trimmed shore would then be indexed with the wrong row width.
            // Drawing the sprite into its original bounds restores the transparent trim too.
            const sprite = new Sprite(source);

            try {
                pixels = new Uint8ClampedArray(TextureUtils.getPixels({
                    target: sprite,
                    frame: new Rectangle(0, 0, source.width, source.height),
                    resolution: 1,
                }).pixels);
            } finally {
                sprite.destroy();
            }

            ShoreMaskCreatorUtility._shorePixels.set(source, pixels);
        }

        const width = canvas.width;
        const height = canvas.height;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D | null;

        if (!context) return false;

        const image = context.createImageData(width, height);
        const sourceWidth = Math.trunc(source.width);
        const copyWidth = Math.min(width, sourceWidth);
        const copyHeight = Math.min(height, Math.trunc(source.height));

        for (let y = 0; y < copyHeight; y++) {
            for (let x = 0; x < copyWidth; x++) {
                const maskAlpha = ((x < mask.width) && (y < mask.height)) ? mask.alpha[(y * mask.width) + x] : 0;

                if (!maskAlpha) continue;

                const from = ((y * sourceWidth) + x) * 4;
                const to = ((y * width) + x) * 4;

                image.data[to] = pixels[from];
                image.data[to + 1] = pixels[from + 1];
                image.data[to + 2] = pixels[from + 2];
                image.data[to + 3] = pixels[from + 3];
            }
        }

        context.putImageData(image, 0, 0);
        target.source.update();

        return true;
    }

    private static createMaskLeft(width: number, height: number): AlphaMask {
        const mask = ShoreMaskCreatorUtility.createEmptyMask(width, height);

        ShoreMaskCreatorUtility.fillTopLeftCorner(mask, Math.trunc(width / 2), Math.trunc((height / 2) - 1), 1, ShoreMaskCreatorUtility.MASK_COLOR_SOLID);

        return mask;
    }

    private static cutLeftMask(mask: AlphaMask, size: number, outerCut: number, innerCut: number): void {
        if (outerCut === ShoreMaskCreatorUtility.STRAIGHT_CUT) ShoreMaskCreatorUtility.cutLeftMaskOuterCorner(mask, size, false);
        else if (outerCut === ShoreMaskCreatorUtility.INNER_CUT) ShoreMaskCreatorUtility.cutLeftMaskOuterCorner(mask, size, true);

        if (innerCut === ShoreMaskCreatorUtility.INNER_CUT) ShoreMaskCreatorUtility.cutLeftMaskInnerCorner(mask, size);
    }

    private static cutLeftMaskOuterCorner(mask: AlphaMask, size: number, straight: boolean): void {
        const y = Math.trunc((mask.height / 2) - (size / 2));
        const x = Math.trunc(mask.width / 2);

        if (straight) ShoreMaskCreatorUtility.fillRect(mask, x, 0, mask.width, y, ShoreMaskCreatorUtility.MASK_COLOR_TRANSPARENT);
        else ShoreMaskCreatorUtility.fillTopLeftCorner(mask, x, y - 1, 1, ShoreMaskCreatorUtility.MASK_COLOR_TRANSPARENT);
    }

    private static cutLeftMaskInnerCorner(mask: AlphaMask, size: number): void {
        const x = Math.trunc((mask.width / 2) + (size / 2));

        ShoreMaskCreatorUtility.fillRect(mask, x, 0, mask.width, mask.height / 2, ShoreMaskCreatorUtility.MASK_COLOR_TRANSPARENT);
    }

    private static createMaskRight(width: number, height: number): AlphaMask {
        const mask = ShoreMaskCreatorUtility.createEmptyMask(width, height);

        ShoreMaskCreatorUtility.fillBottomRightCorner(mask, Math.trunc((width / 2) + 1), Math.trunc((height / 2) - 1), ShoreMaskCreatorUtility.MASK_COLOR_SOLID);

        return mask;
    }

    private static cutRightMask(mask: AlphaMask, size: number, innerCut: number, outerCut: number): void {
        if (outerCut === ShoreMaskCreatorUtility.STRAIGHT_CUT) ShoreMaskCreatorUtility.cutRightMaskOuterCorner(mask, size, false);
        else if (outerCut === ShoreMaskCreatorUtility.INNER_CUT) ShoreMaskCreatorUtility.cutRightMaskOuterCorner(mask, size, true);

        if (innerCut === ShoreMaskCreatorUtility.INNER_CUT) ShoreMaskCreatorUtility.cutRightMaskInnerCorner(mask, size);
    }

    private static cutRightMaskInnerCorner(mask: AlphaMask, size: number): void {
        const x = Math.trunc((mask.width / 2) + (size / 2));

        ShoreMaskCreatorUtility.fillRect(mask, x, 0, mask.width, (mask.height / 2) - (size / 4), ShoreMaskCreatorUtility.MASK_COLOR_TRANSPARENT);
    }

    private static cutRightMaskOuterCorner(mask: AlphaMask, size: number, straight: boolean): void {
        const y = Math.trunc(mask.height / 2);
        const x = Math.trunc((mask.width / 2) + size);

        if (straight) ShoreMaskCreatorUtility.fillRect(mask, x, 0, mask.width, y, ShoreMaskCreatorUtility.MASK_COLOR_TRANSPARENT);
        else ShoreMaskCreatorUtility.fillBottomRightCorner(mask, x + 1, y - 1, ShoreMaskCreatorUtility.MASK_COLOR_TRANSPARENT);
    }

    /** The left mask in segments 0 and 3, 4 and 7 - itself, flipped vertically, both ways, horizontally. */
    private static storeLeftMask(collection: IGraphicAssetCollection, mask: AlphaMask, size: number, outerCut: number, innerCut: number): void {
        const masks = ShoreMaskCreatorUtility.getMasks(collection);

        masks.set(`mask_${size}_0_${ShoreMaskCreatorUtility.getBorderType(outerCut, innerCut)}`, mask);
        masks.set(`mask_${size}_3_${ShoreMaskCreatorUtility.getBorderType(innerCut, outerCut)}`, ShoreMaskCreatorUtility.flip(mask, false, true));
        masks.set(`mask_${size}_4_${ShoreMaskCreatorUtility.getBorderType(outerCut, innerCut)}`, ShoreMaskCreatorUtility.flip(mask, true, true));
        masks.set(`mask_${size}_7_${ShoreMaskCreatorUtility.getBorderType(innerCut, outerCut)}`, ShoreMaskCreatorUtility.flip(mask, true, false));
    }

    /** The right mask in segments 1 and 2, 5 and 6. */
    private static storeRightMask(collection: IGraphicAssetCollection, mask: AlphaMask, size: number, innerCut: number, outerCut: number): void {
        const masks = ShoreMaskCreatorUtility.getMasks(collection);

        masks.set(`mask_${size}_1_${ShoreMaskCreatorUtility.getBorderType(innerCut, outerCut)}`, mask);
        masks.set(`mask_${size}_2_${ShoreMaskCreatorUtility.getBorderType(outerCut, innerCut)}`, ShoreMaskCreatorUtility.flip(mask, false, true));
        masks.set(`mask_${size}_5_${ShoreMaskCreatorUtility.getBorderType(innerCut, outerCut)}`, ShoreMaskCreatorUtility.flip(mask, true, true));
        masks.set(`mask_${size}_6_${ShoreMaskCreatorUtility.getBorderType(outerCut, innerCut)}`, ShoreMaskCreatorUtility.flip(mask, true, false));
    }

    private static getMasks(collection: IGraphicAssetCollection): Map<string, AlphaMask> {
        let masks = ShoreMaskCreatorUtility._masks.get(collection);

        if (!masks) ShoreMaskCreatorUtility._masks.set(collection, masks = new Map());

        return masks;
    }

    /** `BitmapDataUtil.getFlipHBitmapData` / `getFlipVBitmapData` / `getFlipHVBitmapData`. */
    private static flip(mask: AlphaMask, flipH: boolean, flipV: boolean): AlphaMask {
        const flipped = ShoreMaskCreatorUtility.createEmptyMask(mask.width, mask.height);

        for (let y = 0; y < mask.height; y++) {
            const fromY = flipV ? (mask.height - 1 - y) : y;

            for (let x = 0; x < mask.width; x++) {
                const fromX = flipH ? (mask.width - 1 - x) : x;

                flipped.alpha[(y * mask.width) + x] = mask.alpha[(fromY * mask.width) + fromX];
            }
        }

        return flipped;
    }

    /** `setPixel32`: truncated coordinates, ignored outside the bitmap. */
    private static setPixel(mask: AlphaMask, x: number, y: number, color: number): void {
        x = Math.trunc(x);
        y = Math.trunc(y);

        if ((x < 0) || (y < 0) || (x >= mask.width) || (y >= mask.height)) return;

        mask.alpha[(y * mask.width) + x] = (color >>> 24) & 0xFF;
    }

    /** Native `BitmapData.fillRect` rounds half-pixel edges to the nearest even integer. */
    private static fillRect(mask: AlphaMask, x: number, y: number, width: number, height: number, color: number): void {
        const left = Math.max(0, Math.floor(x));
        const top = Math.max(0, Math.floor(y));
        const right = Math.min(mask.width, ShoreMaskCreatorUtility.roundEdge(x + width));
        const bottom = Math.min(mask.height, ShoreMaskCreatorUtility.roundEdge(y + height));
        const value = (color >>> 24) & 0xFF;

        for (let row = top; row < bottom; row++) mask.alpha.fill(value, (row * mask.width) + left, (row * mask.width) + Math.max(left, right));
    }

    private static roundEdge(value: number): number {
        const lower = Math.floor(value);

        return value - lower === 0.5 ? lower + (lower & 1) : Math.round(value);
    }

    /** Every column from `x` rightwards filled from its top down to a row that rises one pixel every two columns. */
    private static fillTopLeftCorner(mask: AlphaMask, x: number, y: number, phase: number, color: number): void {
        while (y >= 0) {
            for (let row = y; row >= 0; row--) ShoreMaskCreatorUtility.setPixel(mask, x, row, color);

            if (++phase >= 2) {
                y--;
                phase = 0;
            }

            x++;
        }
    }

    /** Every row from `y` upwards filled from `x` to the right edge, `x` moving two pixels right per row. */
    private static fillBottomRightCorner(mask: AlphaMask, x: number, y: number, color: number): void {
        while (x < mask.width) {
            for (let column = x; column < mask.width; column++) ShoreMaskCreatorUtility.setPixel(mask, column, y, color);

            y--;
            x += 2;
        }
    }
}
