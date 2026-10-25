import { IRoomGeometry, IRoomSpriteMouseEvent, MouseEventType, RoomObjectStateChangedEvent } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash `FurnitureWelcomeGiftLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_welcome_gift`.
 */
export class FurnitureWelcomeGiftLogic extends FurnitureMultiStateLogic {
    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry) return;

        if (event.type === MouseEventType.DOUBLE_CLICK)
            this.handleRoomObjectEvent(
                new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object),
            );

        super.mouseEvent(event, geometry);
    }
}
