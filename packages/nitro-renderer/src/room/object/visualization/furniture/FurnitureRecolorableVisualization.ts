import { RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';

/**
 * Port of Flash's obfuscated `_-M2G` (WIN63-202610121624), the visualization
 * `RoomObjectVisualizationFactory` builds for `furniture_recolorable`: the asset's layers tagged
 * `recolorable` take the model's colour, every other layer its own.
 */
export class FurnitureRecolorableVisualization extends AnimatedFurnitureVisualization {
    public static RECOLORABLE_SPRITE_TAG: string = 'recolorable' as const;

    private _color: number = 0xffffff;

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        const flag = super.updateModel(scale);
        const color = this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureRecolorableColor);

        this._color = (color === undefined || isNaN(color)) ? 0xffffff : color;

        return flag;
    }

    protected override getLayerColor(scale: RoomGeometryScaleType, layerId: number, colorId: number): number {
        if (this.getLayerTag(scale, this._direction, layerId) === FurnitureRecolorableVisualization.RECOLORABLE_SPRITE_TAG) return this._color;

        return super.getLayerColor(scale, layerId, colorId);
    }
}
