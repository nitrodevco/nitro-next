import { RoomObjectFurnitureActionEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureOneWayDoorLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR]);
    }

    public override useObject(): void {
        this.dispatchEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR, this.object),
        );
    }
}
