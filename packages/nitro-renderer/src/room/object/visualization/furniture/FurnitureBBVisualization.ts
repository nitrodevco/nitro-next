import { FurnitureBrandedImageVisualization } from './FurnitureBrandedImageVisualization';

export class FurnitureBBVisualization extends FurnitureBrandedImageVisualization {
    protected override getLayerXOffset(scale: number, direction: number, layerId: number): number {
        return super.getLayerXOffset(scale, direction, layerId) + this._offsetX;
    }

    protected override getLayerYOffset(scale: number, direction: number, layerId: number): number {
        return super.getLayerYOffset(scale, direction, layerId) + this._offsetY;
    }

    protected override getLayerZOffset(scale: number, direction: number, layerId: number): number {
        return super.getLayerZOffset(scale, direction, layerId) + this._offsetZ;
    }
}
