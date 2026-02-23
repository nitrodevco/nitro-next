import type { IGraphicAsset, IVector3D } from '@nitrodevco/nitro-api';

import { PlaneMaskBitmap } from './PlaneMaskBitmap';

export class PlaneMaskVisualization {
    public static MIN_NORMAL_COORDINATE_VALUE: number = -1;
    public static MAX_NORMAL_COORDINATE_VALUE: number = 1;

    private _bitmaps: PlaneMaskBitmap[] = [];

    public dispose(): void {
        for (const mask of this._bitmaps) {
            if (!mask) continue;

            mask.dispose();
        }

        this._bitmaps = [];
    }

    public addBitmap(
        asset: IGraphicAsset,
        minX: number = -1,
        maxX: number = 1,
        minY: number = -1,
        maxY: number = 1,
    ): void {
        this._bitmaps.push(new PlaneMaskBitmap(asset, minX, maxX, minY, maxY));
    }

    public getAsset(point: IVector3D): IGraphicAsset | undefined {
        if (point)
            for (const mask of this._bitmaps) {
                if (
                    mask &&
                    point.x >= mask.normalMinX &&
                    point.x <= mask.normalMaxX &&
                    point.y >= mask.normalMinY &&
                    point.y <= mask.normalMaxY
                ) {
                    return mask.asset;
                }
            }

        return undefined;
    }
}
