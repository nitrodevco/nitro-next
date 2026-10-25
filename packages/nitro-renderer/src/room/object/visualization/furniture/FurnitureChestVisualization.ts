import { RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';

/**
 * Port of Flash `FurnitureChestVisualization` (obfuscated `§_-727§`), the wired trading chests:
 * an animated furni whose `wired_emblem` layer only shows while the chest has wired enabled
 * (`FurnitureChestLogic` keeps that flag in the model). The coins chest (`§_-X1W§`) is this class
 * as it is; the furni chest adds its floating icons in `FurnitureFurniChestVisualization`.
 */
export class FurnitureChestVisualization extends AnimatedFurnitureVisualization {
    private static WIRED_EMBLEM_TAG: string = 'wired_emblem';

    private _isWiredEnabled: boolean = false;

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        let updated = super.updateModel(scale);

        const isWiredEnabled = (this.object?.model.getValue<number>(RoomObjectVariableEnum.FurnitureChestIsWiredEnabled) === 1);

        if (isWiredEnabled !== this._isWiredEnabled) {
            this._isWiredEnabled = isWiredEnabled;

            updated = true;
        }

        return updated;
    }

    protected override getLayerAlpha(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (!this._isWiredEnabled && this.getLayerTag(scale, direction, layerId) === FurnitureChestVisualization.WIRED_EMBLEM_TAG) return 0;

        return super.getLayerAlpha(scale, direction, layerId);
    }
}
