import { RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { BLEND_MODES } from 'pixi.js';

import { FurnitureVisualization } from './FurnitureVisualization';

/**
 * Port of Flash `FurnitureBuilderPlaceholderVisualization` (`furniture_builder_placeholder`): the
 * stand-in Builders Club places for a furni it cannot show, drawn as one tile's layers repeated
 * over the furni's whole `furniture_size_x` by `furniture_size_y` footprint.
 *
 * Every layer the room asks about maps back onto the tile's own (`getIndex`), and the copy for
 * tile `n` is shifted along the grid - `n % size_y` along one axis and `n / size_y` along the
 * other. There is no shadow and no additional sprite; the Variable FX overlay still gets its own.
 */
export class FurnitureBuilderPlaceholderVisualization extends FurnitureVisualization {
    private _sizeX: number = -1;
    private _sizeY: number = -1;

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        const updated = super.updateModel(scale);
        const model = this.object.model;
        const sizeX = Math.trunc(model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX) || 0);
        const sizeY = Math.trunc(model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY) || 0);

        if (sizeX !== this._sizeX || sizeY !== this._sizeY) {
            this._sizeX = sizeX;
            this._sizeY = sizeY;

            this.instantiateSprites(scale);
        }

        return updated;
    }

    private instantiateSprites(scale: RoomGeometryScaleType): void {
        if (!this.data) return;

        this.setLayerCount(this.data.getLayerCount(scale));
        this.createSprites(this._layerCount);
        this.updateSprites(scale, true, 0);
    }

    /** Flash `updateLayerCount`: the tile's layers once per tile, no shadow. */
    protected override setLayerCount(count: number): void {
        this._layerCount = count;

        if ((this._sizeX * this._sizeY) > 1) this._layerCount *= (this._sizeX * this._sizeY);

        this._shadowLayerIndex = -1;

        this.reserveVariableFxOverlaySprite();
    }

    protected override getAdditionalLayerCount(): number {
        return 0;
    }

    protected override getLayerTag(scale: RoomGeometryScaleType, direction: number, layerId: number): string {
        return super.getLayerTag(scale, direction, this.getIndex(scale, layerId));
    }

    protected override getLayerAlpha(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        return super.getLayerAlpha(scale, direction, this.getIndex(scale, layerId));
    }

    protected override getLayerColor(scale: RoomGeometryScaleType, layerId: number, colorId: number): number {
        return super.getLayerColor(scale, this.getIndex(scale, layerId), colorId);
    }

    protected override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        return super.getSpriteAssetName(scale, this.getIndex(scale, layerId));
    }

    protected override getLayerXOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        const offset = super.getLayerXOffset(scale, direction, this.getIndex(scale, layerId));
        const [ row, column ] = this.getTile(scale, layerId);

        return Math.trunc(offset + (((row - column) * scale) / 2));
    }

    protected override getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        const offset = super.getLayerYOffset(scale, direction, this.getIndex(scale, layerId));
        const [ row, column ] = this.getTile(scale, layerId);

        return Math.trunc(offset + (((row + column) * scale) / 4));
    }

    protected override getLayerIgnoreMouse(scale: RoomGeometryScaleType, direction: number, layerId: number): boolean {
        return super.getLayerIgnoreMouse(scale, direction, this.getIndex(scale, layerId));
    }

    protected override getLayerBlendMode(scale: RoomGeometryScaleType, direction: number, layerId: number): BLEND_MODES {
        return super.getLayerBlendMode(scale, direction, this.getIndex(scale, layerId));
    }

    protected override getLayerZOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        return super.getLayerZOffset(scale, direction, this.getIndex(scale, layerId));
    }

    /** The tile a sprite belongs to: its place along `size_y`, and along `size_x`. */
    private getTile(scale: RoomGeometryScaleType, layerId: number): [ number, number ] {
        const layerCount = this.data?.getLayerCount(scale) || 1;
        const tile = Math.trunc(layerId / layerCount);
        const sizeY = this._sizeY || 1;

        return [ tile % sizeY, Math.trunc(tile / sizeY) ];
    }

    /** Flash `getIndex`: which of the tile's own layers a sprite repeats. */
    private getIndex(scale: RoomGeometryScaleType, layerId: number): number {
        const layerCount = this.data?.getLayerCount(scale);

        return layerCount ? layerId % layerCount : layerId;
    }
}
