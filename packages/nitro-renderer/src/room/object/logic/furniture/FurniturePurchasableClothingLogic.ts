import { ContextMenuEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash's obfuscated `§_-I2x§`, the logic `RoomObjectFactory` builds for
 * `furniture_purchasable_clothing`.
 */
export class FurniturePurchasableClothingLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG,
        ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(
                RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG,
                this.object,
            ),
        );
    }

    public override get contextMenu(): string {
        return ContextMenuEnum.PURCHASABLE_CLOTHING;
    }
}
