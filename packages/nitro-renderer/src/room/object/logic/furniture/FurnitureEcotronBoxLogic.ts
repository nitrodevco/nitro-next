import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurnitureEcotronBoxLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_ecotron_box`.
 */
export class FurnitureEcotronBoxLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.ECOTRONBOX ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.ECOTRONBOX, this.object),
        );
    }
}
