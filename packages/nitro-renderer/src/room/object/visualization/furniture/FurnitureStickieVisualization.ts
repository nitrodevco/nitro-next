import type { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { ColorData } from '../data';
import { FurnitureVisualization } from './FurnitureVisualization';

export class FurnitureStickieVisualization extends FurnitureVisualization {
    protected override getLayerColor(scale: RoomGeometryScaleType, layerId: number, colorId: number): number {
        if (!this._data) return ColorData.DEFAULT_COLOR;

        return this._data.getLayerColor(scale, layerId, colorId);
    }
}
