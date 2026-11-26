import { RoomObjectDataRequestEvent, RoomObjectVariableEnum, RoomWidgetEnum } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash's obfuscated `§_-o1g§`, the logic `RoomObjectFactory` builds for
 * `furniture_rentable_space`.
 */
export class FurnitureRentableSpaceLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID ]);
    }

    public override update(time: number): void {
        super.update(time);

        if (typeof this.object.model.getValue<number>(RoomObjectVariableEnum.SessionCurrentUserId) !== 'number')
            this.handleRoomObjectEvent(
                new RoomObjectDataRequestEvent(RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID, this.object),
            );

        const data = this.object.model.getValue<Record<string, string> | undefined>(RoomObjectVariableEnum.FurnitureData);
        const renterId = (data && typeof data === 'object') ? data['renterId'] : undefined;
        const userId = this.object.model.getValue<number>(RoomObjectVariableEnum.SessionCurrentUserId);

        // Any renter id the data carries counts, an empty one included.
        if (renterId !== undefined && renterId !== null) {
            if (Number(renterId) === userId) this.object.setState(2, 0);
            else this.object.setState(1, 0);
        } else {
            this.object.setState(0, 0);
        }
    }

    public override get widget(): string {
        return RoomWidgetEnum.RENTABLESPACE;
    }
}
