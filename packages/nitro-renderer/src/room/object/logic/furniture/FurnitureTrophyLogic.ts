import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureTrophyLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.TROPHY]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.TROPHY, this.object));
    }
}
