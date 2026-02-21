import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureTrophyLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.TROPHY]);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.TROPHY, this.object));
    }
}
