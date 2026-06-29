import type { IAssetData } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureWindowLogic extends FurnitureMultiStateLogic {
    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        let maskType = '';

        if (asset?.logic) maskType = asset.logic.maskType ?? '';

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureUsesPlaneMask, true);
        this.object.model.setValue(RoomObjectVariableEnum.FurniturePlaneMaskType, maskType);
    }
}
