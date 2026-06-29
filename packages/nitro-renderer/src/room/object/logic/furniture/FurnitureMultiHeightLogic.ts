import type { IAssetData } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureMultiHeightLogic extends FurnitureMultiStateLogic {
    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureIsVariableHeight, 1);
    }
}
