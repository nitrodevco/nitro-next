import type { IRoomGeometry, IRoomSpriteMouseEvent } from '@nitrodevco/nitro-api';
import { MouseEventType } from '@nitrodevco/nitro-api';
import { RoomObjectStateChangedEvent } from '@nitrodevco/nitro-events';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureWelcomeGiftLogic extends FurnitureMultiStateLogic {
    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        if (!event || !geometry) return;

        if (event.type === MouseEventType.DOUBLE_CLICK)
            this.dispatchEvent(new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object));

        super.mouseEvent(event, geometry);
    }
}
