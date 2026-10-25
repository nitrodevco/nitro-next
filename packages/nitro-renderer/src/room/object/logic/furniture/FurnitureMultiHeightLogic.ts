import { IAssetData, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash `FurnitureMultiHeightLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_multiheight`.
 */
export class FurnitureMultiHeightLogic extends FurnitureMultiStateLogic {
    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureIsVariableHeight, 1);
    }
}
