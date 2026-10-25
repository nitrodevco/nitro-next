import { IRoomGeometry, IRoomSpriteMouseEvent, MouseEventType, RoomObjectStateChangedEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash's obfuscated `§_-PO§`, the logic `RoomObjectFactory` builds for
 * `furniture_counter_clock`.
 */
export class FurnitureCounterClockLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectStateChangedEvent.STATE_CHANGE ]);
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry) return;

        switch (event.type) {
            case MouseEventType.DOUBLE_CLICK:
                switch (event.spriteTag) {
                    case 'start_stop':
                        this.handleRoomObjectEvent(
                            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 1),
                        );
                        return;
                    case 'reset':
                        this.handleRoomObjectEvent(
                            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 2),
                        );
                        return;
                }
                break;
        }

        super.mouseEvent(event, geometry);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 1),
        );
    }
}
