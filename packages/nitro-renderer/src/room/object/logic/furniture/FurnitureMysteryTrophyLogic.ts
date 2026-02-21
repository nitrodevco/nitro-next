import { ContextMenuEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureMysteryTrophyLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG]);
    }

    public override useObject(): void {
        this.dispatchEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG, this.object),
        );
    }

    public override get contextMenu(): string {
        return ContextMenuEnum.MYSTERY_TROPHY;
    }
}
