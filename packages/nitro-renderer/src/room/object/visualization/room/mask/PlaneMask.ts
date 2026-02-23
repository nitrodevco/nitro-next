import type { IGraphicAsset, IVector3D } from '@nitrodevco/nitro-api';

import { PlaneMaskVisualization } from './PlaneMaskVisualization';

export class PlaneMask {
    private _maskVisualizations: Map<number, PlaneMaskVisualization> = new Map();
    private _sizes: number[] = [];
    private _assetNames: Map<number, string> = new Map();
    private _lastMaskVisualization: PlaneMaskVisualization | undefined = undefined;
    private _lastSize: number = -1;

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

    public createMaskVisualization(size: number): PlaneMaskVisualization | undefined {
        const existing = this._maskVisualizations.get(size);

        if (existing) return undefined;

        const visualization = new PlaneMaskVisualization();

        this._maskVisualizations.set(size, visualization);

        this._sizes.push(size);
        this._sizes.sort();

        return visualization;
    }

    private getSizeIndex(k: number): number {
        let sizeIndex = 0;
        let index = 1;

        while (index < this._sizes.length) {
            if (this._sizes[index] > k) {
                if (this._sizes[index] - k < k - this._sizes[index - 1]) sizeIndex = index;

                break;
            }

            sizeIndex = index;

            index++;
        }

        return sizeIndex;
    }

    protected getMaskVisualization(k: number): PlaneMaskVisualization | undefined {
        if (k === this._lastSize) return this._lastMaskVisualization;

        const sizeIndex = this.getSizeIndex(k);

        if (sizeIndex < this._sizes.length) {
            this._lastMaskVisualization = this._maskVisualizations.get(this._sizes[sizeIndex]);
        } else {
            this._lastMaskVisualization = undefined;
        }

        this._lastSize = k;

        return this._lastMaskVisualization;
    }

    public getGraphicAsset(k: number, _arg_2: IVector3D): IGraphicAsset | undefined {
        return this.getMaskVisualization(k)?.getAsset(_arg_2);
    }

    public getAssetName(k: number): string | undefined {
        return this._assetNames?.get(k) ?? undefined;
    }

    public setAssetName(k: number, _arg_2: string): void {
        if (!this._assetNames) return;

        this._assetNames.set(k, _arg_2);
    }
}
