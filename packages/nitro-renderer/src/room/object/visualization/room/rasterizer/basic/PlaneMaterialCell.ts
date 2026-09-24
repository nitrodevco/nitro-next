import { IGraphicAsset, IVector3D } from '@nitrodevco/nitro-api';
import { Container, Point, RenderTexture, Sprite, Texture, TilingSprite } from 'pixi.js';

import { Randomizer } from '../../utils';
import { createPlaneCanvas, drawOnPlaneCanvas, releasePlaneCanvas } from '../PlaneCanvas';
import { PlaneTexture } from './PlaneTexture';

/**
 * One cell of a material column: a texture, shifted by the plane's texture offset, with up to
 * `extraItemCount` extra items (the trees and houses of a landscape) scattered over it at offsets
 * the `Randomizer` picks. Ports Flash `PlaneMaterialCell`.
 *
 * A cell with extra items is not static: it draws into its own canvas on every render and hands that
 * canvas back, so the column copies it before asking for the next cell.
 */
export class PlaneMaterialCell {
    private _cachedBitmapData: RenderTexture | undefined = undefined;
    private _texture: PlaneTexture | undefined;
    private _extraItemOffsets: Point[] = [];
    private _extraItemTypes: IGraphicAsset[] = [];
    private _extraItemCount: number = 0;

    constructor(texture: PlaneTexture | undefined, extraItemTypes: IGraphicAsset[] | undefined = undefined, extraItemOffsets: Point[] | undefined = undefined, extraItemCount: number = 0) {
        this._texture = texture;

        if (extraItemTypes && extraItemTypes.length > 0 && extraItemCount > 0) {
            for (const type of extraItemTypes) {
                if (type) this._extraItemTypes.push(type);
            }

            if (this._extraItemTypes.length > 0) {
                if (extraItemOffsets) {
                    for (const offset of extraItemOffsets) {
                        if (offset) this._extraItemOffsets.push(new Point(offset.x, offset.y));
                    }
                }

                this._extraItemCount = extraItemCount;
            }
        }
    }

    public get isStatic(): boolean {
        return this._extraItemCount === 0;
    }

    public dispose(): void {
        if (this._texture) {
            this._texture.dispose();

            this._texture = undefined;
        }

        this.clearCache();

        this._extraItemTypes = [];
        this._extraItemOffsets = [];
    }

    public clearCache(): void {
        releasePlaneCanvas(this._cachedBitmapData);

        this._cachedBitmapData = undefined;
    }

    public getHeight(normal: IVector3D): number {
        return this._texture?.getBitmap(normal)?.height ?? 0;
    }

    public render(normal: IVector3D, textureOffsetX: number, textureOffsetY: number): Texture | undefined {
        const bitmap = this._texture?.getBitmap(normal);

        if (!bitmap) return undefined;

        const shifted = textureOffsetX !== 0 || textureOffsetY !== 0;

        if (this.isStatic && !shifted) return bitmap;

        if (this._cachedBitmapData && (this._cachedBitmapData.width !== bitmap.width || this._cachedBitmapData.height !== bitmap.height)) this.clearCache();

        if (!this._cachedBitmapData) this._cachedBitmapData = createPlaneCanvas(bitmap.width, bitmap.height);

        const container = new Container();

        if (shifted) {
            // Flash tiles the bitmap 2x2 and copies the window at the offset back out: a wrap-around shift.
            while (textureOffsetX < 0) textureOffsetX += bitmap.width;
            while (textureOffsetY < 0) textureOffsetY += bitmap.height;

            container.addChild(new TilingSprite({
                texture: bitmap,
                width: bitmap.width,
                height: bitmap.height,
                tilePosition: { x: -(textureOffsetX % bitmap.width), y: -(textureOffsetY % bitmap.height) },
            }));
        } else {
            container.addChild(new Sprite(bitmap));
        }

        if (!this.isStatic) this.addExtraItems(container);

        drawOnPlaneCanvas(this._cachedBitmapData, container, true);

        return this._cachedBitmapData;
    }

    private addExtraItems(container: Container): void {
        const count = Math.min(this._extraItemCount, this._extraItemOffsets.length);
        const max = Math.max(this._extraItemCount, this._extraItemOffsets.length);
        const indexes = Randomizer.getArray(this._extraItemCount, max);

        for (let i = 0; i < count; i++) {
            const offset = this._extraItemOffsets[indexes[i]];
            const asset = this._extraItemTypes[i % this._extraItemTypes.length];
            const texture = asset?.texture;

            if (!offset || !asset || !texture) continue;

            // Flash's `GraphicAsset.offsetX` / `offsetY`, which for a flipped asset is `-(width + offset)`.
            // The port's `GraphicAsset` keeps Flash's `_offsetX` in `x` but answers `offsetX` differently.
            const offsetX = asset.flipH ? -(texture.width + asset.x) : asset.x;
            const offsetY = asset.flipV ? -(texture.height + asset.y) : asset.y;

            let scaleX = 1;
            let scaleY = 1;
            let flipOffsetX = 0;
            let flipOffsetY = 0;

            if (asset.flipH) {
                scaleX = -1;
                flipOffsetX = texture.width;
            }

            if (asset.flipV) {
                scaleY = -1;
                flipOffsetY = texture.height;
            }

            const sprite = new Sprite(texture);

            sprite.scale.set(scaleX, scaleY);
            sprite.position.set(((offset.x + offsetX + flipOffsetX) >> 1) << 1, offset.y + offsetY + flipOffsetY);

            container.addChild(sprite);
        }
    }
}
