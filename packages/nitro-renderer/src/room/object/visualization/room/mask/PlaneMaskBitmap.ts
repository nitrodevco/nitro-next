import type { IGraphicAsset } from '@nitrodevco/nitro-api';

export class PlaneMaskBitmap {
    public static MIN_NORMAL_COORDINATE_VALUE: number = -1;
    public static MAX_NORMAL_COORDINATE_VALUE: number = 1;

    private _asset: IGraphicAsset | undefined;
    private _normalMinX: number;
    private _normalMaxX: number;
    private _normalMinY: number;
    private _normalMaxY: number;

    constructor(asset: IGraphicAsset, minX: number = -1, maxX: number = 1, minY: number = -1, maxY: number = 1) {
        this._asset = asset;
        this._normalMinX = minX;
        this._normalMaxX = maxX;
        this._normalMinY = minY;
        this._normalMaxY = maxY;
    }

    public get asset(): IGraphicAsset | undefined {
        return this._asset;
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

    public dispose(): void {
        this._asset = undefined;
    }
}
