import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariable, RoomWidgetEnumItemExtradataParameter } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureSongDiskLogic extends FurnitureLogic {
    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (this.isRealRoomObject()) {
            const extras = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_EXTRAS);
            const diskId = parseInt(extras);

            this.object.model.setValue<string>(
                RoomWidgetEnumItemExtradataParameter.INFOSTAND_EXTRA_PARAM,
                RoomWidgetEnumItemExtradataParameter.SONGDISK + diskId,
            );
        }
    }
}
