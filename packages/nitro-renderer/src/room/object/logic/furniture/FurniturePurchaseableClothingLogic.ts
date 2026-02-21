import { ContextMenuEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurniturePurchaseableClothingLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG,
        ]);
    }

    public override useObject(): void {
        this.dispatchEvent(
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
