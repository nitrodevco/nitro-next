import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurniturePlaceholderLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_placeholder`.
 */
export class FurniturePlaceholderLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.PLACEHOLDER ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PLACEHOLDER, this.object),
        );
    }
}
