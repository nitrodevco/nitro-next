import type { IRoomGeometry, IRoomSpriteMouseEvent } from '@nitrodevco/nitro-api';
import { MouseEventType } from '@nitrodevco/nitro-api';
import type { RoomObjectEvent } from '@nitrodevco/nitro-events';
import { RoomObjectFurnitureActionEvent } from '@nitrodevco/nitro-events';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureDiceLogic extends FurnitureLogic {
    private _noTags: boolean = false;
    private _noTagsLastStateActivate: boolean = false;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectFurnitureActionEvent.DICE_ACTIVATE,
            RoomObjectFurnitureActionEvent.DICE_OFF,
        ]);
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        if (!event || !geometry) return;

        let objectEvent: RoomObjectEvent | undefined = undefined;

        switch (event.type) {
            case MouseEventType.DOUBLE_CLICK:
                if (this._noTags) {
                    if (
                        !this._noTagsLastStateActivate ||
                        this.object.getState(0) === 0 ||
                        this.object.getState(0) === 100
                    ) {
                        objectEvent = new RoomObjectFurnitureActionEvent(
                            RoomObjectFurnitureActionEvent.DICE_ACTIVATE,
                            this.object,
                        );

                        this._noTagsLastStateActivate = true;
                    } else {
                        objectEvent = new RoomObjectFurnitureActionEvent(
                            RoomObjectFurnitureActionEvent.DICE_OFF,
                            this.object,
                        );

                        this._noTagsLastStateActivate = false;
                    }
                } else if (
                    event.spriteTag === 'activate' ||
                    this.object.getState(0) === 0 ||
                    this.object.getState(0) === 100
                ) {
                    objectEvent = new RoomObjectFurnitureActionEvent(
                        RoomObjectFurnitureActionEvent.DICE_ACTIVATE,
                        this.object,
                    );
                } else if (event.spriteTag === 'deactivate') {
                    objectEvent = new RoomObjectFurnitureActionEvent(
                        RoomObjectFurnitureActionEvent.DICE_OFF,
                        this.object,
                    );
                }

                if (objectEvent) this.dispatchEvent(objectEvent);

                return;
        }

        super.mouseEvent(event, geometry);
    }
}
