import { type IRoomGeometry, type IRoomSpriteMouseEvent, MouseEventType } from '@nitrodevco/nitro-api';
import { RoomObjectStateChangedEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureHockeyScoreLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectStateChangedEvent.STATE_CHANGE]);
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry) return;

        switch (event.type) {
            case MouseEventType.DOUBLE_CLICK:
                switch (event.spriteTag) {
                    case 'off':
                        this.handleRoomObjectEvent(
                            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 3),
                        );
                        return;
                }
                break;
            case MouseEventType.MOUSE_CLICK:
                switch (event.spriteTag) {
                    case 'inc':
                        this.handleRoomObjectEvent(
                            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 2),
                        );
                        return;
                    case 'dec':
                        this.handleRoomObjectEvent(
                            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 1),
                        );
                        return;
                }
                break;
        }

        super.mouseEvent(event, geometry);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 3),
        );
    }
}
