import { RoomObjectFurnitureActionEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurnitureOneWayDoorLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_one_way_door`.
 */
export class FurnitureOneWayDoorLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR, this.object),
        );
    }
}
