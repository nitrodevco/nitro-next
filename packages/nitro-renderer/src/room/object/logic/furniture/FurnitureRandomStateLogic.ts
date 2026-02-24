import { RoomObjectStateChangedEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRandomStateLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectStateChangedEvent.STATE_RANDOM]);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_RANDOM, this.object));
    }
}
