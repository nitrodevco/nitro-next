import { type IRoomGeometry, type IRoomSpriteMouseEvent, MouseEventType } from '@nitrodevco/nitro-api';
import { RoomObjectFurnitureActionEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureMultiStateLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectFurnitureActionEvent.MOUSE_BUTTON,
            RoomObjectFurnitureActionEvent.MOUSE_ARROW,
        ]);
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        if (!event || !geometry) return;

        switch (event.type) {
            case MouseEventType.ROLL_OVER:
                this.handleRoomObjectEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_BUTTON, this.object),
                );
                break;
            case MouseEventType.ROLL_OUT:
                this.handleRoomObjectEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_ARROW, this.object),
                );
                break;
        }

        super.mouseEvent(event, geometry);
    }
}
