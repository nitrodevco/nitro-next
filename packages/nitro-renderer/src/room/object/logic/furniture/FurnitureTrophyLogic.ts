import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurnitureTrophyLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_trophy`.
 */
export class FurnitureTrophyLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.TROPHY ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.TROPHY, this.object));
    }
}
