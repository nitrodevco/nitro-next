import { RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

/**
 * The wired trading chests: an animated furni whose `wired_emblem` layer only shows while the
 * chest has wired enabled (`FurnitureChestLogic` keeps that flag in the model).
 *
 * Flash's furni chest visualization also floats up to four icons of the items inside above an
 * open chest. That needs the room engine to load furni icons into an object's asset collection
 * on request (`RoomObjectFurniIconAssetEvent`), which this renderer does not do yet, so a furni
 * chest renders like a coins chest: it opens and closes, without the floating icons.
 */
export class FurnitureChestVisualization extends FurnitureAnimatedVisualization {
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
