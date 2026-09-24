import { IRoomGeometry } from '@nitrodevco/nitro-api';

import { PlaneVisualization } from './PlaneVisualization';

/**
 * One plane type of the visualization data (a wall, floor or landscape id): a visualization per
 * size, and the one nearest the room's scale picked for drawing. Ports Flash `Plane`.
 */
export class Plane {
    private _planeVisualizations: Map<number, PlaneVisualization> = new Map();
    private _sizes: number[] = [];
    private _lastPlaneVisualization: PlaneVisualization | undefined = undefined;
    private _lastSize: number = -1;

    public isStatic(_size: number): boolean {
        return true;
    }

    public dispose(): void {
        for (const visualization of this._planeVisualizations.values()) visualization.dispose();

        this._planeVisualizations.clear();
        this._lastPlaneVisualization = undefined;
        this._sizes = [];
    }

    public createPlaneVisualization(size: number, totalLayers: number, geometry: IRoomGeometry): PlaneVisualization | undefined {
        if (this._planeVisualizations.has(size)) return undefined;

        const visualization = new PlaneVisualization(totalLayers, geometry);

        this._planeVisualizations.set(size, visualization);
        this._sizes.push(size);
        this._sizes.sort((a, b) => a - b);

        return visualization;
    }

    private getSizeIndex(size: number): number {
        let sizeIndex = 0;

        for (let i = 1; i < this._sizes.length; i++) {
            if (this._sizes[i] > size) {
                if ((this._sizes[i] - size) < (size - this._sizes[i - 1])) sizeIndex = i;

                break;
            }

            sizeIndex = i;
        }

        return sizeIndex;
    }

    protected getPlaneVisualization(size: number): PlaneVisualization | undefined {
        if (size === this._lastSize) return this._lastPlaneVisualization;

        const sizeIndex = this.getSizeIndex(size);

        this._lastPlaneVisualization = (sizeIndex < this._sizes.length) ? this._planeVisualizations.get(this._sizes[sizeIndex]) : undefined;
        this._lastSize = size;

        return this._lastPlaneVisualization;
    }
}
