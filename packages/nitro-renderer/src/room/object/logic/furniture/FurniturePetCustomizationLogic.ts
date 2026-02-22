import {
    type IRoomObjectUpdateMessage,
    RoomObjectVariableEnum,
    RoomWidgetEnumItemExtradataParameter,
} from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { FurnitureLogic } from './FurnitureLogic';

export class FurniturePetCustomizationLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU]);
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
        this.dispatchEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU, this.object),
        );
    }
}
