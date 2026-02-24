import { RoomObjectFurnitureActionEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureHabboWheelLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectFurnitureActionEvent.USE_HABBOWHEEL]);
    }

    public override useObject(): void {
        this.dispatchEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.USE_HABBOWHEEL, this.object),
        );
    }
}
