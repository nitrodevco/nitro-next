import { IRoomGeometry, RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { AnimatedFurnitureVisualization } from '../furniture';
import { RoomObjectSpriteVisualization } from '../RoomObjectSpriteVisualization';

/**
 * `TileCursorVisualization`: the tile cursor, whose layer 1 (the height marker) is lifted by the
 * `tile_cursor_height` the logic was given, at half a tile's scale per height unit.
 */
export class TileCursorVisualization extends AnimatedFurnitureVisualization {
    private _tileHeight: number;

    constructor() {
        super();

        this._tileHeight = 0;
    }

    /**
     * The canvas places the cursor at its new tile on the frame the logic moves it, but the
     * furniture update runs only every `UPDATE_TIME_INCREASER` ms - every frame at Flash's frame
     * rate, every second or third at the browser's. The sprites of the old state and height would
     * be drawn at the new tile meanwhile: the height marker left on a seat jumps to the floor tile
     * the pointer moved onto before it goes. So a moved, re-stated or re-lifted cursor updates at once.
     */
    public override update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void {
        const object = this.object;

        if (object && ((object.updateCounter !== this.updateObjectCounter) || (object.model.updateCounter !== this.updateModelCounter))) {
            this._lastUpdateTime = time - RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER;
        }

        super.update(geometry, time, update, skipUpdate);
    }

    protected override getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (layerId === 1) {
            this._tileHeight = this.object.model.getValue<number>(RoomObjectVariableEnum.TileCursorHeight);

            // Flash's `getSpriteYOffset` returns an int, so the lift truncates.
            return Math.trunc(-this._tileHeight * (scale / 2));
        }

        return super.getLayerYOffset(scale, direction, layerId);
    }
}
