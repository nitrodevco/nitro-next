import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureEcotronBoxLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.ECOTRONBOX]);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.ECOTRONBOX, this.object));
    }
}
