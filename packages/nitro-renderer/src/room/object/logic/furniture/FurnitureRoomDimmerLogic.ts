import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectDimmerStateUpdateEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRoomDimmerLogic extends FurnitureLogic {
    private _roomColorUpdated: boolean = false;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.DIMMER,
            RoomObjectWidgetRequestEvent.WIDGET_REMOVE_DIMMER,
            RoomObjectDimmerStateUpdateEvent.DIMMER_STATE,
        ]);
    }

    public override dispose(): void {
        if (this._roomColorUpdated) {
            if (this.isRealRoomObject()) {
                this.handleRoomObjectEvent(new RoomObjectDimmerStateUpdateEvent(this.object, 0, 1, 1, 0xffffff, 0xff));
                this.handleRoomObjectEvent(
                    new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.WIDGET_REMOVE_DIMMER, this.object),
                );
            }

            this._roomColorUpdated = false;
        }

        super.dispose();
    }

    public override update(time: number): void {
        super.update(time);

        if (this.isRealRoomObject()) {
            const data = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureData);

            if (data && data.length > 0) {
                this.object.model.setValue(RoomObjectVariableEnum.FurnitureData, '');

                this.processDimmerData(data);
            }
        }
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        if (message instanceof ObjectDataUpdateMessage) {
            if (message.data) {
                const extra = message.data.getLegacyString();

                if (this.isRealRoomObject()) this.processDimmerData(extra);

                super.processUpdateMessage(
                    new ObjectDataUpdateMessage(this.getStateFromDimmerData(extra), message.data),
                );
            }

            return;
        }

        super.processUpdateMessage(message);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.DIMMER, this.object));
    }

    private getStateFromDimmerData(data: string): number {
        if (data && data.length > 0) {
            const parts = data.split(',');

            if (parts.length >= 5) return parseInt(parts[0]) - 1;
        }

        return 0;
    }

    private processDimmerData(data: string): void {
        if (!data || !data.length) return;

        const parts = data.split(',');

        if (parts.length >= 5) {
            const state = this.getStateFromDimmerData(data);
            const presetId = parseInt(parts[1]);
            const effectId = parseInt(parts[2]);
            const color = parts[3];

            let colorCode = parseInt(color.substr(1), 16);
            let brightness = parseInt(parts[4]);

            if (!state) {
                colorCode = 0xffffff;
                brightness = 0xff;
            }

            this.handleRoomObjectEvent(
                new RoomObjectDimmerStateUpdateEvent(this.object, state, presetId, effectId, colorCode, brightness),
            );

            this._roomColorUpdated = true;
        }
    }
}
