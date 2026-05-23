import type { IRoomGeometry, IRoomObjectUpdateMessage, IRoomSpriteMouseEvent } from '@nitrodevco/nitro-api';
import { MouseEventType, NumberDataType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectHSLColorEnableEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureRoomBackgroundColorLogic extends FurnitureMultiStateLogic {
    private _roomColorUpdated: boolean = false;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.BACKGROUND_COLOR,
            RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR,
        ]);
    }

    public override dispose(): void {
        if (this._roomColorUpdated) {
            if (this.isRealRoomObject())
                this.handleRoomObjectEvent(
                    new RoomObjectHSLColorEnableEvent(
                        RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR,
                        this.object,
                        false,
                        0,
                        0,
                        0,
                    ),
                );

            this._roomColorUpdated = false;
        }

        super.dispose();
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            message.data.writeRoomObjectModel(this.object.model);

            if (this.isRealRoomObject()) this.processColorUpdate();
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry) return;

        switch (event.type) {
            case MouseEventType.DOUBLE_CLICK:
                this.handleRoomObjectEvent(
                    new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.BACKGROUND_COLOR, this.object),
                );

                return;
        }

        super.mouseEvent(event, geometry);
    }

    private processColorUpdate(): void {
        const numberData = new NumberDataType();

        numberData.initializeFromRoomObjectModel(this.object.model);

        const state = numberData.getValue(0);
        const hue = numberData.getValue(1);
        const saturation = numberData.getValue(2);
        const lightness = numberData.getValue(3);

        if (state > -1 && hue > -1 && saturation > -1 && lightness > -1) {
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureRoomBackgroundColorHue, hue);
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureRoomBackgroundColorSaturation, saturation);
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureRoomBackgroundColorLightness, lightness);

            this.object.setState(state, 0);

            this.handleRoomObjectEvent(
                new RoomObjectHSLColorEnableEvent(
                    RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR,
                    this.object,
                    state === 1,
                    hue,
                    saturation,
                    lightness,
                ),
            );

            this._roomColorUpdated = true;
        }
    }
}
