import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { FurnitureRoomBrandingVisualization } from './FurnitureRoomBrandingVisualization';

/**
 * Port of Flash `FurnitureRoomBillboardVisualization`, the visualization
 * `RoomObjectVisualizationFactory` builds for `furniture_bb`.
 */
export class FurnitureRoomBillboardVisualization extends FurnitureRoomBrandingVisualization {
    protected override getLayerXOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        return super.getLayerXOffset(scale, direction, layerId) + this._offsetX;
    }

    protected override getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        return super.getLayerYOffset(scale, direction, layerId) + this._offsetY;
    }

    protected override getLayerZOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        return super.getLayerZOffset(scale, direction, layerId) + this._offsetZ;
    }
}
