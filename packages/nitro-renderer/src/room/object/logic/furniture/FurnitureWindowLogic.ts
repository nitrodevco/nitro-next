import { IAssetData, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash's obfuscated `§_-L2O§`, the logic `RoomObjectFactory` builds for
 * `furniture_window`.
 */
export class FurnitureWindowLogic extends FurnitureMultiStateLogic {
    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        // `FurnitureWindowLogic.initialize`: both variables are only set when the logic carries a `mask` type.
        const maskType = asset?.logic?.maskType;

        if (maskType === undefined) return;

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureUsesPlaneMask, true);
        this.object.model.setValue(RoomObjectVariableEnum.FurniturePlaneMaskType, maskType);
    }
}
