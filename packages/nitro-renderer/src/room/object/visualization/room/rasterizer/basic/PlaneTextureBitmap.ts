import { Texture } from 'pixi.js';

/**
 * One bitmap of a plane texture and the range of plane normals it is drawn for. Ports Flash
 * `PlaneTextureBitmap`; `MIN_NORMAL_COORDINATE_VALUE` is its obfuscated `§_-r1m§`.
 */
export class PlaneTextureBitmap {
    public static MIN_NORMAL_COORDINATE_VALUE: number = -1;
    public static MAX_NORMAL_COORDINATE_VALUE: number = 1;

    private _bitmap: Texture | undefined;
    private _normalMinX: number;
    private _normalMaxX: number;
    private _normalMinY: number;
    private _normalMaxY: number;
    private _assetName: string | undefined;

    constructor(
        bitmap: Texture,
        normalMinX: number = PlaneTextureBitmap.MIN_NORMAL_COORDINATE_VALUE,
        normalMaxX: number = PlaneTextureBitmap.MAX_NORMAL_COORDINATE_VALUE,
        normalMinY: number = PlaneTextureBitmap.MIN_NORMAL_COORDINATE_VALUE,
        normalMaxY: number = PlaneTextureBitmap.MAX_NORMAL_COORDINATE_VALUE,
        assetName: string | undefined = undefined,
    ) {
        this._normalMinX = normalMinX;
        this._normalMaxX = normalMaxX;
        this._normalMinY = normalMinY;
        this._normalMaxY = normalMaxY;
        this._assetName = assetName;
        this._bitmap = bitmap;
    }

    public dispose(): void {
        this._bitmap = undefined;
    }

    public get bitmap(): Texture | undefined {
        return this._bitmap;
    }

    public get normalMinX(): number {
        return this._normalMinX;
    }

    public get normalMaxX(): number {
        return this._normalMaxX;
    }

    public get normalMinY(): number {
        return this._normalMinY;
    }

    public get normalMaxY(): number {
        return this._normalMaxY;
    }

    public get assetName(): string | undefined {
        return this._assetName;
    }
}
