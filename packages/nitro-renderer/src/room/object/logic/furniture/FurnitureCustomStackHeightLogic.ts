import { IAssetData, RoomObjectVariableEnum, RoomWidgetEnum } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash's obfuscated `§_-D1V§`, the logic `RoomObjectFactory` builds for
 * `furniture_custom_stack_height`.
 */
export class FurnitureCustomStackHeightLogic extends FurnitureMultiStateLogic {
    public override get widget(): string {
        return RoomWidgetEnum.CUSTOM_STACK_HEIGHT;
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureAlwaysStackable, 1);
    }
}
