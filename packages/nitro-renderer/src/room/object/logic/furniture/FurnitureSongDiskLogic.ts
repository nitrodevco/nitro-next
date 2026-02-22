import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum, RoomWidgetEnumItemExtradataParameter } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureSongDiskLogic extends FurnitureLogic {
    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (this.isRealRoomObject()) {
            const extras = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureExtras);
            const diskId = parseInt(extras);

            this.object.model.setValue<string>(
                RoomObjectVariableEnum.InfostandExtraParam,
                RoomWidgetEnumItemExtradataParameter.SONGDISK + diskId,
            );
        }
    }
}
