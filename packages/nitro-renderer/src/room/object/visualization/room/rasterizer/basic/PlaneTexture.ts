import { IVector3D } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { PlaneTextureBitmap } from './PlaneTextureBitmap';

/**
 * A texture of the plane visualization data: its bitmaps, each for a range of plane normals. Ports
 * Flash `PlaneTexture`; `MIN_NORMAL_COORDINATE_VALUE` is its obfuscated `§_-r1m§`.
 *
 * Flash clones every bitmap it is given (`PlaneRasterizer.parseTextures`), so the texture owns them.
 * Here only the horizontally flipped copies are made for it, and those are the ones it destroys.
 */
export class PlaneTexture {
    public static MIN_NORMAL_COORDINATE_VALUE: number = -1;
    public static MAX_NORMAL_COORDINATE_VALUE: number = 1;

    private _bitmaps: PlaneTextureBitmap[] = [];
    private _ownedTextures: Texture[] = [];

    public dispose(): void {
        for (const bitmap of this._bitmaps) bitmap.dispose();

        for (const texture of this._ownedTextures) {
            if (!texture.destroyed) texture.destroy(true);
        }

        this._bitmaps = [];
        this._ownedTextures = [];
    }

    public addBitmap(
        bitmap: Texture,
        normalMinX: number = PlaneTexture.MIN_NORMAL_COORDINATE_VALUE,
        normalMaxX: number = PlaneTexture.MAX_NORMAL_COORDINATE_VALUE,
        normalMinY: number = PlaneTexture.MIN_NORMAL_COORDINATE_VALUE,
        normalMaxY: number = PlaneTexture.MAX_NORMAL_COORDINATE_VALUE,
        assetName: string | undefined = undefined,
        owned: boolean = false,
    ): void {
        this._bitmaps.push(new PlaneTextureBitmap(bitmap, normalMinX, normalMaxX, normalMinY, normalMaxY, assetName));

        if (owned) this._ownedTextures.push(bitmap);
    }

    public getBitmap(normal: IVector3D): Texture | undefined {
        return this.getPlaneTextureBitmap(normal)?.bitmap;
    }

    public getPlaneTextureBitmap(normal: IVector3D | undefined): PlaneTextureBitmap | undefined {
        if (!normal) return undefined;

        for (const bitmap of this._bitmaps) {
            if (normal.x >= bitmap.normalMinX && normal.x <= bitmap.normalMaxX && normal.y >= bitmap.normalMinY && normal.y <= bitmap.normalMaxY) return bitmap;
        }

        return undefined;
    }
}
