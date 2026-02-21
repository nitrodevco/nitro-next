import type { IAssetData } from '@nitrodevco/nitro-api';
import { RoomObjectVariable } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureMultiHeightLogic extends FurnitureMultiStateLogic {
    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        this.object.model.setValue(RoomObjectVariable.FURNITURE_IS_VARIABLE_HEIGHT, 1);
    }
}
