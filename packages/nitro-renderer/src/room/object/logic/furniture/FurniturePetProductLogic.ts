import {
    type IRoomObjectUpdateMessage,
    RoomObjectVariableEnum,
    RoomWidgetEnumItemExtradataParameter,
} from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurniturePetProductLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_pet_customization`.
 */
export class FurniturePetProductLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU ]);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (this.isRealRoomObject())
            this.object.model.setValue(
                RoomObjectVariableEnum.InfostandExtraParam,
                RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT,
            );
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU, this.object),
        );
    }
}
