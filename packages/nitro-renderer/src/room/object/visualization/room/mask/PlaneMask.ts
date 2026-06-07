import type { IGraphicAsset, IVector3D } from '@nitrodevco/nitro-api';
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { PlaneMaskVisualization } from './PlaneMaskVisualization';

export class PlaneMask {
    private _maskVisualizations: Map<RoomGeometryScaleType, PlaneMaskVisualization> = new Map();
    private _sizes: RoomGeometryScaleType[] = [];
    private _assetNames: Map<number, string> = new Map();
    private _lastMaskVisualization: PlaneMaskVisualization | undefined = undefined;
    private _lastSize: RoomGeometryScaleType = RoomGeometryScaleType.None;

    public dispose(): void {
        if (this._maskVisualizations) {
            for (const mask of this._maskVisualizations.values()) {
                if (!mask) continue;

                mask.dispose();
            }

            this._maskVisualizations.clear();
        }

        this._lastMaskVisualization = undefined;
        this._sizes = [];
    }

    public createMaskVisualization(size: RoomGeometryScaleType): PlaneMaskVisualization | undefined {
        const existing = this._maskVisualizations.get(size);

        if (existing) return undefined;

        const visualization = new PlaneMaskVisualization();

        this._maskVisualizations.set(size, visualization);

        this._sizes.push(size);
        this._sizes.sort();

        return visualization;
    }

    private getSizeIndex(size: RoomGeometryScaleType): number {
        let sizeIndex = 0;
        let index = 1;

        while (index < this._sizes.length) {
            if (this._sizes[index] > size) {
                if (this._sizes[index] - size < size - this._sizes[index - 1]) sizeIndex = index;

                break;
            }

            sizeIndex = index;

            index++;
        }

        return sizeIndex;
    }

    protected getMaskVisualization(size: RoomGeometryScaleType): PlaneMaskVisualization | undefined {
        if (size === this._lastSize) return this._lastMaskVisualization;

        const sizeIndex = this.getSizeIndex(size);

        if (sizeIndex < this._sizes.length) {
            this._lastMaskVisualization = this._maskVisualizations.get(this._sizes[sizeIndex]);
        } else {
            this._lastMaskVisualization = undefined;
        }

        this._lastSize = size;

        return this._lastMaskVisualization;
    }

    public getGraphicAsset(size: RoomGeometryScaleType, point: IVector3D): IGraphicAsset | undefined {
        return this.getMaskVisualization(size)?.getAsset(point);
    }

    public getAssetName(k: number): string | undefined {
        return this._assetNames?.get(k) ?? undefined;
    }

    public setAssetName(k: number, _arg_2: string): void {
        if (!this._assetNames) return;

        this._assetNames.set(k, _arg_2);
    }
}
