import { ContextMenuEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureMysteryBoxLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG]);
    }

    public override useObject(): void {
        this.dispatchEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG, this.object),
        );
    }

    public override get contextMenu(): string {
        return ContextMenuEnum.MYSTERY_BOX;
    }
}
