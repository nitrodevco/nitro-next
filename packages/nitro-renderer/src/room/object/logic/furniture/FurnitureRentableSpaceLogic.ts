import { RoomObjectVariableEnum, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { RoomObjectDataRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRentableSpaceLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID]);
    }

    public override update(time: number): void {
        super.update(time);

        if (!this.object.model.getValue<number>(RoomObjectVariableEnum.SessionCurrentUserId))
            this.handleRoomObjectEvent(
                new RoomObjectDataRequestEvent(RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID, this.object),
            );

        const renterId = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureData)['renterId'];
        const userId = this.object.model.getValue<number>(RoomObjectVariableEnum.SessionCurrentUserId);

        if (renterId) {
            if (parseInt(renterId) === userId) this.object.setState(2, 0);
            else this.object.setState(1, 0);
        } else {
            this.object.setState(0, 0);
        }
    }

    public override get widget(): string {
        return RoomWidgetEnum.RENTABLESPACE;
    }
}
