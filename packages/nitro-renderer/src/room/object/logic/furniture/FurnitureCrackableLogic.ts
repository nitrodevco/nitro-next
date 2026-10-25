import { IRoomObjectUpdateMessage, RoomObjectVariableEnum, RoomWidgetEnumItemExtradataParameter } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash's obfuscated `§_-Y1M§`, the logic `RoomObjectFactory` builds for
 * `furniture_crackable`.
 */
export class FurnitureCrackableLogic extends FurnitureLogic {
    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (this.isRealRoomObject())
            this.object.model.setValue(
                RoomObjectVariableEnum.InfostandExtraParam,
                RoomWidgetEnumItemExtradataParameter.CRACKABLE_FURNI,
            );
    }
}
