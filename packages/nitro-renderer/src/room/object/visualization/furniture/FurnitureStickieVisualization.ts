import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { ColorData } from '../data';
import { FurnitureVisualization } from './FurnitureVisualization';

/**
 * Port of Flash `FurnitureStickieVisualization`, the visualization
 * `RoomObjectVisualizationFactory` builds for `furniture_stickie`.
 */
export class FurnitureStickieVisualization extends FurnitureVisualization {
    protected override getLayerColor(scale: RoomGeometryScaleType, layerId: number, colorId: number): number {
        if (!this._data) return ColorData.DEFAULT_COLOR;

        return this._data.getLayerColor(scale, layerId, colorId);
    }
}
