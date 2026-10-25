import { ContextMenuEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash's obfuscated `§_-e1a§`, the logic `RoomObjectFactory` builds for
 * `furniture_mysterybox`.
 */
export class FurnitureMysteryBoxLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG, this.object),
        );
    }

    public override get contextMenu(): string {
        return ContextMenuEnum.MYSTERY_BOX;
    }
}
