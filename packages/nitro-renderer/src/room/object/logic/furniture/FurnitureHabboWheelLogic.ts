import { RoomObjectFurnitureActionEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurnitureHabboWheelLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_habbowheel`.
 */
export class FurnitureHabboWheelLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectFurnitureActionEvent.USE_HABBOWHEEL ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.USE_HABBOWHEEL, this.object),
        );
    }
}
