import type { IRoomGeometry, IRoomObjectUpdateMessage, IRoomSpriteMouseEvent } from '@nitrodevco/nitro-api';
import { MouseEventType, NumberDataType, RoomObjectVariable } from '@nitrodevco/nitro-api';
import { RoomObjectStateChangedEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureAreaHideLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.AREA_HIDE]);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            message.data.writeRoomObjectModel(this.object.model);

            if (this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
                this.setupObject();
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        if (!event || !geometry) return;

        switch (event.type) {
            case MouseEventType.DOUBLE_CLICK: {
                if (event.spriteTag === 'turn_on' || event.spriteTag === 'turn_off') {
                    this.dispatchEvent(
                        new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object),
                    );
                    return;
                }

                this.dispatchEvent(
                    new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.AREA_HIDE, this.object),
                );

                return;
            }
        }

        super.mouseEvent(event, geometry);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.AREA_HIDE, this.object));
    }

    private setupObject(): void {
        const numberData = new NumberDataType();

        numberData.initializeFromRoomObjectModel(this.object.model);

        const state = numberData.getValue(0);
        const rootX = numberData.getValue(1);
        const rootY = numberData.getValue(2);
        const width = numberData.getValue(3);
        const length = numberData.getValue(4);
        const invisibility = numberData.getValue(5) === 1;
        const wallItems = numberData.getValue(6) === 1;
        const invert = numberData.getValue(7) === 1;

        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_ROOT_X, rootX);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_ROOT_Y, rootY);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_WIDTH, width);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_LENGTH, length);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_INVISIBILITY, invisibility ? 1 : 0);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_WALL_ITEMS, wallItems ? 1 : 0);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_INVERT, invert ? 1 : 0);
        this.object.setState(state, 0);
    }
}
